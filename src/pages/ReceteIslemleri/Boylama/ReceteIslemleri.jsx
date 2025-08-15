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
import AddLabelModal from 'components/Modals/Terazi/AddLabelModal';
import DeleteLabelModal from 'components/Modals/Terazi/DeleteLabelModal';
import UpdateRecipeModal from 'components/Modals/Boylama/UpdateRecipeModal';
import UpdateRecipeDetailModal from 'components/Modals/Boylama/UpdateRecipeDetailModal';
import AddRecipeModal from 'components/Modals/Boylama/AddRecipeModal';
import AddRecipeDetailModal from 'components/Modals/Boylama/AddRecipeDetailModal';
import DeleteRecipeModal from 'components/Modals/Boylama/DeleteRecipeModal';
import DeleteRecipeDetailModal from 'components/Modals/Boylama/DeleteRecipeDetailModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, CloseCircle, ArrowRotateLeft, Magicpen, ExportCurve, TickCircle } from 'iconsax-react';
import Tooltip from '@mui/material/Tooltip';

export default function EtiketIslemleri() {
  const [updateRecipeDetail, setUpdateRecipeDetail] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState(false);
  const [addRecipe, setAddRecipe] = useState(false);
  const [addRecipeDetail, setAddRecipeDetail] = useState(false);
  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const [deleteRecipeDetail, setDeleteRecipeDetail] = useState(false);
  const [getEtiket, setGetEtiket] = useState([]);
  const [getMachines, setGetMachines] = useState([]);
  const [getEtiketDetay, setGetEtiketDetay] = useState([]);

  const [selectEtiket, setSelectEtiket] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRecipeDetail, setSelectedRecipteDetail] = useState([]);

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetReceteler`).then((res) => {
      setGetEtiket(res.data);
    });
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetMakinalar`).then((res) => {
      setGetMachines(res.data);
    });
  };
  const fetchEtiketDetay = async (id) => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/GetReceteDetayByReceteId`, {
        params: {
          receteId: id
        }
      })
      .then((res) => {
        setGetEtiketDetay(res.data);
      });
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
        .get(`${GetAPIUrl()}/api/Boylama/GetActiveReceteler`, {
          params: {
            isActive: 1
          }
        })
        .then((res) => {
          setGetEtiket(res.data);
        });
    } else if (status === 'Pasif') {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetActiveReceteler`, {
          params: {
            isActive: 0
          }
        })
        .then((res) => {
          setGetEtiket(res.data);
        });
    }
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Grid item>
          <Typography mb={-5} fontSize={20} fontWeight={'bold'}>
            Receteler
          </Typography>
          <Grid mb={2} display={'flex'} justifyContent={'flex-end'} mr={38}>
            <Autocomplete
              sx={{ width: 260 }}
              options={productStatus.map((product) => product.name)}
              onChange={(event, newValue) => {
                const search = newValue || '';
                searchProduct(search);
              }}
              renderInput={(params) => <TextField {...params} label="Reçete Durumu" variant="outlined" />}
            />
          </Grid>
          <Grid display={'flex'} flexDirection={'row'}>
            <Grid justifyContent={'start'} flexWrap={'wrap'}>
              <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: 'black' }}>
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', width: 1500 }}>Reçete Kodu</TableCell>
                      <TableCell sx={{ textAlign: 'center', width: 1500 }}>Reçete Adı</TableCell>
                      <TableCell sx={{ textAlign: 'center', width: 1500 }}>Makina Adı</TableCell>
                      <TableCell sx={{ textAlign: 'center', width: 1500 }}>Aktif</TableCell>
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
                          fetchEtiketDetay(urun.id);
                          setSelectEtiket(urun);
                          setSelectedRow(urun);
                        }} // Satır tıklama olayı
                      >
                        <TableCell sx={{ textAlign: 'center' }}>{urun.receteKodu}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip title={urun.receteAdi}>
                            <span>
                              {urun.receteAdi && urun.receteAdi.length > 20 ? `${urun.receteAdi.slice(0, 20)}...` : urun.receteAdi || ''}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{urun.makinaAd}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {urun.isActive ? <TickCircle size={22} color="lime" /> : <CloseCircle size={22} color="red" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid container display={'flex'} flexDirection={'column'} spacing={1} alignItems="end" justifyContent={'start'}>
              <Typography fontSize={20} mr={6.2} fontWeight={'bold'}>
                Reçete İşlemleri
              </Typography>
              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  endIcon={<Magicpen size={32} />}
                  onClick={() => {
                    if (selectEtiket.length <= 0) toast.error('Lütfen Bir Reçete Seçiniz');
                    else setUpdateRecipe(true);
                  }}
                  sx={{ width: 250, height: 55 }}
                >
                  Reçete Güncelle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<Add size={32} />}
                  onClick={() => setAddRecipe(true)}
                  sx={{ width: 250, height: 55 }}
                >
                  Reçete Ekle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<CloseCircle size={32} />}
                  onClick={() => {
                    if (selectEtiket.length <= 0) toast.error('Lütfen Bir Reçete Seçiniz');
                    else setDeleteRecipe(true);
                  }}
                  sx={{ width: 250, height: 55 }}
                >
                  Reçete Sil
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={5}>
          <Typography fontSize={20} ml={0.5} fontWeight={'bold'}>
            Reçete Detayları
          </Typography>
          <Grid display={'flex'} flexDirection={'row'}>
            <Grid display={'flex'}>
              <Grid display={'flex'} flexDirection={'column'}>
                <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>İsim</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Grup No</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Hedef Kilo</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Hedef Adet</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Tolerans Kilo</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Alt Limit</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Üst Limit</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Kefeler</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Ürün Adı</TableCell>
                        <TableCell sx={{ textAlign: 'center', width: 690 }}>Mod Adı</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getEtiketDetay.map((urun, index) => (
                        <TableRow
                          key={index}
                          sx={{ border: selectedRecipeDetail.id === urun.id ? '2px solid lime' : 'none', cursor: 'pointer' }}
                          onClick={() => {
                            setSelectedRecipteDetail(urun);
                          }}
                        >
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Tooltip title={urun.ad}>
                              <span>{urun.ad && urun.ad.length > 20 ? `${urun.ad.slice(0, 20)}...` : urun.ad || ''}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.grupNo}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.hedefKilo}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.hedefAdet}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.toleransKg}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.altLimit}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.ustLimit}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.kefeler}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Tooltip title={urun.urunAdi}>
                              <span>
                                {urun.urunAdi && urun.urunAdi.length > 20 ? `${urun.urunAdi.slice(0, 20)}...` : urun.urunAdi || ''}
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{urun.modAdi}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid container display={'flex'} flexDirection={'column'} spacing={1} alignItems="end" justifyContent={'start'}>
              <Typography fontSize={20} mr={3.2} fontWeight={'bold'}>
                Reçete Detay İşlemleri
              </Typography>
              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  endIcon={<Magicpen size={32} />}
                  onClick={() => {
                    if (selectedRecipeDetail.length === 0) toast.error('Lütfen Bir Detay Seçiniz');
                    else setUpdateRecipeDetail(true);
                  }}
                  sx={{ width: 250, height: 55 }}
                >
                  Detay Güncelle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<Add size={32} />}
                  onClick={() => {
                    if (selectEtiket.length <= 0) toast.error('Lütfen Bir Reçete Seçiniz');
                    else setAddRecipeDetail(true);
                  }}
                  sx={{ width: 250, height: 55 }}
                >
                  Detay Ekle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<CloseCircle size={32} />}
                  onClick={() => {
                    if (selectEtiket.length <= 0) toast.error('Lütfen Bir Detay Seçiniz');
                    else setDeleteRecipeDetail(true);
                  }}
                  sx={{ width: 250, height: 55 }}
                >
                  Detay Sil
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      {updateRecipe && (
        <UpdateRecipeModal
          openModal={updateRecipe}
          setOpenModal={setUpdateRecipe}
          selectEtiket={selectEtiket}
          fetchData={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {updateRecipeDetail && (
        <UpdateRecipeDetailModal
          openModal={updateRecipeDetail}
          setOpenModal={setUpdateRecipeDetail}
          selectEtiket={selectedRecipeDetail}
          selectMachine={selectEtiket}
          refreshTable={() => fetchEtiketDetay(selectEtiket.id)}
          toastMessage={toastMessage}
        />
      )}
      {addRecipe && (
        <AddRecipeModal openModal={addRecipe} setOpenModal={setAddRecipe} refreshTable={fetchData} toastMessage={toastMessage} />
      )}
      {addRecipeDetail && (
        <AddRecipeDetailModal
          openModal={addRecipeDetail}
          setOpenModal={setAddRecipeDetail}
          refreshTable={() => fetchEtiketDetay(selectEtiket.id)}
          selectEtiket={selectEtiket}
          toastMessage={toastMessage}
        />
      )}
      {deleteRecipe && (
        <DeleteRecipeModal
          openModal={deleteRecipe}
          setOpenModal={setDeleteRecipe}
          selectEtiket={selectEtiket}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {deleteRecipeDetail && (
        <DeleteRecipeDetailModal
          openModal={deleteRecipeDetail}
          setOpenModal={setDeleteRecipeDetail}
          selectEtiket={selectedRecipeDetail}
          refreshTable={() => fetchEtiketDetay(selectEtiket.id)}
          toastMessage={toastMessage}
        />
      )}
    </>
  );
}
