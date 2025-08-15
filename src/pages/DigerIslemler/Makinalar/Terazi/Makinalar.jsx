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
import AddMachineModal from 'components/Modals/Terazi/AddMachineModal';
import UpdateMachineModal from 'components/Modals/Terazi/UpdateMachineModal';
import DeleteMachineModal from 'components/Modals/Terazi/DeleteMachineModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Add, CloseCircle, ArrowRotateLeft, Send, Wifi, Magicpen } from 'iconsax-react';
import axios from 'axios';

export default function EtiketIslemleri() {
  const [openAddMachineModal, setOpenAddMachineModal] = useState(false);
  const [openUpdateMachineModal, setOpenUpdateMachineModal] = useState(false);
  const [openDeleteMachineModal, setOpenDeleteMachineModal] = useState(false);

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
    setSelectTeraziAdres(terazi.ipAdress);
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
  };

  // const sendSelectionToPrinter = async () => {
  //   await axios
  //     .get(`${GetAPIUrl()}/api/Terazi/SendSelectPrinterInfo`, {
  //       params: {
  //         ipAdress: selectedRow.ipAdress
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       toast.success('Seçili Teraziye Gönderme İşlemi Başarılı');
  //     })
  //     .catch((err) => {
  //       toast.error('Gönderme İşlemi Başarısız');
  //     });
  // };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Typography fontSize={20} fontWeight={'bold'}>
          Makinalar
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
                  <TableCell sx={{ textAlign: 'center' }}>IP Adres</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTerazi.map((terazi, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: selectedRow.id === terazi.id ? '2px solid lime' : 'none'
                    }}
                    onClick={() => {
                      selectedTerazi(terazi);
                      setSelectedRow(terazi);
                    }}
                  >
                    <TableCell sx={{ textAlign: 'center' }}>{terazi.teraziAdi}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{terazi.ipAdress}</TableCell>
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
                color="success"
                onClick={() => setOpenAddMachineModal(true)}
                sx={{ width: 220, height: 60, mr: 1, backgroundColor: '#5CB338' }}
              >
                Yeni Kayıt
              </Button>
              <Button
                endIcon={<Magicpen size={32} />}
                variant="contained"
                color="warning"
                onClick={() => {
                  if (selectTerazi.id > 0) setOpenUpdateMachineModal(true);
                  else toast.error('Güncellemek İçin Lütfen Terazi Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Teraziyi Güncelle
              </Button>
              <Button
                endIcon={<CloseCircle size={32} />}
                variant="contained"
                color="error"
                onClick={() => {
                  if (selectTerazi.id > 0) setOpenDeleteMachineModal(true);
                  else toast.error('Silmek İçin Lütfen Terazi Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Teraziyi Sil
              </Button>

              {/* <Button
                endIcon={<Send size={32} />}
                variant="contained"
                color="success"
                onClick={() => sendSelectionToPrinter()}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Teraziye Gönder
              </Button> */}
            </Grid>
          </Grid>
        </Grid>
      </MainCard>

      {openAddMachineModal && (
        <AddMachineModal open={openAddMachineModal} setOpen={setOpenAddMachineModal} refreshTable={fetchData} toastMessage={toastMessage} />
      )}
      {openUpdateMachineModal && (
        <UpdateMachineModal
          selectTerazi={selectTerazi}
          open={openUpdateMachineModal}
          setOpen={setOpenUpdateMachineModal}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {openDeleteMachineModal && (
        <DeleteMachineModal
          selectTerazi={selectTerazi}
          open={openDeleteMachineModal}
          setOpen={setOpenDeleteMachineModal}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
    </>
  );
}
