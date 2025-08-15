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
import AddMachineModal from 'components/Modals/Boylama/AddMachineModal';
import UpdateMachineModal from 'components/Modals/Boylama/UpdateMachineModal';
import DeleteMachineModal from 'components/Modals/Boylama/DeleteMachineModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Add, CloseCircle, ArrowRotateLeft, Send, Wifi, Magicpen } from 'iconsax-react';
import axios from 'axios';

export default function EtiketIslemleri() {
  const [openAddMachineModal, setOpenAddMachineModal] = useState(false);
  const [openUpdateMachineModal, setOpenUpdateMachineModal] = useState(false);
  const [openDeleteMachineModal, setOpenDeleteMachineModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [getTerazi, setGetTerazi] = useState([]);

  const [selectTerazi, setSelectTerazi] = useState([]);
  const [selectTeraziAdres, setSelectTeraziAdres] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedIpField, setSelectedIpField] = useState('');
  const [selectedIpValue, setSelectedIpValue] = useState('');

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetMakinalar`).then((res) => {
      setGetTerazi(res.data);
    });
  };

  const pingTest = async () => {
    if (selectedIpField) {
      try {
        const res = await axios.get(`${GetAPIUrl()}/api/Boylama/PingTest`, {
          params: {
            ip: selectedIpField
          }
        });
        if (res.data.message === 'Ping Atma İşlemi Başarılı') toast.success(res.data.message);
        else toast.error(res.data.message);
      } catch (err) {
        toast.error('Ping işlemi sırasında hata oluştu');
      }
    } else {
      toast.error('Lütfen IP içeren bir hücreye tıklayın');
    }
  };

  const selectedTerazi = (terazi) => {
    setSelectTerazi(terazi);
    setSelectTeraziAdres(terazi.IpAdress);
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
  };

  useEffect(() => {
    fetchData();
    const user = JSON.parse(localStorage.getItem('loginnedUser'));
    setIsAdmin(user[0].isAdmin);
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
                  <TableCell sx={{ textAlign: 'center', width: 400 }}>Makina Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Reçete Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Ip Adres</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Yazıcı Ip Adres-1</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Yazıcı Ip Adres-2</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Yazıcı Ip Adres-3</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Kefe Sayısı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Hat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(getTerazi) &&
                  getTerazi.map((terazi, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          cursor: 'pointer',
                          border: selectedRow.Id === terazi.Id ? '2px solid lime' : 'none'
                        }}
                        onClick={() => {
                          selectedTerazi(terazi);
                          setSelectedRow(terazi);
                        }}
                      >
                        <TableCell sx={{ textAlign: 'center' }}>{terazi.MakinaAdi}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{terazi.ReceteAdi}</TableCell>
                        <TableCell
                          sx={{
                            textAlign: 'center',
                            border: selectedIpValue !== '' && selectedIpValue === terazi.IpAdress ? '4px solid #FF9B17' : 'none'
                          }}
                          onClick={(e) => {
                            selectedTerazi(terazi);
                            setSelectedRow(terazi);
                            setSelectedIpField(terazi.IpAdress);
                            setSelectedIpValue(terazi.IpAdress);
                          }}
                        >
                          {terazi.IpAdress}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: 'center',
                            border: selectedIpValue !== '' && selectedIpValue === terazi.YaziciIpAdres1 ? '4px solid #FF9B17' : 'none'
                          }}
                          onClick={(e) => {
                            selectedTerazi(terazi);
                            setSelectedRow(terazi);
                            setSelectedIpField(terazi.YaziciIpAdres1);
                            setSelectedIpValue(terazi.YaziciIpAdres1);
                          }}
                        >
                          {terazi.YaziciIpAdres1}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: 'center',
                            border: selectedIpValue !== '' && selectedIpValue === terazi.YaziciIpAdres2 ? '4px solid #FF9B17' : 'none'
                          }}
                          onClick={(e) => {
                            selectedTerazi(terazi);
                            setSelectedRow(terazi);
                            setSelectedIpField(terazi.YaziciIpAdres2);
                            setSelectedIpValue(terazi.YaziciIpAdres2);
                          }}
                        >
                          {terazi.YaziciIpAdres2}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: 'center',
                            border: selectedIpValue !== '' && selectedIpValue === terazi.YaziciIpAdres3 ? '4px solid #FF9B17' : 'none'
                          }}
                          onClick={(e) => {
                            selectedTerazi(terazi);
                            setSelectedRow(terazi);
                            setSelectedIpField(terazi.YaziciIpAdres3);
                            setSelectedIpValue(terazi.YaziciIpAdres3);
                          }}
                        >
                          {terazi.YaziciIpAdres3}
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>{terazi.KefeSayisi}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{terazi.IsDouble ? 'Çift' : 'Tek'}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid display={'flex'} mt={5} flexDirection={'row'}>
          <Grid container display={'flex'} flexDirection={'column'} spacing={1} alignItems="end">
            <Grid item display={isAdmin ? 'block' : 'none'}>
              <Button
                endIcon={<Add size={32} />}
                variant="contained"
                color="success"
                onClick={() => setOpenAddMachineModal(true)}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Makina Ekle
              </Button>
              <Button
                endIcon={<Magicpen size={32} />}
                variant="contained"
                color="warning"
                onClick={() => {
                  if (selectTerazi.Id > 0) setOpenUpdateMachineModal(true);
                  else toast.error('Lütfen Bir Makina Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Makinayi Güncelle
              </Button>
              <Button
                endIcon={<CloseCircle size={32} />}
                variant="contained"
                color="error"
                onClick={() => {
                  if (selectTerazi.Id > 0) setOpenDeleteMachineModal(true);
                  else toast.error('Lütfen Bir Makina Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Seçili Makinayi Sil
              </Button>
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
