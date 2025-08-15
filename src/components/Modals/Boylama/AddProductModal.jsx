import { Grid, Dialog, DialogTitle, DialogContent, Button, Autocomplete, TextField, Typography } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';

const AddProductModal = ({ openModal, setOpenModal, toastMessage, refreshTable }) => {
  const [getProductGroup, setGetProductGroup] = useState([]);
  const [getlabel, setGetLabel] = useState([]);

  // fields
  const [selectUrunGrup, setSelectUrunGrup] = useState([]);
  const [urunAd, setUrunAd] = useState('');
  const [urunNo, setUrunNo] = useState('');
  const [aciklama1, setAciklama1] = useState(0);
  const [aciklama2, setAciklama2] = useState(0);
  const [aciklama3, setAciklama3] = useState(0);
  const [aciklama4, setAciklama4] = useState(0);
  const [aciklama5, setAciklama5] = useState(0);
  const [rafOmru, setRafOmru] = useState(0);
  const [barkodNoKoli, setBarkodNoKoli] = useState(0);
  const [barkodNoPalet, setBarkodNoPalet] = useState(0);
  const [barkodTip, setBarkodTipi] = useState(1);
  const [etiketNoKoli, setEtiketNoKoli] = useState(0);
  const [etiketNoPalet, setEtiketNoPalet] = useState(0);
  const [koliIciAdet, setKoliIciAdet] = useState(0);
  const [paletIciKoliAdet, setPaletIciKoliAdet] = useState(0);
  const [fiyat, setFiyat] = useState(0);
  const [dara, setDara] = useState(0);
  const [altLimit, setAltLimit] = useState(0);
  const [ustLimit, setUstLimit] = useState(0);
  const [koliEtiketAdet, setKoliEtiketAdet] = useState(0);
  const [paletEtiketAdet, setPaletEtiketAdet] = useState(0);
  const [sabitAgirlikPalet, setSabitAgirlikPalet] = useState(0);
  const [sabitAgirlikKoli, setSabitAgirlikKoli] = useState(0);
  const [paletEtiketMan, setPaletEtiketMan] = useState(false);
  const [koliEtiketMan, setKoliEtiketMan] = useState(false);
  const [etiketTipiKoliSabit, setEtiketTipiKoliSabit] = useState(false);
  const [etiketTipiPaletSabit, setEtiketTipiPaletSabit] = useState(false);
  const [aktif, setAktif] = useState(false);

  const urunModel = {
    id: 0,
    urunGrupId: selectUrunGrup,
    urunAdi: urunAd || '',
    grupAdi: '',
    urunNo: urunNo || '',
    paletIciAdet: paletIciKoliAdet || 0,
    rafOmru: rafOmru || 0,
    barkodNo1: barkodNoKoli || '',
    barkodNo2: barkodNoPalet || '',
    barkodTipi: barkodTip || 0,
    paletEtiketiMan: paletEtiketMan || false,
    koliEtiketiMan: koliEtiketMan || false,
    etiketTipiKoli: etiketTipiKoliSabit || false,
    etiketTipiPalet: etiketTipiPaletSabit || false,
    etiketNo1: etiketNoKoli || 0,
    etiketNo2: etiketNoPalet || 0,
    koliIciAdet: koliIciAdet || 0,
    fiyat: fiyat || 0,
    dara: dara || 0,
    altLimit: altLimit || 0,
    ustLimit: ustLimit || 0,
    koliEtiketAdet: koliEtiketAdet || 0,
    paletEtiketAdet: paletEtiketAdet || 0,
    sabitAgirlikPalet: sabitAgirlikPalet || 0,
    sabitAgirlikKoli: sabitAgirlikKoli || 0,
    aciklama1: aciklama1 || '',
    aciklama2: aciklama2 || '',
    aciklama3: aciklama3 || '',
    aciklama4: aciklama4 || '',
    aciklama5: aciklama5 || '',
    isAktif: aktif || false,
    etiketNo1Id: etiketNoKoli || 0,
    etiketNo2Id: etiketNoPalet || 0
  };

  const fetchData = async () => {
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetProductGroup`).then((res) => {
      setGetProductGroup(res.data);
    });
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetLabel`).then((res) => {
      setGetLabel(res.data);
    });
  };

  const insertProduct = async () => {
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/InsertProduct`, urunModel)
      .then((res) => {
        refreshTable();
        toastMessage('Ürün Ekleme İşlemi Başarılı', 3);
      })
      .catch((err) => {
        console.log(err);
        toastMessage('Ürün Ekleme İşlemi Başarısız', 4);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Dialog open={openModal}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          <Typography fontSize={25} fontWeight={'bold'} borderBottom={'2px solid white'}>
            Ürün Ekle
          </Typography>
          <CloseCircle
            onClick={() => {
              setOpenModal(false);
            }}
            style={{ cursor: 'pointer', position: 'absolute', top: 5, right: 5 }}
            size={32}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid>
              <Grid item>
                <Autocomplete
                  options={getProductGroup}
                  getOptionLabel={(option) => `${option.grupAdi}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(event, newValue) => {
                    setSelectUrunGrup(newValue.id);
                  }}
                  renderInput={(params) => <TextField {...params} label="Ürün Grubu *" variant="outlined" />}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Ürün Ad"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setUrunAd(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Ürün No"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setUrunNo(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Açıklama 1"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setAciklama1(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Açıklama 2"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setAciklama2(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Açıklama 3"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setAciklama3(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Açıklama 4"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setAciklama4(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Açıklama 5"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setAciklama5(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Raf Ömrü"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setRafOmru(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Barkod No Koli"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setBarkodNoKoli(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Barkod No Palet"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setBarkodNoPalet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Barkod Tipi"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setBarkodTipi(e.target.value);
                  }}
                />
              </Grid>
              <Grid mt={1}>
                <Autocomplete
                  options={getlabel}
                  getOptionLabel={(option) => `${option.etiketAd}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(event, newValue) => {
                    setEtiketNoKoli(newValue.id);
                  }}
                  renderInput={(params) => <TextField {...params} label="Etiket No Koli" variant="outlined" />}
                />
              </Grid>
              <Grid mt={1}>
                <Autocomplete
                  options={getlabel}
                  getOptionLabel={(option) => `${option.etiketAd}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(event, newValue) => {
                    setEtiketNoPalet(newValue.id);
                  }}
                  renderInput={(params) => <TextField {...params} label="Etiket No Palet" variant="outlined" />}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Koli İçi Adet"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setKoliIciAdet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Palet İçi Koli Adet"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setPaletIciKoliAdet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Fiyat"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setFiyat(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Dara"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setDara(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Alt Limit"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setAltLimit(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Üst Limit"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setUstLimit(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Koli Etiket Adet"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setKoliEtiketAdet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Palet Etiket Adet"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setPaletEtiketAdet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Sabit Ağırlık Palet"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setSabitAgirlikPalet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Sabit Ağırlık Koli"
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    setSabitAgirlikKoli(e.target.value);
                  }}
                />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'}>
                <FormControlLabel
                  control={<Checkbox checked={paletEtiketMan} onChange={(e) => setPaletEtiketMan(e.target.checked)} />}
                  label="Palet Etiketi Man"
                />
                <FormControlLabel
                  control={<Checkbox checked={koliEtiketMan} />}
                  onChange={(e) => setKoliEtiketMan(e.target.checked)}
                  label="Koli Etiketi Man"
                />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'}>
                <FormControlLabel
                  control={<Checkbox checked={etiketTipiPaletSabit} onChange={(e) => setEtiketTipiPaletSabit(e.target.checked)} />}
                  label="Etiket Tipi Palet Sabit"
                />
                <FormControlLabel
                  control={<Checkbox checked={etiketTipiKoliSabit} onChange={(e) => setEtiketTipiKoliSabit(e.target.checked)} />}
                  label="Etiket Tipi Koli Sabit"
                />
                <FormControlLabel control={<Checkbox checked={aktif} onChange={(e) => setAktif(e.target.checked)} />} label="Aktif" />
              </Grid>

              <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                <Button
                  sx={{ width: 320, backgroundColor: '#5CB338', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setOpenModal(false);
                    insertProduct();
                  }}
                >
                  Kaydet
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </Dialog>
  );
};

export default AddProductModal;
