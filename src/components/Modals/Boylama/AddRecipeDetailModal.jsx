import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography, Autocomplete } from '@mui/material';
import { CloseCircle, LogoutCurve, Save2 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';

const UpdateRecipeModal = ({ openModal, setOpenModal, selectEtiket, refreshTable, toastMessage }) => {
  const [receteDetayAd, setReceteDetayAd] = useState(selectEtiket.ad);
  const [hedefKilo, setHedefKilo] = useState();
  const [hedefAdet, setHedefAdet] = useState();
  const [toleransKilo, setToleransKilo] = useState();
  const [altLimit, setAltLimit] = useState();
  const [ustLimit, setUstLimit] = useState();
  const [selectedKefeler, setSelectedKefeler] = useState([]);
  const [usedKefeler, setUsedKefeler] = useState([]);
  const [mods, setMods] = useState([]);
  const [selectMod, setSelectMod] = useState([]);
  const [selectProduct, setSelectProduct] = useState([]);
  const [product, setProduct] = useState([]);

  const [productGroups, setProductGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectRecipeDetail, setSelectRecipeDetail] = useState([]);

  const [visibleHedefKilo, setVisibleHedefKilo] = useState(true);
  const [visibleHedefAdet, setVisibleHedefAdet] = useState(true);
  const [visibleToleransKilo, setVisibleToleransKilo] = useState(true);
  const [visibleUrunSec, setVisibleUrunSec] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetProduct`);
      setProduct(res.data);
      const mods = await axios.get(`${GetAPIUrl()}/api/Boylama/GetMods`);
      setMods(mods.data);
      const detail = await axios.get(`${GetAPIUrl()}/api/Boylama/GetReceteDetayByReceteId`, {
        params: {
          receteId: selectEtiket.id
        }
      });
      setSelectRecipeDetail(detail.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProductGroups = async () => {
    try {
      const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetProductGroup`);
      setProductGroups(res.data);
    } catch (error) {
      console.error('Ürün grupları alınamadı:', error);
    }
  };

  useEffect(() => {
    fetchProductGroups();
    fetchProduct();
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
    if (Array.isArray(selectRecipeDetail)) {
      const used = selectRecipeDetail.map((item) => item.kefeler?.split(',').map((k) => parseInt(k.trim()))).flat(); // tüm dizileri birleştir

      setUsedKefeler(used);
    }
  }, [selectRecipeDetail]);

  const toggleKefe = (kefeNo) => {
    const isSanalBoylama = selectEtiket?.makinaAd === 'Sanal Boylama';

    setSelectedKefeler((prev) => {
      if (isSanalBoylama) {
        // Eğer zaten seçiliyse kaldır
        return prev.includes(kefeNo) ? [] : [kefeNo];
      } else {
        // Çoklu seçim
        return prev.includes(kefeNo) ? prev.filter((k) => k !== kefeNo) : [...prev, kefeNo];
      }
    });
  };

  useEffect(() => {
    if (mods.length > 0) {
      const defaultMod = mods.find((mod) => mod.modAdi === 'Hiç');
      if (defaultMod) {
        setSelectMod(defaultMod);
        setVisibleHedefKilo(false);
        setVisibleHedefAdet(false);
        setVisibleToleransKilo(false);
        setVisibleUrunSec(false);
      }
    }
  }, [mods]);

  const insertRecipeDetail = async () => {
    if (selectedKefeler.length > 0) {
      const recipeModel = {
        id: 0,
        ad: receteDetayAd ? receteDetayAd : '',
        receteId: selectEtiket.id ? selectEtiket.id : 0,
        grupNo: selectEtiket.grupNo ? selectEtiket.grupNo : 0,
        urunId: selectProduct.Id > 0 ? selectProduct.Id : 0,
        calismaModId: selectMod.id ? selectMod.id : 0,
        hedefKilo: hedefKilo ? parseFloat(hedefKilo) : 0,
        hedefAdet: hedefAdet ? parseInt(hedefAdet) : 0,
        toleransKg: toleransKilo ? parseFloat(toleransKilo) : 0,
        altLimit: parseFloat(altLimit) ? parseFloat(altLimit) : 0,
        ustLimit: parseFloat(ustLimit) ? parseFloat(ustLimit) : 0,
        kefeler: selectedKefeler.toString() ? selectedKefeler.toString() : '',
        urunAdi: selectProduct.UrunAdi || selectProduct.Id > 0 ? selectProduct.UrunAdi : '',
        modAdi: selectMod.modAdi ? selectMod.modAdi : ''
      };

      try {
        await axios.post(`${GetAPIUrl()}/api/Boylama/InsertReceteDetay`, recipeModel);
        refreshTable();
        setOpenModal(false);
        toastMessage('Reçete Detay Ekleme Başarılı', 1);
      } catch (error) {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Reçete Detay Ekleme Başarısız', 2);
      }
    } else {
      const makina = selectEtiket?.makinaAd;
      toastMessage(makina === 'Sanal Boylama' ? 'Grup Seçimi Yapınız' : 'Kefe Seçimi Yapınız', 2);
    }
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Reçete Detay Ekle
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
                <Grid item mb={1} display={selectEtiket?.makinaAd === 'Sanal Boylama' ? 'none' : 'block'}>
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
                    onChange={(e) => setHedefKilo(e.target.value)}
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
                    sx={{ width: 320, backgroundColor: '#5CB338', color: 'black', fontWeight: 'bold' }}
                    variant="contained"
                    color="success"
                    endIcon={<Save2 size={32} />}
                    onClick={insertRecipeDetail}
                  >
                    Kaydet
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} mt={3}>
              <Grid container spacing={2}>
                {Array.from({ length: selectEtiket?.makinaAd === 'Giriş Boylama' ? 2 : 12 }).map((_, index) => {
                  const kefeNo = index + 1;
                  const isSelected = selectedKefeler.includes(kefeNo);
                  const isDisabled = usedKefeler.includes(kefeNo);
                  const isSanalBoylama = selectEtiket?.makinaAd === 'Sanal Boylama';

                  return (
                    <Grid item xs={6} sm={4} key={kefeNo}>
                      <Button
                        fullWidth
                        startIcon={<LogoutCurve size={20} color="white" />}
                        disabled={isDisabled}
                        onClick={() => toggleKefe(kefeNo)}
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
                    value={product}
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
