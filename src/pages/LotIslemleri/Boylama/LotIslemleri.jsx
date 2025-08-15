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
import UpdateLotModal from 'components/Modals/Boylama/UpdateLotModal';
import DeleteLotModal from 'components/Modals/Boylama/DeleteLotModal';
import AddLotModal from 'components/Modals/Boylama/AddLotModal';
import AddLabelModal from 'components/Modals/Terazi/AddLabelModal';
import DeleteLabelModal from 'components/Modals/Terazi/DeleteLabelModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, CloseCircle, ArrowRotateLeft, Magicpen, ExportCurve, TickCircle } from 'iconsax-react';

export default function EtiketIslemleri() {
  const [updateLabel, setUpdateLabel] = useState(false);
  const [updateLot, setUpdateLot] = useState(false);
  const [addLot, setAddLot] = useState(false);
  const [deleteLot, setDeleteLot] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState(false);
  const [getEtiket, setGetEtiket] = useState([]);
  const [selectEtiket, setSelectEtiket] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetLots`).then((res) => {
      setGetEtiket(res.data);
    });
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
  };

  const productStatus = [
    {
      id: 1,
      name: 'Tümü'
    },
    {
      id: 2,
      name: 'Aktif'
    },
    {
      id: 3,
      name: 'Pasif'
    }
  ];

  const searchProduct = async (status) => {
    if (status === 'Tümü') {
      fetchData();
    } else if (status === 'Aktif') {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetActiveLots`, {
          params: {
            isActive: 1
          }
        })
        .then((res) => {
          setGetEtiket(res.data);
        });
    } else if (status === 'Pasif') {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetActiveLots`, {
          params: {
            isActive: 0
          }
        })
        .then((res) => {
          setGetEtiket(res.data);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Typography fontSize={20} mb={-3} fontWeight={'bold'}>
          Lotlar
        </Typography>
        <Grid mb={2} display={'flex'} justifyContent={'flex-end'} mr={39}>
          <Autocomplete
            sx={{ width: 260 }}
            options={productStatus.map((product) => product.name)}
            onChange={(event, newValue) => {
              const search = newValue || '';
              searchProduct(search);
            }}
            renderInput={(params) => <TextField {...params} label="Lot Durumu" variant="outlined" />}
          />
        </Grid>
        <Grid display={'flex'} flexDirection={'row'}>
          <Grid display={'flex'} flexDirection={'row'} height={370} justifyContent={'start'} flexWrap={'wrap'}>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', width: 1000 }}>Lot Yazıcı-1</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: 1000 }}>Lot Yazıcı-2</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: 1000 }}>Lot Yazıcı-3</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: 1000 }}>Giriş Kilo</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: 1000 }}>Açıklama</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: 1000 }}>Aktif</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getEtiket.map((urun, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        border: selectedRow.id === urun.id ? '2px solid lime' : 'none'
                      }}
                      onClick={() => {
                        setSelectEtiket(urun);
                        setSelectedRow(urun);
                      }}
                    >
                      <TableCell sx={{ textAlign: 'center' }}>{urun.lotYazici1}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{urun.lotYazici2}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{urun.lotYazici3}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{urun.girisKilo}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{urun.aciklama}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {urun.isActive ? <TickCircle size={23} color="lime" /> : <CloseCircle size={23} color="#F93827" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container display={'flex'} flexDirection={'column'} spacing={1} alignItems="end" justifyContent={'start'}>
            <Typography fontSize={20} mr={9.2} fontWeight={'bold'}>
              Lot İşlemleri
            </Typography>
            <Grid item>
              <Button
                variant="contained"
                color="warning"
                endIcon={<Magicpen size={32} />}
                onClick={() => {
                  if (selectEtiket.length <= 0) toast.error('Lütfen Bir Lot Seçiniz');
                  else setUpdateLot(true);
                }}
                sx={{ width: 250, height: 55 }}
              >
                Lot Güncelle
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                endIcon={<Add size={32} />}
                onClick={() => setAddLot(true)}
                sx={{ width: 250, height: 55 }}
              >
                Lot Ekle
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                endIcon={<CloseCircle size={32} />}
                onClick={() => {
                  if (selectEtiket.length <= 0) toast.error('Lütfen Bir Lot Seçiniz');
                  else setDeleteLot(true);
                }}
                sx={{ width: 250, height: 55 }}
              >
                Lot Sil
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      {updateLot && (
        <UpdateLotModal
          openModal={updateLot}
          setOpenModal={setUpdateLot}
          selectEtiket={selectEtiket}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {deleteLot && (
        <DeleteLotModal
          openModal={deleteLot}
          setOpenModal={setDeleteLot}
          selectEtiket={selectEtiket}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {addLot && <AddLotModal openModal={addLot} setOpenModal={setAddLot} refreshTable={fetchData} toastMessage={toastMessage} />}
    </>
  );
}
