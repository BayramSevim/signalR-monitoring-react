import React, { useState, useEffect, useContext } from 'react';
import { GetAPIUrl } from 'api/gama';
import axios from 'axios';
import {
  Grid,
  Typography,
  TextField,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Box,
  TableBody,
  Paper,
  Autocomplete,
  Button
} from '@mui/material';
import { SignalRContext } from 'contexts/SignalRContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Brodcast } from 'iconsax-react';
import SendRecipeToast from 'components/Toast/SendRecipeToast';
import SendLotToast from 'components/Toast/SendLotToast';

const GirisBoylamaTable = ({ title }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedLots, setSelectedLots] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [lots, setLots] = useState([]);

  // Tablo Header
  const [hedefKefeA, setHedefKefeA] = useState(0);
  const [hedefKefeB, setHedefKefeB] = useState(0);
  const [hedefKefeNoA, setHedefKefeNoA] = useState(0);
  const [hedefKefeNoB, setHedefKefeNoB] = useState(0);
  const [logNoHMI, setLogNoHMI] = useState('');
  const [receteAdiHMI, setReceteAdiHMI] = useState('');
  const [ciftlikAdiHMI, setCiftlikAdiHMI] = useState('');
  const [kefeGrup1Isim, setKefeGrup1Isim] = useState('');
  const [kefeGrup2Isim, setKefeGrup2Isim] = useState('');
  const [kefeGrup3Isim, setKefeGrup3Isim] = useState('');
  const [kefeGrup4Isim, setKefeGrup4Isim] = useState('');
  const [kefeGrup5Isim, setKefeGrup5Isim] = useState('');
  const [kefeGrup6Isim, setKefeGrup6Isim] = useState('');
  const [kefeGrup7Isim, setKefeGrup7Isim] = useState('');
  const [kefeGrup8Isim, setKefeGrup8Isim] = useState('');
  const [kefeGrup9Isim, setKefeGrup9Isim] = useState('');
  const [kefeGrup10Isim, setKefeGrup10Isim] = useState('');
  const [kefeGrup11Isim, setKefeGrup11Isim] = useState('');
  const [kefeGrup12Isim, setKefeGrup12Isim] = useState('');
  const [kefeGrup1ToplamAdet, setKefeGrup1ToplamAdet] = useState(0);
  const [kefeGrup2ToplamAdet, setKefeGrup2ToplamAdet] = useState(0);
  const [kefeGrup3ToplamAdet, setKefeGrup3ToplamAdet] = useState(0);
  const [kefeGrup4ToplamAdet, setKefeGrup4ToplamAdet] = useState(0);
  const [kefeGrup5ToplamAdet, setKefeGrup5ToplamAdet] = useState(0);
  const [kefeGrup6ToplamAdet, setKefeGrup6ToplamAdet] = useState(0);
  const [kefeGrup7ToplamAdet, setKefeGrup7ToplamAdet] = useState(0);
  const [kefeGrup8ToplamAdet, setKefeGrup8ToplamAdet] = useState(0);
  const [kefeGrup9ToplamAdet, setKefeGrup9ToplamAdet] = useState(0);
  const [kefeGrup10ToplamAdet, setKefeGrup10ToplamAdet] = useState(0);
  const [kefeGrup11ToplamAdet, setKefeGrup11ToplamAdet] = useState(0);
  const [kefeGrup12ToplamAdet, setKefeGrup12ToplamAdet] = useState(0);
  const [kefeGrup1ToplamAgirlik, setKefeGrup1ToplamAgirlik] = useState(0);
  const [kefeGrup2ToplamAgirlik, setKefeGrup2ToplamAgirlik] = useState(0);
  const [kefeGrup3ToplamAgirlik, setKefeGrup3ToplamAgirlik] = useState(0);
  const [kefeGrup4ToplamAgirlik, setKefeGrup4ToplamAgirlik] = useState(0);
  const [kefeGrup5ToplamAgirlik, setKefeGrup5ToplamAgirlik] = useState(0);
  const [kefeGrup6ToplamAgirlik, setKefeGrup6ToplamAgirlik] = useState(0);
  const [kefeGrup7ToplamAgirlik, setKefeGrup7ToplamAgirlik] = useState(0);
  const [kefeGrup8ToplamAgirlik, setKefeGrup8ToplamAgirlik] = useState(0);
  const [kefeGrup9ToplamAgirlik, setKefeGrup9ToplamAgirlik] = useState(0);
  const [kefeGrup10ToplamAgirlik, setKefeGrup10ToplamAgirlik] = useState(0);
  const [kefeGrup11ToplamAgirlik, setKefeGrup11ToplamAgirlik] = useState(0);
  const [kefeGrup12ToplamAgirlik, setKefeGrup12ToplamAgirlik] = useState(0);
  const [kefeGrup1OrtalamaAgirlik, setKefeGrup1OrtalamaAgirlik] = useState(0);
  const [kefeGrup2OrtalamaAgirlik, setKefeGrup2OrtalamaAgirlik] = useState(0);
  const [kefeGrup3OrtalamaAgirlik, setKefeGrup3OrtalamaAgirlik] = useState(0);
  const [kefeGrup4OrtalamaAgirlik, setKefeGrup4OrtalamaAgirlik] = useState(0);
  const [kefeGrup5OrtalamaAgirlik, setKefeGrup5OrtalamaAgirlik] = useState(0);
  const [kefeGrup6OrtalamaAgirlik, setKefeGrup6OrtalamaAgirlik] = useState(0);
  const [kefeGrup7OrtalamaAgirlik, setKefeGrup7OrtalamaAgirlik] = useState(0);
  const [kefeGrup8OrtalamaAgirlik, setKefeGrup8OrtalamaAgirlik] = useState(0);
  const [kefeGrup9OrtalamaAgirlik, setKefeGrup9OrtalamaAgirlik] = useState(0);
  const [kefeGrup10OrtalamaAgirlik, setKefeGrup10OrtalamaAgirlik] = useState(0);
  const [kefeGrup11OrtalamaAgirlik, setKefeGrup11OrtalamaAgirlik] = useState(0);
  const [kefeGrup12OrtalamaAgirlik, setKefeGrup12OrtalamaAgirlik] = useState(0);
  const [kefeGrup1AdetYuzde, setKefeGrup1AdetYuzde] = useState(0);
  const [kefeGrup2AdetYuzde, setKefeGrup2AdetYuzde] = useState(0);
  const [kefeGrup3AdetYuzde, setKefeGrup3AdetYuzde] = useState(0);
  const [kefeGrup4AdetYuzde, setKefeGrup4AdetYuzde] = useState(0);
  const [kefeGrup5AdetYuzde, setKefeGrup5AdetYuzde] = useState(0);
  const [kefeGrup6AdetYuzde, setKefeGrup6AdetYuzde] = useState(0);
  const [kefeGrup7AdetYuzde, setKefeGrup7AdetYuzde] = useState(0);
  const [kefeGrup8AdetYuzde, setKefeGrup8AdetYuzde] = useState(0);
  const [kefeGrup9AdetYuzde, setKefeGrup9AdetYuzde] = useState(0);
  const [kefeGrup10AdetYuzde, setKefeGrup10AdetYuzde] = useState(0);
  const [kefeGrup11AdetYuzde, setKefeGrup11AdetYuzde] = useState(0);
  const [kefeGrup12AdetYuzde, setKefeGrup12AdetYuzde] = useState(0);
  const [kefeGrup1AgirlikYuzde, setKefeGrup1AgirlikYuzde] = useState(0);
  const [kefeGrup2AgirlikYuzde, setKefeGrup2AgirlikYuzde] = useState(0);
  const [kefeGrup3AgirlikYuzde, setKefeGrup3AgirlikYuzde] = useState(0);
  const [kefeGrup4AgirlikYuzde, setKefeGrup4AgirlikYuzde] = useState(0);
  const [kefeGrup5AgirlikYuzde, setKefeGrup5AgirlikYuzde] = useState(0);
  const [kefeGrup6AgirlikYuzde, setKefeGrup6AgirlikYuzde] = useState(0);
  const [kefeGrup7AgirlikYuzde, setKefeGrup7AgirlikYuzde] = useState(0);
  const [kefeGrup8AgirlikYuzde, setKefeGrup8AgirlikYuzde] = useState(0);
  const [kefeGrup9AgirlikYuzde, setKefeGrup9AgirlikYuzde] = useState(0);
  const [kefeGrup10AgirlikYuzde, setKefeGrup10AgirlikYuzde] = useState(0);
  const [kefeGrup11AgirlikYuzde, setKefeGrup11AgirlikYuzde] = useState(0);
  const [kefeGrup12AgirlikYuzde, setKefeGrup12AgirlikYuzde] = useState(0);
  const [toplamAdet, setToplamAdet] = useState(0);
  const [netAdet, setNetAdet] = useState(0);
  const [redAdet, setRedAdet] = useState(0);
  const [toplamAgirlik, setToplamAgirlik] = useState(0);
  const [netAgirlik, setNetAgirlik] = useState(0);
  const [redAgirlik, setRedAgirlik] = useState(0);
  const [ortalamaNetAgirlik, setOrtalamaNetAgirlik] = useState(0);
  const [ortalamaToplamAgirlik, setOrtalamaToplamAgirlik] = useState(0);
  const [netAgirlikYuzde, setNetAgirlikYuzde] = useState(0);
  const [redAgirlikYuzde, setRedAgirlikYuzde] = useState(0);

  const [kefeGrup1Aktif, setKefeGrup1Aktif] = useState(false);
  const [kefeGrup2Aktif, setKefeGrup2Aktif] = useState(false);
  const [kefeGrup3Aktif, setKefeGrup3Aktif] = useState(false);
  const [kefeGrup4Aktif, setKefeGrup4Aktif] = useState(false);
  const [kefeGrup5Aktif, setKefeGrup5Aktif] = useState(false);
  const [kefeGrup6Aktif, setKefeGrup6Aktif] = useState(false);
  const [kefeGrup7Aktif, setKefeGrup7Aktif] = useState(false);
  const [kefeGrup8Aktif, setKefeGrup8Aktif] = useState(false);
  const [kefeGrup9Aktif, setKefeGrup9Aktif] = useState(false);
  const [kefeGrup10Aktif, setKefeGrup10Aktif] = useState(false);
  const [kefeGrup11Aktif, setKefeGrup11Aktif] = useState(false);
  const [kefeGrup12Aktif, setKefeGrup12Aktif] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);

  const [openSendRecipe, setOpenSendRecipe] = useState(false);
  const [openSendLot, setOpenSendLot] = useState(false);

  useEffect(() => {
    const tagMappings = [
      { tag: 'PLC2!Application_GVL_sonAgirlikR_A', setter: setHedefKefeA },
      { tag: 'PLC2!Application_GVL_sonAgirlikR_B', setter: setHedefKefeB },
      { tag: 'PLC2!Application_GVL_sonKefeA', setter: setHedefKefeNoA },
      { tag: 'PLC2!Application_GVL_sonKefeB', setter: setHedefKefeNoB },
      { tag: 'PLC2!serverLotAdi1', setter: setLogNoHMI },
      { tag: 'PLC2!serverCiftlikAdi', setter: setCiftlikAdiHMI },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__isim', setter: setKefeGrup1Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__isim', setter: setKefeGrup2Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__isim', setter: setKefeGrup3Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__isim', setter: setKefeGrup4Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__isim', setter: setKefeGrup5Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__isim', setter: setKefeGrup6Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__isim', setter: setKefeGrup7Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__isim', setter: setKefeGrup8Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__isim', setter: setKefeGrup9Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__isim', setter: setKefeGrup10Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__isim', setter: setKefeGrup11Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__isim', setter: setKefeGrup12Isim },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__toplamAdet', setter: setKefeGrup1ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__toplamAdet', setter: setKefeGrup2ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__toplamAdet', setter: setKefeGrup3ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__toplamAdet', setter: setKefeGrup4ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__toplamAdet', setter: setKefeGrup5ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__toplamAdet', setter: setKefeGrup6ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__toplamAdet', setter: setKefeGrup7ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__toplamAdet', setter: setKefeGrup8ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__toplamAdet', setter: setKefeGrup9ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__toplamAdet', setter: setKefeGrup10ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__toplamAdet', setter: setKefeGrup11ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__toplamAdet', setter: setKefeGrup12ToplamAdet },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__toplamAgirlik', setter: setKefeGrup1ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__toplamAgirlik', setter: setKefeGrup2ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__toplamAgirlik', setter: setKefeGrup3ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__toplamAgirlik', setter: setKefeGrup4ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__toplamAgirlik', setter: setKefeGrup5ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__toplamAgirlik', setter: setKefeGrup6ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__toplamAgirlik', setter: setKefeGrup7ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__toplamAgirlik', setter: setKefeGrup8ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__toplamAgirlik', setter: setKefeGrup9ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__toplamAgirlik', setter: setKefeGrup10ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__toplamAgirlik', setter: setKefeGrup11ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__toplamAgirlik', setter: setKefeGrup12ToplamAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__ortalamaWeigh', setter: setKefeGrup1OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__ortalamaWeigh', setter: setKefeGrup2OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__ortalamaWeigh', setter: setKefeGrup3OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__ortalamaWeigh', setter: setKefeGrup4OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__ortalamaWeigh', setter: setKefeGrup5OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__ortalamaWeigh', setter: setKefeGrup6OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__ortalamaWeigh', setter: setKefeGrup7OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__ortalamaWeigh', setter: setKefeGrup8OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__ortalamaWeigh', setter: setKefeGrup9OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__ortalamaWeigh', setter: setKefeGrup10OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__ortalamaWeigh', setter: setKefeGrup11OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__ortalamaWeigh', setter: setKefeGrup12OrtalamaAgirlik },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__adetYuzdesi', setter: setKefeGrup1AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__adetYuzdesi', setter: setKefeGrup2AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__adetYuzdesi', setter: setKefeGrup3AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__adetYuzdesi', setter: setKefeGrup4AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__adetYuzdesi', setter: setKefeGrup5AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__adetYuzdesi', setter: setKefeGrup6AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__adetYuzdesi', setter: setKefeGrup7AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__adetYuzdesi', setter: setKefeGrup8AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__adetYuzdesi', setter: setKefeGrup9AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__adetYuzdesi', setter: setKefeGrup10AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__adetYuzdesi', setter: setKefeGrup11AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__adetYuzdesi', setter: setKefeGrup12AdetYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__agirlikYuzdesi', setter: setKefeGrup1AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__agirlikYuzdesi', setter: setKefeGrup2AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__agirlikYuzdesi', setter: setKefeGrup3AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__agirlikYuzdesi', setter: setKefeGrup4AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__agirlikYuzdesi', setter: setKefeGrup5AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__agirlikYuzdesi', setter: setKefeGrup6AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__agirlikYuzdesi', setter: setKefeGrup7AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__agirlikYuzdesi', setter: setKefeGrup8AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__agirlikYuzdesi', setter: setKefeGrup9AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__agirlikYuzdesi', setter: setKefeGrup10AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__agirlikYuzdesi', setter: setKefeGrup11AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__agirlikYuzdesi', setter: setKefeGrup12AgirlikYuzde },
      { tag: 'PLC2!Application_GVL_toplamUretimAdet', setter: setToplamAdet },
      { tag: 'PLC2!Application_GVL_toplamNetAdet', setter: setNetAdet },
      { tag: 'PLC2!Application_GVL_toplamRedAdet', setter: setRedAdet },
      { tag: 'PLC2!Application_GVL_toplamUretimKilo', setter: setToplamAgirlik },
      { tag: 'PLC2!Application_GVL_toplamNetKilo', setter: setNetAgirlik },
      { tag: 'PLC2!Application_GVL_toplamRedKilo', setter: setRedAgirlik },
      { tag: 'PLC2!Application_GVL_ortalamaNetKilo', setter: setOrtalamaNetAgirlik },
      { tag: 'PLC2!Application_GVL_ortalamaToplamKilo', setter: setOrtalamaToplamAgirlik },
      { tag: 'PLC2!Application_GVL_hmiNetAgirlikYuzdesi', setter: setNetAgirlikYuzde },
      { tag: 'PLC2!Application_GVL_hmiRedAgirlikYuzdesi', setter: setRedAgirlikYuzde },
      { tag: 'PLC2!Application_GVL_kefeGrup_1__aktif', setter: setKefeGrup1Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_2__aktif', setter: setKefeGrup2Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_3__aktif', setter: setKefeGrup3Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_4__aktif', setter: setKefeGrup4Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_5__aktif', setter: setKefeGrup5Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_6__aktif', setter: setKefeGrup6Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_7__aktif', setter: setKefeGrup7Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_8__aktif', setter: setKefeGrup8Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_9__aktif', setter: setKefeGrup9Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_10__aktif', setter: setKefeGrup10Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_11__aktif', setter: setKefeGrup11Aktif },
      { tag: 'PLC2!Application_GVL_kefeGrup_12__aktif', setter: setKefeGrup12Aktif },
      { tag: 'PLC2!serverReceteAdi', setter: setReceteAdiHMI },
      { tag: 'PLC2!serverOnline', setter: setServerOnline }
    ];

    const checkStat = (data) => {
      data.forEach((item) => {
        tagMappings.forEach(({ tag, setter }) => {
          if (item.Name === tag) {
            setter(item.Value);
          }
        });
      });
    };

    const fetchGetItemAll = async () => {
      await axios.get(`${GetAPIUrl()}/api/OpcUa/GetAllTags`).then((res) => {
        checkStat(res.data);
      });
    };

    const handleSignalRData = (e) => {
      const data = e.detail;
      checkStat(data);
    };
    fetchGetItemAll();

    window.addEventListener('SignalRDataReceived', handleSignalRData);

    return () => {
      window.removeEventListener('SignalRDataReceived', handleSignalRData);
    };
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await axios.get(`${GetAPIUrl()}/api/Boylama/GetReceteler`).then((res) => {
          const data = res.data;

          const filterRecipe = data.filter((item) => item.makinaAd === 'Ana Boylama' && item.isActive === true);
          setRecipes(filterRecipe);
        });
      } catch (err) {
        console.log(err);
      }
    };

    const fetchLot = async () => {
      try {
        const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetLots`);
        const data = res.data;
        const filterLot = data.filter((item) => item.isActive === true);
        setLots(filterLot);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLot();
    fetchRecipe();
  }, []);

  const grupVerileri = [
    {
      isim: kefeGrup1Isim,
      adet: kefeGrup1ToplamAdet,
      agirlik: kefeGrup1ToplamAgirlik,
      ortAgirlik: kefeGrup1OrtalamaAgirlik,
      adetYuzde: kefeGrup1AdetYuzde,
      agirlikYuzde: kefeGrup1AgirlikYuzde,
      aktif: kefeGrup1Aktif
    },
    {
      isim: kefeGrup2Isim,
      adet: kefeGrup2ToplamAdet,
      agirlik: kefeGrup2ToplamAgirlik,
      ortAgirlik: kefeGrup2OrtalamaAgirlik,
      adetYuzde: kefeGrup2AdetYuzde,
      agirlikYuzde: kefeGrup2AgirlikYuzde,
      aktif: kefeGrup2Aktif
    },
    {
      isim: kefeGrup3Isim,
      adet: kefeGrup3ToplamAdet,
      agirlik: kefeGrup3ToplamAgirlik,
      ortAgirlik: kefeGrup3OrtalamaAgirlik,
      adetYuzde: kefeGrup3AdetYuzde,
      agirlikYuzde: kefeGrup3AgirlikYuzde,
      aktif: kefeGrup3Aktif
    },
    {
      isim: kefeGrup4Isim,
      adet: kefeGrup4ToplamAdet,
      agirlik: kefeGrup4ToplamAgirlik,
      ortAgirlik: kefeGrup4OrtalamaAgirlik,
      adetYuzde: kefeGrup4AdetYuzde,
      agirlikYuzde: kefeGrup4AgirlikYuzde,
      aktif: kefeGrup4Aktif
    },
    {
      isim: kefeGrup5Isim,
      adet: kefeGrup5ToplamAdet,
      agirlik: kefeGrup5ToplamAgirlik,
      ortAgirlik: kefeGrup5OrtalamaAgirlik,
      adetYuzde: kefeGrup5AdetYuzde,
      agirlikYuzde: kefeGrup5AgirlikYuzde,
      aktif: kefeGrup5Aktif
    },
    {
      isim: kefeGrup6Isim,
      adet: kefeGrup6ToplamAdet,
      agirlik: kefeGrup6ToplamAgirlik,
      ortAgirlik: kefeGrup6OrtalamaAgirlik,
      adetYuzde: kefeGrup6AdetYuzde,
      agirlikYuzde: kefeGrup6AgirlikYuzde,
      aktif: kefeGrup6Aktif
    },
    {
      isim: kefeGrup7Isim,
      adet: kefeGrup7ToplamAdet,
      agirlik: kefeGrup7ToplamAgirlik,
      ortAgirlik: kefeGrup7OrtalamaAgirlik,
      adetYuzde: kefeGrup7AdetYuzde,
      agirlikYuzde: kefeGrup7AgirlikYuzde,
      aktif: kefeGrup7Aktif
    },
    {
      isim: kefeGrup8Isim,
      adet: kefeGrup8ToplamAdet,
      agirlik: kefeGrup8ToplamAgirlik,
      ortAgirlik: kefeGrup8OrtalamaAgirlik,
      adetYuzde: kefeGrup8AdetYuzde,
      agirlikYuzde: kefeGrup8AgirlikYuzde,
      aktif: kefeGrup8Aktif
    },
    {
      isim: kefeGrup9Isim,
      adet: kefeGrup9ToplamAdet,
      agirlik: kefeGrup9ToplamAgirlik,
      ortAgirlik: kefeGrup9OrtalamaAgirlik,
      adetYuzde: kefeGrup9AdetYuzde,
      agirlikYuzde: kefeGrup9AgirlikYuzde,
      aktif: kefeGrup9Aktif
    },
    {
      isim: kefeGrup10Isim,
      adet: kefeGrup10ToplamAdet,
      agirlik: kefeGrup10ToplamAgirlik,
      ortAgirlik: kefeGrup10OrtalamaAgirlik,
      adetYuzde: kefeGrup10AdetYuzde,
      agirlikYuzde: kefeGrup10AgirlikYuzde,
      aktif: kefeGrup10Aktif
    },
    {
      isim: kefeGrup11Isim,
      adet: kefeGrup11ToplamAdet,
      agirlik: kefeGrup11ToplamAgirlik,
      ortAgirlik: kefeGrup11OrtalamaAgirlik,
      adetYuzde: kefeGrup11AdetYuzde,
      agirlikYuzde: kefeGrup11AgirlikYuzde,
      aktif: kefeGrup11Aktif
    },
    {
      isim: kefeGrup12Isim,
      adet: kefeGrup12ToplamAdet,
      agirlik: kefeGrup12ToplamAgirlik,
      ortAgirlik: kefeGrup12OrtalamaAgirlik,
      adetYuzde: kefeGrup12AdetYuzde,
      agirlikYuzde: kefeGrup12AgirlikYuzde,
      aktif: kefeGrup12Aktif
    }
  ];

  useEffect(() => {
    if (recipes) {
      const match = recipes.find((r) => r.receteAdi === receteAdiHMI);
      if (match) {
        setSelectedRecipe(match);
      }
    }

    if (lots) {
      const match = lots.find((r) => r.lotYazici1 === logNoHMI);
      if (match) {
        setSelectedLots(match);
      }
    }
  }, [recipes, lots, receteAdiHMI, logNoHMI]);

  const formatFromString = (val) => {
    if (val === '' || val === null || val === undefined) return '-'; // Boşsa eksi çizgi
    const num = Number(val.toString().replace(',', '.')); // Noktalı formatı destekle
    return isNaN(num)
      ? '-'
      : num.toLocaleString('tr-TR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        });
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <Grid item xs={6}>
        <Box
          sx={{
            position: 'relative',
            mb: 1,
            borderBottom: '2px solid white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <Brodcast size="32" color={serverOnline.toString().toLowerCase() === 'true' ? 'lime' : 'red'} />
          </Box>
        </Box>

        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item xs={6}>
            <Typography
              variant="subtitle2"
              sx={{
                backgroundColor: '#FF9B17', // Mavi ton
                color: '#000',
                padding: '5px 12px',
                borderRadius: '8px',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Hedef Kefe A : {hedefKefeA} Kg
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                backgroundColor: '#2a7dc2', // Mavi ton
                color: '#fff',
                padding: '5px 12px',
                borderRadius: '8px',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Hedef Kefe B : <b>{hedefKefeB} Kg</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                backgroundColor: '#FF9B17', // Mavi ton
                color: '#000',
                padding: '5px 12px',
                borderRadius: '8px',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Hedef Kefe No A : <b>{hedefKefeNoA}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                backgroundColor: '#2a7dc2',
                color: '#fff',
                padding: '5px 12px',
                borderRadius: '8px',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Hedef Kefe No B : <b>{hedefKefeNoB}</b>
            </Typography>
          </Grid>
          <Grid container spacing={1} mt={1} mb={1}>
            <Grid item xs={12}>
              <Typography ml={0.5}>Lot No</Typography>
              <TextField fullWidth value={logNoHMI} size="large" InputProps={{ readOnly: true }} />
            </Grid>
            {/* <Grid item xs={6}>
              <Typography ml={0.5}>Çiftlik Adı</Typography>
              <TextField fullWidth value={ciftlikAdiHMI} size="large" InputProps={{ readOnly: true }} />
            </Grid> */}
          </Grid>

          <Grid item mb={3} ml={-1} xs={6.05}>
            <Autocomplete
              fullWidth
              options={recipes}
              getOptionLabel={(option) => option.receteAdi || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} label="Reçete Seçimi" variant="outlined" />}
              value={selectedRecipe}
              onChange={(event, newValue) => {
                setSelectedRecipe(newValue);
              }}
            />
          </Grid>
          <Grid item mb={1} xs={6.05}>
            <Autocomplete
              fullWidth
              options={lots}
              getOptionLabel={(option) => option.lotYazici1 || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} label="Lot Seçimi" variant="outlined" />}
              value={selectedLots}
              onChange={(event, newValue) => {
                setSelectedLots(newValue);
              }}
            />
          </Grid>

          <Grid item display={'flex'} justifyContent={'end'} alignItems={'center'} mt={-2} mb={1} xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1, backgroundColor: '#261FB3' }}
              onClick={() => {
                if (selectedRecipe) {
                  setOpenSendRecipe(true);
                } else {
                  toast.error('Reçete Seçimi Yapınız');
                }
              }}
              size="large"
            >
              Reçete Gönder
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                if (selectedLots) {
                  setOpenSendLot(true);
                } else {
                  toast.error('Lot Seçimi Yapınız');
                }
              }}
              size="large"
            >
              Lot Numarası Gönder
            </Button>
          </Grid>
        </Grid>

        <Table component={Paper} size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>İsim</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Adet</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ağırlık</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ort.Ağırlık</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Adet %</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ağırlık %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grupVerileri.map((grup, index) => {
              if (grup.aktif.toString().toLowerCase() === 'true') {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{grup.isim}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{grup.adet}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.agirlik)} kg</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.ortAgirlik)} gr</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.adetYuzde)} %</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.agirlikYuzde)} %</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Adet Bilgileri</strong>
              </Typography>
              <Typography variant="body2">Toplam Adet: {toplamAdet}</Typography>
              <Typography variant="body2">Net Adet: {netAdet}</Typography>
              <Typography variant="body2">Red Adet: {redAdet}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Ağırlık Bilgileri</strong>
              </Typography>
              <Typography variant="body2">Toplam Ağırlık: {formatFromString(toplamAgirlik)} kg</Typography>
              <Typography variant="body2">Net Ağırlık: {formatFromString(netAgirlik)} kg</Typography>
              <Typography variant="body2">Red Ağırlık: {formatFromString(redAgirlik)} kg</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Ortalama Ağırlık</strong>
              </Typography>
              <Typography variant="body2">Ortalama Net Ağırlık: {formatFromString(ortalamaNetAgirlik)} kg</Typography>
              <Typography variant="body2">Ortalama Toplam Ağırlık: {formatFromString(ortalamaToplamAgirlik)} kg</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Yüzdelik Bilgiler</strong>
              </Typography>
              <Typography variant="body2">Net Ağırlık Yüzdesi: {formatFromString(netAgirlikYuzde)} %</Typography>
              <Typography variant="body2">Red Ağırlık Yüzdesi: {formatFromString(redAgirlikYuzde)} %</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {openSendRecipe && (
        <SendRecipeToast openModal={openSendRecipe} setOpenModal={setOpenSendRecipe} selectedRecipe={selectedRecipe} plcNo={2} />
      )}
      {openSendLot && <SendLotToast openModal={openSendLot} setOpenModal={setOpenSendLot} selectedLot={selectedLots} plcNo={2} />}
    </>
  );
};

export default GirisBoylamaTable;
