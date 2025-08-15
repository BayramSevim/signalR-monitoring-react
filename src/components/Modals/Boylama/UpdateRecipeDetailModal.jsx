import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography, Autocomplete } from '@mui/material';
import { CloseCircle, LogoutCurve, Save2 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';

const UpdateRecipeModal = ({ openModal, setOpenModal, selectEtiket, selectMachine, refreshTable, toastMessage }) => {
  const [receteDetayAd, setReceteDetayAd] = useState(selectEtiket.ad);
  const [hedefKilo, setHedefKilo] = useState(selectEtiket.hedefKilo);
  const [hedefAdet, setHedefAdet] = useState(selectEtiket.hedefAdet);
  const [toleransKilo, setToleransKilo] = useState(selectEtiket.toleransKg);
  const [altLimit, setAltLimit] = useState(selectEtiket.altLimit);
  const [ustLimit, setUstLimit] = useState(selectEtiket.ustLimit);
  const [selectedKefeler, setSelectedKefeler] = useState([]);
  const [usedKefeler, setUsedKefeler] = useState([]);
  const [mods, setMods] = useState([]);
  const [selectMod, setSelectMod] = useState([]);
  const [selectProduct, setSelectProduct] = useState([]);
  const [product, setProduct] = useState([]);

  const [productGroups, setProductGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [visibleHedefKilo, setVisibleHedefKilo] = useState(true);
  const [visibleHedefAdet, setVisibleHedefAdet] = useState(true);
  const [visibleToleransKilo, setVisibleToleransKilo] = useState(true);
  const [visibleUrunSec, setVisibleUrunSec] = useState(true);

  const fetchUsingKefe = async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Boylama/GetReceteUsingKefeByReceteId`, {
        params: { receteId: selectEtiket.receteId }
      });

      const data = response.data;
      const currentKefeler =
        selectEtiket.kefeler
          ?.split(',')
          .map((k) => parseInt(k.trim()))
          .filter((k) => !isNaN(k)) || [];

      const otherKefeler = data.filter((item) => item.id !== selectEtiket.id).map((item) => item.kefeNo);

      const filteredUsedKefeler = otherKefeler.filter((kefe) => !currentKefeler.includes(kefe));

      setUsedKefeler(filteredUsedKefeler);
    } catch (error) {
      console.error('Kefe verileri çekilirken hata oluştu:', error);
    }
  };

  const fetchMods = async () => {
    const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetMods`);
    setMods(res.data);
    const selected = res.data.find((item) => item.id === selectEtiket.calismaModId);
    if (selected) setSelectMod(selected);
  };

  const fetchProductGroups = async () => {
    try {
      await axios.get(`${GetAPIUrl()}/api/Boylama/GetProductGroup`).then((res) => {
        setProductGroups(res.data);
      });
    } catch (error) {
      console.error('Ürün grupları alınamadı:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      await axios.get(`${GetAPIUrl()}/api/Boylama/GetProduct`).then((res) => {
        setProduct(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productGroups.length > 0 && product.length > 0) {
      const selected = product.find((item) => item.Id === selectEtiket.urunId);
      if (selected) {
        setSelectProduct(selected);
        const findProductGroup = productGroups.find((item) => item.id === selected.UrunGrupId);
        if (findProductGroup) setSelectedGroup(findProductGroup);
      }
    }
  }, [productGroups, product]);

  useEffect(() => {
    fetchProductGroups();
    fetchProduct();
    fetchUsingKefe();
    fetchMods();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      const filtered = product.filter((p) => p.UrunGrupId === selectedGroup.id);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(product);
    }
  }, [selectedGroup, product]);

  useEffect(() => {
    if (selectEtiket?.kefeler) {
      const selected = selectEtiket.kefeler.split(',').map((kefe) => parseInt(kefe.trim()));
      setSelectedKefeler(selected);
    }
  }, [selectEtiket]);

  useEffect(() => {
    if (selectMod.modAdi === 'Hiç') {
      setVisibleHedefKilo(false);
      setVisibleHedefAdet(false);
      setVisibleToleransKilo(false);
      setVisibleUrunSec(false);
    } else if (selectMod.modAdi === 'TamKilo') {
      setVisibleHedefKilo(true);
      setVisibleHedefAdet(false);
      setVisibleToleransKilo(true);
      setVisibleUrunSec(true);
    } else if (selectMod.modAdi === 'Kilo') {
      setVisibleHedefKilo(true);
      setVisibleHedefAdet(false);
      setVisibleToleransKilo(false);
      setVisibleUrunSec(true);
    } else if (selectMod.modAdi === 'Adet') {
      setVisibleHedefKilo(false);
      setVisibleHedefAdet(true);
      setVisibleToleransKilo(false);
      setVisibleUrunSec(true);
    }
  }, [selectMod]);

  const insertReceteDetayKefe = async (kefeNo) => {
    const kefeModel = {
      id: 0,
      receteDetayId: selectEtiket.id,
      kefeNo: parseInt(kefeNo)
    };
    await axios.post(`${GetAPIUrl()}/api/Boylama/InsertReceteDetayKefe`, kefeModel);
  };

  const deleteReceteDetayKefe = async (kefeNo) => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/DeleteReceteDetayKefe`, {
      params: { receteId: selectEtiket.id, kefeNo: parseInt(kefeNo) }
    });
  };

  const toggleKefe = (kefeNo) => {
    const isSanalBoylama = selectMachine?.makinaAd === 'Sanal Boylama';

    setSelectedKefeler((prev) => {
      if (isSanalBoylama) {
        // Eğer zaten seçiliyse kaldır
        if (prev.includes(kefeNo)) {
          deleteReceteDetayKefe(kefeNo);
          return [];
        } else {
          // Daha önce seçilen varsa onu sil
          if (prev.length > 0) {
            deleteReceteDetayKefe(prev[0]);
          }
          insertReceteDetayKefe(kefeNo);
          return [kefeNo];
        }
      } else {
        // Çoklu seçim mantığı
        if (prev.includes(kefeNo)) {
          deleteReceteDetayKefe(kefeNo);
          return prev.filter((k) => k !== kefeNo);
        } else {
          insertReceteDetayKefe(kefeNo);
          return [...prev, kefeNo];
        }
      }
    });
  };

  const updateRecipeDetail = async () => {
    if (selectedKefeler === null || (Array.isArray(selectedKefeler) && selectedKefeler[0] === undefined) || selectedKefeler[0] === null) {
      const makina = selectEtiket?.makinaAd;
      toastMessage(makina === 'Sanal Boylama' ? 'Grup Seçimi Yapınız' : 'Kefe Seçimi Yapınız', 2);
      return;
    }

    const recipeModel = {
      id: selectEtiket.id,
      ad: receteDetayAd ? receteDetayAd : '',
      receteId: selectEtiket.receteId ? selectEtiket.receteId : 0,
      grupNo: selectEtiket.grupNo ? selectEtiket.grupNo : 0,
      urunId: selectProduct != null ? selectProduct.Id : 0,
      calismaModId: selectMod.id ? selectMod.id : 0,
      hedefKilo: hedefKilo ? hedefKilo : 0,
      hedefAdet: hedefAdet ? hedefAdet : 0,
      toleransKg: toleransKilo ? toleransKilo : 0,
      altLimit: altLimit ? altLimit : 0,
      ustLimit: ustLimit ? ustLimit : 0,
      kefeler: '',
      urunAdi: selectProduct.length > 0 ? selectProduct.UrunAdi : '',
      modAdi: selectMod.modAdi ? selectMod.modAdi : ''
    };

    try {
      await axios.post(`${GetAPIUrl()}/api/Boylama/UpdateReceteDetay`, recipeModel);
      refreshTable();
      setOpenModal(false);
      toastMessage('Reçete Detay Güncelleme Başarılı', 1);
    } catch (error) {
      console.error('Hata:', error.response?.data || error.message);
      toastMessage('Reçete Detay Güncelleme Başarısız', 2);
    }
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Reçete Detay Güncelle
          <CloseCircle
            onClick={() => setOpenModal(false)}
            style={{ cursor: 'pointer', position: 'absolute', top: 8, right: 16 }}
            size={32}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>İsim</Typography>
                  <TextField value={receteDetayAd} variant="outlined" onChange={(e) => setReceteDetayAd(e.target.value)} fullWidth />
                </Grid>
                <Grid item>
                  <Typography>Alt Limit</Typography>
                  <TextField
                    value={altLimit}
                    variant="outlined"
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val <= 9000 || e.target.value === '') {
                        setAltLimit(e.target.value);
                      }
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1, color: 'white', fontSize: 18 }}>gr</Typography>
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography>Üst Limit</Typography>
                  <TextField
                    value={ustLimit}
                    variant="outlined"
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val <= 9000 || e.target.value === '') {
                        setUstLimit(e.target.value);
                      }
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1, color: 'white', fontSize: 18 }}>gr</Typography>
                    }}
                  />
                </Grid>
                <Grid item mb={1} display={selectMachine?.makinaAd === 'Sanal Boylama' ? 'none' : 'block'}>
                  <Typography>Mod Seçimi</Typography>
                  <Autocomplete
                    fullWidth
                    options={mods}
                    getOptionLabel={(option) => option.modAdi || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                    value={selectMod}
                    onChange={(event, newValue) => {
                      setSelectMod(newValue);
                      if (newValue.modAdi === 'Hiç') {
                        setVisibleHedefKilo(false);
                        setVisibleHedefAdet(false);
                        setVisibleToleransKilo(false);
                        setVisibleUrunSec(false);
                      } else if (newValue.modAdi === 'TamKilo') {
                        setVisibleHedefKilo(true);
                        setVisibleHedefAdet(false);
                        setVisibleToleransKilo(true);
                        setVisibleUrunSec(true);
                      } else if (newValue.modAdi === 'Kilo') {
                        setVisibleHedefKilo(true);
                        setVisibleHedefAdet(false);
                        setVisibleToleransKilo(false);
                        setVisibleUrunSec(true);
                      } else if (newValue.modAdi === 'Adet') {
                        setVisibleHedefKilo(false);
                        setVisibleHedefAdet(true);
                        setVisibleToleransKilo(false);
                        setVisibleUrunSec(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item sx={{ display: visibleHedefKilo ? 'block' : 'none' }}>
                  <Typography>Hedef Kilo</Typography>
                  <TextField
                    value={hedefKilo}
                    variant="outlined"
                    onChange={(e) => {
                      const input = e.target.value;
                      const normalized = input.replace(',', '.');
                      setHedefKilo(normalized);
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1, color: 'white', fontSize: 18 }}>kg</Typography>
                    }}
                  />
                </Grid>
                <Grid item sx={{ display: visibleHedefAdet ? 'block' : 'none' }}>
                  <Typography>Hedef Adet</Typography>
                  <TextField value={hedefAdet} variant="outlined" onChange={(e) => setHedefAdet(e.target.value)} fullWidth />
                </Grid>
                <Grid item sx={{ display: visibleToleransKilo ? 'block' : 'none' }}>
                  <Typography>Tolerans Gram</Typography>
                  <TextField
                    value={toleransKilo}
                    variant="outlined"
                    onChange={(e) => setToleransKilo(e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1, color: 'white', fontSize: 18 }}>gr</Typography>
                    }}
                  />
                </Grid>

                <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                  <Button
                    sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
                    variant="contained"
                    color="warning"
                    endIcon={<Save2 size={32} />}
                    onClick={updateRecipeDetail}
                  >
                    Kaydet
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} mt={3}>
              <Grid container spacing={2}>
                {Array.from({ length: selectMachine?.makinaAd === 'Giriş Boylama' ? 2 : 12 }).map((_, index) => {
                  const kefeNo = index + 1;
                  const isSelected = selectedKefeler.includes(kefeNo);
                  const isDisabled = usedKefeler.includes(kefeNo);
                  const isSanalBoylama = selectMachine?.makinaAd === 'Sanal Boylama';

                  const handleClick = () => {
                    if (isDisabled) return;

                    if (isSanalBoylama) {
                      // Tek seçim yapılabilir, önceki seçimi sil
                      toggleKefe(isSelected ? null : kefeNo);
                    } else {
                      toggleKefe(kefeNo);
                    }
                  };

                  return (
                    <Grid item xs={6} sm={4} key={kefeNo}>
                      <Button
                        fullWidth
                        startIcon={<LogoutCurve size={20} color="white" />}
                        disabled={isDisabled}
                        onClick={handleClick}
                        sx={{
                          height: 60,
                          backgroundColor: isDisabled ? '#2F3645' : isSelected ? '#347928' : '#23486A',
                          color: 'white',
                          fontWeight: 'bold',
                          border: isSelected ? '2px solid white' : 'none',
                          cursor: isDisabled ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isSanalBoylama ? `Grup - ${kefeNo}` : `Kefe - ${kefeNo}`}
                      </Button>
                    </Grid>
                  );
                })}

                {/* Ürün Grubu Seçimi */}
                <Grid item mt={2} sx={{ display: visibleUrunSec ? 'block' : 'none' }}>
                  <Typography>Ürün Grubu Seç</Typography>
                  <Autocomplete
                    sx={{ width: 460 }}
                    options={productGroups}
                    getOptionLabel={(option) => option.grupAdi || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={selectedGroup}
                    onChange={(event, newValue) => {
                      setSelectedGroup(newValue);
                      setSelectProduct(null);
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Grid>

                {/* Ürün Seçimi */}
                <Grid item mt={2} sx={{ display: visibleUrunSec ? 'block' : 'none' }}>
                  <Typography>Ürün Seç</Typography>
                  <Autocomplete
                    sx={{ width: 460 }}
                    options={filteredProducts}
                    getOptionLabel={(option) => (option.GrupAdi ? `${option.GrupAdi} | ${option.UrunAdi}` : '')}
                    isOptionEqualToValue={(option, value) => option.Id === value.Id}
                    value={selectProduct}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectProduct(newValue);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </Dialog>
  );
};

export default UpdateRecipeModal;
