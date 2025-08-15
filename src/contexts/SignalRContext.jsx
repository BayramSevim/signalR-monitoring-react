// import React, { createContext, useEffect, useRef, useState } from 'react';
// import * as signalR from '@microsoft/signalr';
// import { GetAPIUrl } from '../api/gama';

// export const SignalRContext = createContext();

// export const SignalRProvider = ({ children }) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const connectionRef = useRef(null);

//   useEffect(() => {
//     const namespaceIndex = 2;
//     const opcServers = ['PLC1', 'PLC2'];

//     const setupOpcUaConnection = async (opcServerName) => {
//       try {
//         const connectRes = await fetch(`${GetAPIUrl()}/api/OpcUa/ConnectOpcUa?OpcServerName=${opcServerName}`);
//         if (!connectRes.ok) throw new Error(`${opcServerName} ConnectOpcUa hatası`);

//         const browseRes = await fetch(
//           `${GetAPIUrl()}/api/OpcUa/BrowseAndFilterByNamespaceIndexNodes?OpcServerName=${opcServerName}&nameSpace=${namespaceIndex}`
//         );
//         const browseText = await browseRes.text();
//         if (!browseRes.ok) throw new Error(`${opcServerName} Browse hatası`);

//         const tagsList = JSON.parse(browseText);

//         const registerRes = await fetch(`${GetAPIUrl()}/api/OpcUa/RegisterTags?OpcServerName=${encodeURIComponent(opcServerName)}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(tagsList)
//         });

//         if (!registerRes.ok) throw new Error(`${opcServerName} RegisterTags hatası`);
//         setIsConnected(true);
//       } catch (error) {
//         console.warn(`⚠️ ${opcServerName} bağlantı hatası atlandı:`, error.message);
//         setIsConnected(false);
//       }
//     };

//     const initSignalR = async () => {
//       for (const plc of opcServers) {
//         await setupOpcUaConnection(plc);
//       }

//       const connection = new signalR.HubConnectionBuilder().withUrl(`${GetAPIUrl()}/opchub`).withAutomaticReconnect().build();

//       connection
//         .start()
//         .then(() => {
//           console.log('✅ SignalR bağlantısı kuruldu.');
//         })
//         .catch((err) => console.error('❌ SignalR bağlantı hatası:', err));

//       connection.on('ReceiveChangedItems', (data) => {
//         try {
//           if (!data || data.trim() === '') return;
//           const parsedData = JSON.parse(data);
//           if (Array.isArray(parsedData) && parsedData.length > 0) {
//             const event = new CustomEvent('SignalRDataReceived', { detail: parsedData });
//             window.dispatchEvent(event);
//           }
//         } catch (error) {
//           console.error('SignalR data parsing error:', error);
//         }
//       });

//       connectionRef.current = connection;

//       return () => {
//         connection.stop();
//       };
//     };

//     initSignalR();
//   }, []);

//   const getBitValue = (val, index) => {
//     try {
//       const _index = parseInt(index, 10);
//       const uVal = parseInt(val, 10);
//       let bitArray = new Array(16).fill(false);
//       for (let i = 0; i < 16; i++) {
//         bitArray[i] = (uVal & (1 << i)) !== 0;
//       }
//       const combined = [...bitArray.slice(8, 16), ...bitArray.slice(0, 8)];
//       return Boolean(combined[_index]);
//     } catch (error) {
//       return false;
//     }
//   };

//   const formatToDecimal = (val) => {
//     const cleaned = val.replace(',', '.');
//     const num = parseFloat(cleaned);
//     if (isNaN(num)) return '0,00';
//     const parts = cleaned.split('.');
//     return parts.length === 2 ? `${parseInt(parts[0], 10)},${parts[1]}` : `${parseInt(parts[0], 10)},00`;
//   };

//   const sendValue = async (tagName, value) => {
//     try {
//       const payload = {
//         name: tagName,
//         address: 'D',
//         typeCode: 'D',
//         isFault: false,
//         isWatch: false,
//         value: value
//       };

//       const response = await fetch(`${GetAPIUrl()}/api/OpcUa/WriteTag`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         console.error('❌ WriteTag hatası:', errText);
//         throw new Error('WriteTag isteği başarısız.');
//       }
//     } catch (error) {
//       console.error('❌ sendValue hatası:', error);
//     }
//   };

//   const readTag = async (tagName) => {
//     try {
//       const response = await fetch(`${GetAPIUrl()}/api/OpcUa/ReadTag?tagName=${encodeURIComponent(tagName)}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         console.error('❌ ReadTag hatası:', errText);
//         throw new Error('ReadTag isteği başarısız.');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('❌ readTag hatası:', error);
//       return null;
//     }
//   };

//   return (
//     <SignalRContext.Provider
//       value={{
//         connection: connectionRef.current,
//         getBitValue,
//         formatToDecimal,
//         sendValue,
//         readTag,
//         isConnected
//       }}
//     >
//       {children}
//     </SignalRContext.Provider>
//   );
// };

import React, { createContext, useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { GetAPIUrl } from '../api/gama';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionFailedPlcs, setConnectionFailedPlcs] = useState([]);
  const [showConnectionErrorModal, setShowConnectionErrorModal] = useState(false);
  const [userCancelled, setUserCancelled] = useState(false);

  const connectionRef = useRef(null);
  const initSignalRRef = useRef(null); // 🆕 initSignalR fonksiyonunu burada tutacağız

  useEffect(() => {
    const namespaceIndex = 2;
    const opcServers = ['PLC1', 'PLC2'];

    const setupOpcUaConnection = async (opcServerName) => {
      try {
        const connectRes = await fetch(`${GetAPIUrl()}/api/OpcUa/ConnectOpcUa?OpcServerName=${opcServerName}`);
        const connectText = await connectRes.text();

        if (connectText.includes('OPC UA bağlantı hatası')) {
          console.warn(`⚠️ ${opcServerName} ConnectOpcUa bağlantı hatası:`, connectText);
          return opcServerName;
        }

        const browseRes = await fetch(
          `${GetAPIUrl()}/api/OpcUa/BrowseAndFilterByNamespaceIndexNodes?OpcServerName=${opcServerName}&nameSpace=${namespaceIndex}`
        );
        const browseText = await browseRes.text();

        if (!browseRes.ok) throw new Error(`${opcServerName} Browse hatası`);

        const tagsList = JSON.parse(browseText);

        const registerRes = await fetch(`${GetAPIUrl()}/api/OpcUa/RegisterTags?OpcServerName=${encodeURIComponent(opcServerName)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tagsList)
        });

        if (!registerRes.ok) throw new Error(`${opcServerName} RegisterTags hatası`);

        return null;
      } catch (error) {
        console.warn(`⚠️ ${opcServerName} bağlantı hatası atlandı:`, error.message);
        return opcServerName;
      }
    };

    const initSignalR = async () => {
      setConnectionFailedPlcs([]); // önceki hatalıları temizle
      setShowConnectionErrorModal(false);
      setIsConnected(false);

      const failedPlcs = [];
      for (const plc of opcServers) {
        const failedPlc = await setupOpcUaConnection(plc);
        if (failedPlc) failedPlcs.push(failedPlc);
      }

      if (failedPlcs.length > 0) {
        setConnectionFailedPlcs(failedPlcs);
        setShowConnectionErrorModal(true);
        return;
      }

      const connection = new signalR.HubConnectionBuilder().withUrl(`${GetAPIUrl()}/opchub`).withAutomaticReconnect().build();

      connection
        .start()
        .then(() => {
          console.log('✅ SignalR bağlantısı kuruldu.');
          setIsConnected(true);
        })
        .catch((err) => {
          console.error('❌ SignalR bağlantı hatası:', err);
          setIsConnected(false);
        });

      connection.on('ReceiveChangedItems', (data) => {
        try {
          if (!data || data.trim() === '') return;
          const parsedData = JSON.parse(data);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            const event = new CustomEvent('SignalRDataReceived', { detail: parsedData });
            window.dispatchEvent(event);
          }
        } catch (error) {
          console.error('SignalR data parsing error:', error);
        }
      });

      connectionRef.current = connection;
    };

    initSignalRRef.current = initSignalR; // 🆕 fonksiyonu kaydediyoruz
    initSignalR(); // ilk başta çalıştırıyoruz
  }, []);

  const handleRetryConnection = () => {
    if (initSignalRRef.current) {
      initSignalRRef.current(); // 🆕 Yeniden bağlanmayı burada deniyoruz
    }
  };

  const handleCancelConnection = () => {
    setShowConnectionErrorModal(false);
    setUserCancelled(true);
  };

  const getBitValue = (val, index) => {
    try {
      const _index = parseInt(index, 10);
      const uVal = parseInt(val, 10);
      let bitArray = new Array(16).fill(false);
      for (let i = 0; i < 16; i++) {
        bitArray[i] = (uVal & (1 << i)) !== 0;
      }
      const combined = [...bitArray.slice(8, 16), ...bitArray.slice(0, 8)];
      return Boolean(combined[_index]);
    } catch (error) {
      return false;
    }
  };

  const formatToDecimal = (val) => {
    const cleaned = val.replace(',', '.');
    const num = parseFloat(cleaned);
    if (isNaN(num)) return '0,00';
    const parts = cleaned.split('.');
    return parts.length === 2 ? `${parseInt(parts[0], 10)},${parts[1]}` : `${parseInt(parts[0], 10)},00`;
  };

  const sendValue = async (tagName, value) => {
    try {
      const payload = {
        name: tagName,
        address: 'D',
        typeCode: 'D',
        isFault: false,
        isWatch: false,
        value: value
      };

      const response = await fetch(`${GetAPIUrl()}/api/OpcUa/WriteTag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('❌ WriteTag hatası:', errText);
        throw new Error('WriteTag isteği başarısız.');
      }
    } catch (error) {
      console.error('❌ sendValue hatası:', error);
    }
  };

  const readTag = async (tagName) => {
    try {
      const response = await fetch(`${GetAPIUrl()}/api/OpcUa/ReadTag?tagName=${encodeURIComponent(tagName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('❌ ReadTag hatası:', errText);
        throw new Error('ReadTag isteği başarısız.');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ readTag hatası:', error);
      return null;
    }
  };

  return (
    <SignalRContext.Provider
      value={{
        connection: connectionRef.current,
        getBitValue,
        formatToDecimal,
        sendValue,
        readTag,
        isConnected,
        userCancelled
      }}
    >
      {children}

      {/* Modal */}
      <Dialog open={showConnectionErrorModal} onClose={handleCancelConnection}>
        <DialogTitle>Bağlantı Hatası</DialogTitle>
        <DialogContent>Şu PLC'lere bağlanılamadı: {connectionFailedPlcs.join(', ')}</DialogContent>
        <DialogActions>
          <Button onClick={handleRetryConnection} color="success" variant="outlined">
            Yeniden Bağlan
          </Button>
          <Button onClick={handleCancelConnection} color="secondary" variant="outlined">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </SignalRContext.Provider>
  );
};
