import { useEffect, useState, useContext } from 'react';
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Autocomplete,
  TableContainer
} from '@mui/material';
import MainCard from 'components/MainCard';
import Paper from '@mui/material/Paper';
import UpdateLabelModal from 'components/Modals/Boylama/UpdateLabelModal';
import AddLabelModal from 'components/Modals/Boylama/AddLabelModal';
import DeleteLabelModal from 'components/Modals/Boylama/DeleteLabelModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, CloseCircle, Magicpen, ExportCurve, Send, ArrowRotateLeft } from 'iconsax-react';
import { SignalRContext } from 'contexts/SignalRContext';

export default function EtiketIslemleri() {
  const { sendValue } = useContext(SignalRContext);

  const [updateLabel, setUpdateLabel] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [getEtiket, setGetEtiket] = useState([]);
  const [selectEtiket, setSelectEtiket] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [etiketData, setEtiketData] = useState('');

  const [updateProductLoad, setUpdateProductLoad] = useState(false);

  const fileNames = ['urunList.txt', 'grupList.txt', 'etiketList.txt'];

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetLabel`).then((res) => {
      setGetEtiket(res.data);
    });
  };
  const fetchEtiketDetay = (id) => {
    const etiketDetail = getEtiket.find((item) => item.id === id);
    setEtiketData(etiketDetail.etiketData);
  };

  const getEtiketDetay = async (id) => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/GetLabelById`, {
        params: {
          Id: id
        }
      })
      .then((res) => {
        const data = res.data;
        if (data) {
          setEtiketData(res.data[0].etiketData);
        }
      });
  };

  const downloadFile = async () => {
    try {
      const fileRequests = fileNames.map((fileName) =>
        axios.get(`${GetAPIUrl()}/api/Boylama/DownloadFile?fileName=${fileName}`, {
          responseType: 'blob'
        })
      );
      const responses = await Promise.all(fileRequests);
      responses.forEach((response, index) => {
        const blob = response.data;
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        link.href = url;
        link.download = fileNames[index];
        link.click();

        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error downloading files:', error);
      alert('Error downloading files');
    }
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
    else if (type === 3) toast.success(message);
    else if (type === 4) toast.error(message);
    else if (type === 5) toast.success(message);
    else if (type === 6) toast.error(message);
  };

  const sendToPrinter = async (index) => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/SendSelectPrinterInfo`, {
        params: {
          ipAdress: '192.168.10.15'
        }
      })
      .then(() => {
        if (index === 1) toast.success('Gönderme İşlemi Başarılı');
      })
      .catch(() => {
        if (index === 1) toast.error('Gönderme İşlemi Başarısız');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateProduct = () => {
    sendToPrinter(0);
    setUpdateProductLoad(true);
    setTimeout(() => {
      sendValue('PLC2!urunlerGuncelle', 1);
      setUpdateProductLoad(false);
    }, 1500);
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Grid container display={'flex'} justifyContent={'space-between'}>
          <Grid item>
            <Typography fontSize={20} mb={1} fontWeight={'bold'}>
              Etiketler
            </Typography>
          </Grid>
          <Grid item mb={1} ml={1}>
            <Button
              startIcon={<ArrowRotateLeft size={32} />}
              variant="contained"
              color="primary"
              disabled={updateProductLoad ? true : false}
              sx={{ backgroundColor: '#1B56FD' }}
              onClick={() => {
                updateProduct();
              }}
            >
              {updateProductLoad ? 'Güncelleniyor...' : 'Ürün Güncelle'}
            </Button>
          </Grid>
        </Grid>
        <Grid display={'flex'} flexDirection={'row'} height={370} justifyContent={'start'} flexWrap={'wrap'}>
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', width: 700 }}>Etiket Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Durum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getEtiket.map((urun, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer', // Satırın tıklanabilir olduğunu göstermek için
                      // '&:active': { border: '2px solid lime' } // Hover efekti
                      border: selectedRow.id === urun.id ? '2px solid lime' : 'none'
                    }}
                    onClick={() => {
                      fetchEtiketDetay(urun.id);
                      setSelectEtiket(urun);
                      setSelectedRow(urun);
                      setIsDeleted(false);
                    }} // Satır tıklama olayı
                  >
                    <TableCell sx={{ textAlign: 'center' }}>{urun.etiketAd}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{urun.taze ? 'Taze' : 'Donuk'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid mt={4} display={'flex'} flexDirection={'row'}>
          <Grid display={'flex'}>
            <Grid display={'flex'} flexDirection={'column'}>
              <Typography fontSize={20} ml={0.5} mb={1} fontWeight={'bold'}>
                Etiket Detayları
              </Typography>
              <TextField
                multiline
                rows={9}
                value={isDeleted ? '' : etiketData}
                variant="outlined"
                InputProps={{
                  style: {
                    fontFamily: 'monospace', // Kod yazımı için uygun yazı tipi
                    fontSize: '14px', // Yazı boyutu
                    lineHeight: '1.5', // Satır aralığı
                    whiteSpace: 'pre' // Kod formatını korumak için
                  }
                }}
                style={{
                  maxHeight: '400px', // Maksimum yükseklik
                  width: '1200px',
                  overflow: 'auto' // Kaydırma özelliği
                }}
              />
            </Grid>
          </Grid>
          <Grid container display={'flex'} mt={0.3} flexDirection={'column'} spacing={1} mr={5} alignItems="end">
            <Typography fontSize={20} mr={7.2} fontWeight={'bold'}>
              Etiket İşlemleri
            </Typography>
            <Grid item>
              <Button
                variant="contained"
                color="warning"
                endIcon={<Magicpen size={32} />}
                onClick={() => {
                  if (selectEtiket.length <= 0) toast.error('Lütfen Bir Etiket Seçiniz');
                  else setUpdateLabel(true);
                }}
                sx={{ width: 250, height: 55 }}
              >
                Etiket Güncelle
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                endIcon={<Add size={32} />}
                onClick={() => setAddLabel(true)}
                sx={{ width: 250, height: 55, backgroundColor: '#5CB338' }}
              >
                Etiket Ekle
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                endIcon={<CloseCircle size={32} />}
                onClick={() => {
                  if (selectEtiket.length <= 0) toast.error('Lütfen Bir Etiket Seçiniz');
                  else setDeleteLabel(true);
                }}
                sx={{ width: 250, height: 55 }}
              >
                Etiket Sil
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                endIcon={<ExportCurve size={32} />}
                variant="contained"
                onClick={downloadFile}
                sx={{ width: 250, height: 55, backgroundColor: '#074799' }}
              >
                Etiket Export (.txt)
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => sendToPrinter(1)}
                endIcon={<Send size={32} />}
                variant="contained"
                size="large"
                color="secondary"
                sx={{ width: 250, height: 60, backgroundColor: '#123458' }}
              >
                Gönder
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      {updateLabel && (
        <UpdateLabelModal
          openModal={updateLabel}
          setOpenModal={setUpdateLabel}
          selectEtiket={selectEtiket}
          refreshTable={fetchData}
          refreshDetailTable={(id) => getEtiketDetay(id)}
          toastMessage={toastMessage}
        />
      )}
      {addLabel && <AddLabelModal openModal={addLabel} setOpenModal={setAddLabel} refreshTable={fetchData} toastMessage={toastMessage} />}
      {deleteLabel && (
        <DeleteLabelModal
          openModal={deleteLabel}
          setOpenModal={setDeleteLabel}
          selectEtiket={selectEtiket}
          refreshTable={fetchData}
          toastMessage={toastMessage}
          setIsDeleted={setIsDeleted}
        />
      )}
    </>
  );
}
