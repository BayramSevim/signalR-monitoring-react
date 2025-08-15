import { useEffect, useState, useContext } from 'react';
import {
  Grid,
  Typography,
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
import AddGroupModal from 'components/Modals/Boylama/AddGroupModal';
import UpdateGroupModal from 'components/Modals/Boylama/UpdateGroupModal';
import AddProductModal from 'components/Modals/Boylama/AddProductModal';
import UpdateProductModal from 'components/Modals/Boylama/UpdateProductModal';
import DeleteGroupModal from 'components/Modals/Boylama/DeleteGroupModal';
import DeleteProductModal from 'components/Modals/Boylama/DeleteProductModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { TickCircle, CloseCircle, Add, Magicpen, Send, Copy, ArrowRotateLeft } from 'iconsax-react';
import Tooltip from '@mui/material/Tooltip';
import { SignalRContext } from 'contexts/SignalRContext';

export default function DashboardPage() {
  const { sendValue } = useContext(SignalRContext);

  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openUpdateGroup, setOpenUpdateGroup] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);

  const [getUrunGrup, setGetUrunGrup] = useState([]);
  const [getUrun, setGetUrun] = useState([]);
  const [selectGroup, setSelectGroup] = useState('');
  const [selectProduct, setSelectProduct] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [updateProductLoad, setUpdateProductLoad] = useState(false);

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

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetProductGroup`).then((res) => {
      setGetUrunGrup(res.data);
    });
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetProduct`).then((res) => {
      setGetUrun(res.data);
    });
  };
  const getUrunTable = async (id) => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/GetProductGroupByProductId`, {
        params: {
          Id: id
        }
      })
      .then((res) => {
        setGetUrun(res.data);
      });
  };

  const searchProduct = async (status) => {
    if (status === 'Tümü') {
      fetchData();
    } else if (status === 'Aktif') {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetActiveProduct`, {
          params: {
            isActive: 1
          }
        })
        .then((res) => {
          setGetUrun(res.data);
        });
    } else if (status === 'Pasif') {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetActiveProduct`, {
          params: {
            isActive: 0
          }
        })
        .then((res) => {
          setGetUrun(res.data);
        });
    }
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
    else if (type === 3) toast.success(message);
    else if (type === 4) toast.error(message);
    else if (type === 5) toast.success(message);
    else if (type === 6) toast.error(message);
    else if (type === 7) toast.success(message);
    else if (type === 8) toast.error(message);
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
  }, [openAddGroup, openUpdateGroup]);

  const copyProduct = async () => {
    const urunModel = {
      id: 0,
      urunGrupId: selectedRow.UrunGrupId,
      urunAdi: selectedRow.UrunAdi || '',
      grupAdi: selectedRow.GrupAdi || '',
      urunNo: selectedRow.UrunNo || '',
      paletIciAdet: selectedRow.PaletIciAdet || 0,
      rafOmru: selectedRow.RafOmru || 0,
      barkodNo1: selectedRow.BarkodNo1 || '',
      barkodNo2: selectedRow.BarkodNo2 || '',
      barkodTipi: selectedRow.BarkodTipi || 0,
      paletEtiketiMan: selectedRow.PaletEtiketiMan || false,
      koliEtiketiMan: selectedRow.KoliEtiketiMan || false,
      etiketTipiKoli: selectedRow.EtiketTipiKoli || false,
      etiketTipiPalet: selectedRow.EtiketTipiPalet || false,
      etiketNo1: selectedRow.EtiketNo1 || 0,
      etiketNo2: selectedRow.EtiketNo2 || 0,
      koliIciAdet: selectedRow.KoliIciAdet || 0,
      fiyat: selectedRow.Fiyat || 0,
      dara: selectedRow.Dara || 0,
      altLimit: selectedRow.AltLimit || 0,
      ustLimit: selectedRow.UstLimit || 0,
      koliEtiketAdet: selectedRow.KoliEtiketAdet || 0,
      paletEtiketAdet: selectedRow.PaletEtiketAdet || 0,
      sabitAgirlikPalet: selectedRow.SabitAgirlikPalet || 0,
      sabitAgirlikKoli: selectedRow.SabitAgirlikKoli || 0,
      aciklama1: selectedRow.Aciklama1 || '',
      aciklama2: selectedRow.Aciklama2 || '',
      aciklama3: selectedRow.Aciklama3 || '',
      aciklama4: selectedRow.Aciklama4 || '',
      aciklama5: selectedRow.Aciklama5 || '',
      isAktif: selectedRow.IsAktif || false,
      etiketNo1Id: selectedRow.EtiketNo1Id || 0,
      etiketNo2Id: selectedRow.EtiketNo2Id || 0
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/InsertProduct`, urunModel)
      .then((res) => {
        fetchData();
        toastMessage('Ürün Kopyalama İşlemi Başarılı', 3);
      })
      .catch((err) => {
        console.log(err);
        toastMessage('Ürün Kopyalama İşlemi Başarısız', 4);
      });
  };

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
        <Grid display={'flex'} justifyContent={'start'} mb={1}>
          <Autocomplete
            sx={{ width: 450 }}
            options={getUrunGrup}
            getOptionLabel={(option) => `${option.grupAdi}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectGroup.grupAdi}
            onChange={(event, newValue) => {
              if (newValue) {
                setSelectGroup(newValue || '');
                const selectGrup = newValue.id;
                getUrunTable(selectGrup);
              } else {
                fetchData();
              }
            }}
            renderInput={(params) => <TextField {...params} label="Ürün Grubu" variant="outlined" />}
          />
          <Grid mb={1} ml={1}>
            <Autocomplete
              sx={{ width: 450 }}
              options={productStatus.map((product) => product.name)}
              // value={searchValue}
              onChange={(event, newValue) => {
                const search = newValue || '';
                searchProduct(search);
              }}
              renderInput={(params) => <TextField {...params} label="Ürün Durumu" variant="outlined" />}
            />
          </Grid>
          <Grid mb={1} ml={1}>
            <Button
              startIcon={<Add size={32} />}
              sx={{ backgroundColor: '#5CB338' }}
              variant="contained"
              color="success"
              onClick={() => setOpenAddGroup(true)}
            >
              Grup Ekle
            </Button>
          </Grid>
          <Grid mb={1} ml={1}>
            <Button
              startIcon={<Magicpen size={32} />}
              variant="contained"
              color="warning"
              onClick={() => {
                if (selectGroup) setOpenUpdateGroup(true);
                else toast.error('Lütfen Bir Grup Seçiniz');
              }}
            >
              Grup Güncelle
            </Button>
          </Grid>
          <Grid mb={1} ml={1}>
            <Button
              startIcon={<CloseCircle size={32} />}
              variant="contained"
              color="error"
              onClick={() => {
                if (selectGroup) setOpenDeleteGroup(true);
                else toast.error('Lütfen Bir Grup Seçiniz');
              }}
            >
              Grup Sil
            </Button>
          </Grid>
          <Grid mb={1} ml={1}>
            <Button
              startIcon={<ArrowRotateLeft size={32} />}
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#1B56FD' }}
              disabled={updateProductLoad ? true : false}
              onClick={() => {
                updateProduct();
              }}
            >
              {updateProductLoad ? 'Güncelleniyor...' : 'Makina Ürün Güncelle'}
            </Button>
          </Grid>
        </Grid>
        <Grid display={'flex'} flexDirection={'row'} height={680} justifyContent={'center'} flexWrap={'wrap'}>
          <TableContainer component={Paper} sx={{ marginTop: 0.1, maxHeight: 650, scrollbarColor: 'gray #0B192C' }}>
            <Table sx={{ tableLayout: 'fixed', minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Aktif</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '180px' }}>Grup Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Ürün Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Ürün No</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Palet İçi Adet</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Raf Ömrü</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Barkod No (Koli)</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Barkod No (Palet)</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Barkod Tipi</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Palet Etiketi Man</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Koli Etiketi Man</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Etiket Tipi (Koli)</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Etiket Tipi (Palet)</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Etiket (Koli)</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Etiket (Palet)</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Koli İçi Adet</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Fiyat</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Dara</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Alt Limit</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Üst Limit</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Koli Etiket Adet</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Palet Etiket Adet</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Sabit Ağırlık Palet</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Sabit Ağırlık Koli</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Açıklama - 1</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Açıklama - 2</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Açıklama - 3</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Açıklama - 4</TableCell>
                  <TableCell sx={{ textAlign: 'center', width: '120px' }}>Açıklama - 5</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getUrun.map((urun, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: selectedRow.Id === urun.Id ? '2px solid lime' : 'none'
                    }}
                    onClick={() => {
                      setSelectProduct(urun);
                      setSelectedRow(urun);
                    }}
                  >
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.IsAktif ? <TickCircle size="32" color="lime" /> : <CloseCircle size="32" color="red" />}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.GrupAdi}>
                        <span>{urun.GrupAdi && urun.GrupAdi.length > 20 ? `${urun.GrupAdi.slice(0, 20)}...` : urun.GrupAdi || ''}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.UrunAdi}>
                        <span>{urun.UrunAdi && urun.UrunAdi.length > 20 ? `${urun.UrunAdi.slice(0, 20)}...` : urun.UrunAdi || ''}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.UrunNo}>
                        <span>{urun.UrunNo && urun.UrunNo.length > 20 ? `${urun.UrunNo.slice(0, 20)}...` : urun.UrunNo || ''}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.PaletIciAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.RafOmru}</TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.BarkodNo1}>
                        <span>
                          {urun.BarkodNo1 && urun.BarkodNo1.length > 20 ? `${urun.BarkodNo1.slice(0, 20)}...` : urun.BarkodNo1 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.BarkodNo2}>
                        <span>
                          {urun.BarkodNo2 && urun.BarkodNo2.length > 20 ? `${urun.BarkodNo2.slice(0, 20)}...` : urun.BarkodNo2 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.BarkodTipi}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.PaletEtiketiMan ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.KoliEtiketiMan ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.EtiketTipiKoli ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.EtiketTipiPalet ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.EtiketNo1}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.EtiketNo2}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.KoliIciAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.Fiyat}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.Dara}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.AltLimit}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.UstLimit}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.KoliEtiketAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.PaletEtiketAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.SabitAgirlikPalet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.SabitAgirlikKoli}</TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.Aciklama1}>
                        <span>
                          {urun.Aciklama1 && urun.Aciklama1.length > 20 ? `${urun.Aciklama1.slice(0, 20)}...` : urun.Aciklama1 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.Aciklama2}>
                        <span>
                          {urun.Aciklama2 && urun.Aciklama2.length > 20 ? `${urun.Aciklama2.slice(0, 20)}...` : urun.Aciklama2 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.Aciklama3}>
                        <span>
                          {urun.Aciklama3 && urun.Aciklama3.length > 20 ? `${urun.Aciklama3.slice(0, 20)}...` : urun.Aciklama3 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.Aciklama4}>
                        <span>
                          {urun.Aciklama4 && urun.Aciklama4.length > 20 ? `${urun.Aciklama4.slice(0, 20)}...` : urun.Aciklama4 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.Aciklama5}>
                        <span>
                          {urun.Aciklama5 && urun.Aciklama5.length > 20 ? `${urun.Aciklama5.slice(0, 20)}...` : urun.Aciklama5 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid display={'flex'} flexDirection={'row'}>
          <Grid container display={'flex'} flexDirection={'column'} spacing={1} alignItems="end">
            <Grid item>
              <Button
                endIcon={<Add size={32} />}
                variant="contained"
                color="success"
                size="large"
                onClick={() => setOpenAddProduct(true)}
                sx={{ width: 220, height: 60, mr: 1, backgroundColor: '#5CB338' }}
              >
                Ürün Ekle
              </Button>
              <Button
                endIcon={<Copy size={32} />}
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => copyProduct()}
                sx={{ width: 220, height: 60, mr: 1, backgroundColor: '#547792' }}
              >
                Ürün Kopyala
              </Button>
              <Button
                endIcon={<Magicpen size={32} />}
                variant="contained"
                color="warning"
                size="large"
                onClick={() => {
                  if (selectProduct.Id > 0) setOpenUpdateProduct(true);
                  else toast.error('Lütfen Önce Ürün Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Ürün Güncelle
              </Button>
              <Button
                endIcon={<Magicpen size={32} />}
                variant="contained"
                color="error"
                size="large"
                onClick={() => {
                  if (selectProduct.Id > 0) setOpenDeleteProduct(true);
                  else toast.error('Lütfen Önce Ürün Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Ürün Sil
              </Button>
              <Button
                onClick={() => sendToPrinter(1)}
                endIcon={<Send size={32} />}
                variant="contained"
                size="large"
                color="primary"
                sx={{ width: 220, height: 60, backgroundColor: '#1B56FD' }}
              >
                Gönder
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>

      {openAddGroup && <AddGroupModal openModal={openAddGroup} setOpenModal={setOpenAddGroup} toastMessage={toastMessage} />}
      {openUpdateGroup && (
        <UpdateGroupModal
          selectGroup={selectGroup}
          openModal={openUpdateGroup}
          setOpenModal={setOpenUpdateGroup}
          toastMessage={toastMessage}
        />
      )}

      {openAddProduct && (
        <AddProductModal openModal={openAddProduct} setOpenModal={setOpenAddProduct} toastMessage={toastMessage} refreshTable={fetchData} />
      )}
      {openUpdateProduct && (
        <UpdateProductModal
          selectProduct={selectProduct}
          openModal={openUpdateProduct}
          setOpenModal={setOpenUpdateProduct}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {openDeleteGroup && (
        <DeleteGroupModal open={openDeleteGroup} setOpen={setOpenDeleteGroup} selectGroup={selectGroup} toastMessage={toastMessage} />
      )}
      {openDeleteProduct && (
        <DeleteProductModal
          open={openDeleteProduct}
          setOpen={setOpenDeleteProduct}
          selectProduct={selectProduct}
          toastMessage={toastMessage}
          refreshTable={fetchData}
        />
      )}
    </>
  );
}
