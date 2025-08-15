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
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Add, CloseCircle, ArrowRotateLeft, Magicpen, Send, Wifi } from 'iconsax-react';
import UpdatePrinterModal from 'components/Modals/Terazi/UpdatePrinterModal';

import axios from 'axios';
import DeletePrinterModal from 'components/Modals/Terazi/DeletePrinterModal';
import AddPrinterModal from 'components/Modals/Terazi/AddPrinterModal';

export default function EtiketIslemleri() {
  const [openUpdatePrinterModal, setOpenUpdatePrinterModal] = useState(false);
  const [openDeletePrinterModal, setOpenDeletePrinterModal] = useState(false);
  const [openAddPrinterModal, setOpenAddPrinterModal] = useState(false);

  const [getTerazi, setGetTerazi] = useState([]);
  const [selectTerazi, setSelectTerazi] = useState([]);
  const [selectTeraziName, setSelectTeraziName] = useState([]);
  const [selectTeraziAdres, setSelectTeraziAdres] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Terazi/GetScales`).then((res) => {
      setGetTerazi(res.data);
    });
  };

  const pingTest = async () => {
    if (selectTeraziAdres.length > 0) {
      await axios
        .get(`${GetAPIUrl()}/api/Terazi/PingTest`, {
          params: {
            ip: selectTeraziAdres
          }
        })
        .then((res) => {
          if (res.data.message === 'Ping Atma İşlemi Başarılı') toast.success(res.data.message);
          else toast.error(res.data.message);
        });
    } else {
      toast.error('Lütfen Bir Adres Seçiniz');
    }
  };

  const selectedTerazi = (terazi) => {
    setSelectTerazi(terazi);
    setSelectTeraziName(terazi.teraziAdi);
    setSelectTeraziAdres(terazi.yaziciIpAdres);
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
        <Typography fontSize={20} fontWeight={'bold'}>
          Yazıcılar
        </Typography>
        <Grid item display={'flex'} mb={2} mt={-5} alignItems={'end'} justifyContent={'end'}>
          <Button
            startIcon={<Wifi size={32} />}
            variant="contained"
            color="info"
            onClick={() => pingTest()}
            sx={{ width: 220, color: 'black', fontWeight: 'bold' }}
          >
            Ping Testi
          </Button>
        </Grid>

        <Grid display={'flex'} flexDirection={'row'} height={370} justifyContent={'start'} flexWrap={'wrap'}>
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', width: 700 }}>Terazi Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Yazıcı IP Adres</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTerazi.map((terazi, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer', // Satırın tıklanabilir olduğunu göstermek için
                      // '&:active': { border: '2px solid lime' } // Hover efekti
                      border: selectedRow.id === terazi.id ? '2px solid lime' : 'none'
                    }}
                    onClick={() => {
                      selectedTerazi(terazi);
                      setSelectedRow(terazi);
                    }}
                  >
                    <TableCell sx={{ textAlign: 'center' }}>{terazi.teraziAdi}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{terazi.yaziciIpAdres}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid display={'flex'} mt={5} flexDirection={'row'}>
          <Grid container display={'flex'} flexDirection={'column'} spacing={1} alignItems="end">
            <Grid item>
              <Button
                endIcon={<Add size={32} />}
                variant="contained"
                size="large"
                color="success"
                onClick={() => setOpenAddPrinterModal(true)}
                sx={{ width: 220, height: 60, mr: 1, backgroundColor: '#5CB338' }}
              >
                Yazıcı Ekle
              </Button>
              <Button
                endIcon={<Magicpen size={32} />}
                variant="contained"
                color="warning"
                onClick={() => {
                  if (selectTerazi.id > 0) setOpenUpdatePrinterModal(true);
                  else toast.error('Lütfen Önce Terazi Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Yazıcıyı Güncelle
              </Button>
              <Button
                endIcon={<CloseCircle size={32} />}
                variant="contained"
                color="error"
                onClick={() => setOpenDeletePrinterModal(true)}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Yazıcıyı Sil
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>

      {openUpdatePrinterModal && (
        <UpdatePrinterModal
          selectTerazi={selectTerazi}
          open={openUpdatePrinterModal}
          setOpen={setOpenUpdatePrinterModal}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}

      {openDeletePrinterModal && (
        <DeletePrinterModal
          selectTerazi={selectTerazi}
          open={openDeletePrinterModal}
          setOpen={setOpenDeletePrinterModal}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}

      {openAddPrinterModal && (
        <AddPrinterModal open={openAddPrinterModal} setOpen={setOpenAddPrinterModal} refreshTable={fetchData} toastMessage={toastMessage} />
      )}
    </>
  );
}
