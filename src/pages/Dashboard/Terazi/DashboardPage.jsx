import { useEffect, useState } from 'react';
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
import AddGroupModal from 'components/Modals/Terazi/AddGroupModal';
import UpdateGroupModal from 'components/Modals/Terazi/UpdateGroupModal';
import AddProductModal from 'components/Modals/Terazi/AddProductModal';
import UpdateProductModal from 'components/Modals/Terazi/UpdateProductModal';
import DeleteGroupModal from 'components/Modals/Terazi/DeleteGroupModal';
import DeleteProductModal from 'components/Modals/Terazi/DeleteProductModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { TickCircle, CloseCircle, Add, Magicpen, Send } from 'iconsax-react';
import Tooltip from '@mui/material/Tooltip';

export default function DashboardPage() {
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
    await axios.get(`${GetAPIUrl()}/api/Product/GetProductGroup`).then((res) => {
      setGetUrunGrup(res.data);
    });
    await axios.get(`${GetAPIUrl()}/api/Product/GetProduct`).then((res) => {
      setGetUrun(res.data);
    });
  };
  const getUrunTable = async (id) => {
    await axios
      .get(`${GetAPIUrl()}/api/Product/GetProductGroupByProductId`, {
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
        .get(`${GetAPIUrl()}/api/Product/GetActiveProduct`, {
          params: {
            isActive: 1
          }
        })
        .then((res) => {
          setGetUrun(res.data);
        });
    } else if (status === 'Pasif') {
      await axios
        .get(`${GetAPIUrl()}/api/Product/GetActiveProduct`, {
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

  const sendToPrinter = async () => {
    await axios
      .post(`${GetAPIUrl()}/api/Terazi/SendInfo`)
      .then(() => {
        toast.success('Gönderme İşlemi Başarılı');
      })
      .catch(() => {
        toast.error('Gönderme İşlemi Başarısız');
      });
  };

  useEffect(() => {
    fetchData();
  }, [openAddGroup, openUpdateGroup]);

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Grid display={'flex'} justifyContent={'start'} mb={1}>
          <Autocomplete
            sx={{ width: 500 }}
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
              sx={{ width: 500 }}
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
                      // '&:active': { border: '2px solid lime' }
                      border: selectedRow.id === urun.id ? '2px solid lime' : 'none'
                    }}
                    onClick={() => {
                      setSelectProduct(urun);
                      setSelectedRow(urun);
                    }}
                  >
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.isAktif ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
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
                      <Tooltip title={urun.grupAdi}>
                        <span>{urun.grupAdi && urun.grupAdi.length > 20 ? `${urun.grupAdi.slice(0, 20)}...` : urun.grupAdi || ''}</span>
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
                      <Tooltip title={urun.urunAdi}>
                        <span>{urun.urunAdi && urun.urunAdi.length > 20 ? `${urun.urunAdi.slice(0, 20)}...` : urun.urunAdi || ''}</span>
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
                      <Tooltip title={urun.urunNo}>
                        <span>{urun.urunNo && urun.urunNo.length > 20 ? `${urun.urunNo.slice(0, 20)}...` : urun.urunNo || ''}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.paletIciAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.rafOmru}</TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.barkodNo1}>
                        <span>
                          {urun.barkodNo1 && urun.barkodNo1.length > 20 ? `${urun.barkodNo1.slice(0, 20)}...` : urun.barkodNo1 || ''}
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
                      <Tooltip title={urun.barkodNo2}>
                        <span>
                          {urun.barkodNo2 && urun.barkodNo2.length > 20 ? `${urun.barkodNo2.slice(0, 20)}...` : urun.barkodNo2 || ''}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.barkodTipi}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.paletEtiketiMan ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.koliEtiketiMan ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.etiketTipiKoli ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>
                      {urun.etiketTipiPalet ? <TickCircle size="32" color="#37d67a" /> : <CloseCircle size="32" color="#FF8A65" />}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.etiketNo1}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.etiketNo2}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.koliIciAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.fiyat}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.dara}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.altLimit}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.ustLimit}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.koliEtiketAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.paletEtiketAdet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.sabitAgirlikPalet}</TableCell>
                    <TableCell sx={{ textAlign: 'center', width: '120px' }}>{urun.sabitAgirlikKoli}</TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        width: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Tooltip title={urun.aciklama1}>
                        <span>
                          {urun.aciklama1 && urun.aciklama1.length > 20 ? `${urun.aciklama1.slice(0, 20)}...` : urun.aciklama1 || ''}
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
                      <Tooltip title={urun.aciklama2}>
                        <span>
                          {urun.aciklama2 && urun.aciklama2.length > 20 ? `${urun.aciklama2.slice(0, 20)}...` : urun.aciklama2 || ''}
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
                      <Tooltip title={urun.aciklama3}>
                        <span>
                          {urun.aciklama3 && urun.aciklama3.length > 20 ? `${urun.aciklama3.slice(0, 20)}...` : urun.aciklama3 || ''}
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
                      <Tooltip title={urun.aciklama4}>
                        <span>
                          {urun.aciklama4 && urun.aciklama4.length > 20 ? `${urun.aciklama4.slice(0, 20)}...` : urun.aciklama4 || ''}
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
                      <Tooltip title={urun.aciklama5}>
                        <span>
                          {urun.aciklama5 && urun.aciklama5.length > 20 ? `${urun.aciklama5.slice(0, 20)}...` : urun.aciklama5 || ''}
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
                endIcon={<Magicpen size={32} />}
                variant="contained"
                color="warning"
                size="large"
                onClick={() => {
                  if (selectProduct.id > 0) setOpenUpdateProduct(true);
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
                  if (selectProduct.id > 0) setOpenDeleteProduct(true);
                  else toast.error('Lütfen Önce Ürün Seçiniz');
                }}
                sx={{ width: 220, height: 60, mr: 1 }}
              >
                Ürün Sil
              </Button>
              <Button
                onClick={() => sendToPrinter()}
                endIcon={<Send size={32} />}
                variant="contained"
                size="large"
                color="primary"
                sx={{ width: 220, height: 60, backgroundColor: '#074799' }}
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
        <AddProductModal
          openModal={openAddProduct}
          setOpenModal={setOpenAddProduct}
          refreshTable={getUrunTable}
          toastMessage={toastMessage}
        />
      )}
      {openUpdateProduct && (
        <UpdateProductModal
          selectProduct={selectProduct}
          openModal={openUpdateProduct}
          setOpenModal={setOpenUpdateProduct}
          refreshTable={getUrunTable}
          toastMessage={toastMessage}
        />
      )}
      {openDeleteGroup && (
        <DeleteGroupModal
          open={openDeleteGroup}
          setOpen={setOpenDeleteGroup}
          selectGroup={selectGroup}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
      {openDeleteProduct && (
        <DeleteProductModal
          open={openDeleteProduct}
          setOpen={setOpenDeleteProduct}
          selectProduct={selectProduct}
          refreshTable={fetchData}
          toastMessage={toastMessage}
        />
      )}
    </>
  );
}
