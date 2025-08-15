import { useEffect, useState } from 'react';
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
import UpdateLabelModal from 'components/Modals/Terazi/UpdateLabelModal';
import AddLabelModal from 'components/Modals/Terazi/AddLabelModal';
import DeleteLabelModal from 'components/Modals/Terazi/DeleteLabelModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, CloseCircle, ArrowRotateLeft, Magicpen, ExportCurve } from 'iconsax-react';

export default function EtiketIslemleri() {
  const [updateLabel, setUpdateLabel] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState(false);
  const [getEtiket, setGetEtiket] = useState([]);
  const [getEtiketDetay, setGetEtiketDetay] = useState([]);
  const [selectEtiket, setSelectEtiket] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const fileNames = ['urunList.txt', 'grupList.txt', 'etiketList.txt', 'etiketDetayList.txt'];

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Label/GetLabel`).then((res) => {
      setGetEtiket(res.data);
    });
  };
  const fetchEtiketDetay = async (id) => {
    await axios
      .get(`${GetAPIUrl()}/api/Label/GetLabelDetail`, {
        params: {
          etiketId: id
        }
      })
      .then((res) => {
        setGetEtiketDetay(res.data);
      });
  };

  const downloadFile = async () => {
    try {
      const fileRequests = fileNames.map((fileName) =>
        axios.get(`${GetAPIUrl()}/api/Terazi/DownloadFile?fileName=${fileName}`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Grid display={'flex'} flexDirection={'row'} height={370} justifyContent={'start'} flexWrap={'wrap'}>
          <Typography fontSize={20} mb={1} fontWeight={'bold'}>
            Receteler
          </Typography>
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
                value={getEtiketDetay.map((etk) => etk.etiketData)}
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
                sx={{ width: 250, height: 55 }}
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
                color="secondary"
                endIcon={<ExportCurve size={32} />}
                variant="contained"
                onClick={downloadFile}
                sx={{ width: 250, height: 55 }}
              >
                Etiket Export (.txt)
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
        />
      )}
    </>
  );
}
