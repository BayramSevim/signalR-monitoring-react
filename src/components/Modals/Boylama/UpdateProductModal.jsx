import { Grid, Dialog, DialogTitle, DialogContent, Button, Autocomplete, TextField, Typography } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';

const UpdateProductModal = ({ selectProduct, openModal, setOpenModal, refreshTable, toastMessage }) => {
  const [getProductGroupById, setGetProductGroupById] = useState([]);
  const [getlabel, setGetLabel] = useState([]);
  const [selectedEtiketKoli, setSelectedEtiketKoli] = useState(null);
  const [selectedEtiketPalet, setSelectedEtiketPalet] = useState(null);

  // fields
  const [urunAd, setUrunAd] = useState(selectProduct.UrunAdi ? selectProduct.UrunAdi : '');
  const [urunNo, setUrunNo] = useState(selectProduct.UrunNo ? selectProduct.UrunNo : '');
  const [aciklama1, setAciklama1] = useState(selectProduct.Aciklama1 ? selectProduct.Aciklama1 : '');
  const [aciklama2, setAciklama2] = useState(selectProduct.Aciklama2 ? selectProduct.Aciklama2 : '');
  const [aciklama3, setAciklama3] = useState(selectProduct.Aciklama3 ? selectProduct.Aciklama3 : '');
  const [aciklama4, setAciklama4] = useState(selectProduct.Aciklama4 ? selectProduct.Aciklama4 : '');
  const [aciklama5, setAciklama5] = useState(selectProduct.Aciklama5 ? selectProduct.Aciklama5 : '');
  const [rafOmru, setRafOmru] = useState(selectProduct.RafOmru ? selectProduct.RafOmru : 0);
  const [barkodNoKoli, setBarkodNoKoli] = useState(selectProduct.BarkodNo1 ? selectProduct.BarkodNo1 : '');
  const [barkodNoPalet, setBarkodNoPalet] = useState(selectProduct.BarkodNo2 ? selectProduct.BarkodNo2 : '');
  const [barkodTip, setBarkodTipi] = useState(selectProduct.BarkodTipi ? selectProduct.BarkodTipi : 0);
  const [etiketNoKoli, setEtiketNoKoli] = useState(selectProduct.EtiketNo1Id ? selectProduct.EtiketNo1Id : 0);
  const [etiketNoPalet, setEtiketNoPalet] = useState(selectProduct.EtiketNo2Id ? selectProduct.EtiketNo2Id : 0);
  const [koliIciAdet, setKoliIciAdet] = useState(selectProduct.KoliIciAdet ? selectProduct.KoliIciAdet : 0);
  const [paletIciKoliAdet, setPaletIciKoliAdet] = useState(selectProduct.PaletIciAdet ? selectProduct.PaletIciAdet : 0);
  const [fiyat, setFiyat] = useState(selectProduct.Fiyat ? selectProduct.Fiyat : 0);
  const [dara, setDara] = useState(selectProduct.Dara ? selectProduct.Dara : 0);
  const [altLimit, setAltLimit] = useState(selectProduct.AltLimit ? selectProduct.AltLimit : 0);
  const [ustLimit, setUstLimit] = useState(selectProduct.UstLimit ? selectProduct.UstLimit : 0);
  const [koliEtiketAdet, setKoliEtiketAdet] = useState(selectProduct.KoliEtiketAdet ? selectProduct.KoliEtiketAdet : 0);
  const [paletEtiketAdet, setPaletEtiketAdet] = useState(selectProduct.PaletEtiketAdet ? selectProduct.PaletEtiketAdet : 0);
  const [sabitAgirlikPalet, setSabitAgirlikPalet] = useState(selectProduct.SabitAgirlikPalet ? selectProduct.SabitAgirlikPalet : 0);
  const [sabitAgirlikKoli, setSabitAgirlikKoli] = useState(selectProduct.SabitAgirlikKoli ? selectProduct.SabitAgirlikKoli : 0);
  const [paletEtiketMan, setPaletEtiketMan] = useState(selectProduct.PaletEtiketiMan ? selectProduct.PaletEtiketiMan : false);
  const [koliEtiketMan, setKoliEtiketMan] = useState(selectProduct.KoliEtiketiMan ? selectProduct.KoliEtiketiMan : false);
  const [etiketTipiKoliSabit, setEtiketTipiKoliSabit] = useState(selectProduct.EtiketTipiKoli ? selectProduct.EtiketTipiKoli : false);
  const [etiketTipiPaletSabit, setEtiketTipiPaletSabit] = useState(selectProduct.EtiketTipiPalet ? selectProduct.EtiketTipiPalet : false);
  const [aktif, setAktif] = useState(selectProduct.IsAktif ? selectProduct.IsAktif : false);

  const fetchData = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/GetProductGroupById`, {
        params: {
          Id: selectProduct.UrunGrupId
        }
      })
      .then((res) => {
        setGetProductGroupById(res.data);
      });
    await axios.get(`${GetAPIUrl()}/api/Boylama/GetLabel`).then((res) => {
      setGetLabel(res.data);
    });
  };

  const urunModel = {
    id: selectProduct.Id,
    urunGrupId: selectProduct.UrunGrupId,
    urunAdi: urunAd || '',
    grupAdi: selectProduct.GrupAdi || '',
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

  const updateProduct = async () => {
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/UpdateProduct`, urunModel)
      .then((res) => {
        refreshTable();
        toastMessage('Güncelleme İşlemi Başarılı', 1);
      })
      .catch((err) => {
        console.log(err);
        toastMessage('Güncelleme İşlemi Başarısız', 2);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (getlabel.length > 0 && selectProduct.EtiketNo1Id) {
      const found = getlabel.find((o) => o.id === selectProduct.EtiketNo1Id);
      if (found) setSelectedEtiketKoli(found);
    }
    if (getlabel.length > 0 && selectProduct.EtiketNo2Id) {
      const found2 = getlabel.find((o) => o.id === selectProduct.EtiketNo2Id);
      if (found2) setSelectedEtiketPalet(found2);
    }
  }, [getlabel, selectProduct]);

  return (
    <Dialog open={openModal}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          <Typography color={'orange'} borderBottom={'2px solid orange'} fontSize={25} fontWeight={'bold'}>
            {getProductGroupById.map((grp) => grp.grupAdi)}
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
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Ürün Ad"
                  value={urunAd}
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
                  value={urunNo}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setUrunNo(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Açıklama 1"
                  value={aciklama1}
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
                  value={aciklama2}
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
                  value={aciklama3}
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
                  value={aciklama4}
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
                  value={aciklama5}
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
                  value={rafOmru}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setRafOmru(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Barkod No Koli"
                  value={barkodNoKoli}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setBarkodNoKoli(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Barkod No Palet"
                  value={barkodNoPalet}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setBarkodNoPalet(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Barkod Tipi"
                  value={barkodTip}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setBarkodTipi(normalized);
                  }}
                />
              </Grid>
              <Grid mt={1}>
                <Autocomplete
                  options={getlabel}
                  getOptionLabel={(o) => o.etiketAd}
                  isOptionEqualToValue={(o, v) => o.id === v.id}
                  value={selectedEtiketKoli}
                  onChange={(e, newVal) => {
                    setSelectedEtiketKoli(newVal);
                    setEtiketNoKoli(newVal?.id ?? 0);
                  }}
                  renderInput={(params) => <TextField {...params} label="Etiket No Koli" variant="outlined" />}
                />
              </Grid>
              <Grid mt={1}>
                <Autocomplete
                  options={getlabel}
                  getOptionLabel={(o) => o.etiketAd}
                  isOptionEqualToValue={(o, v) => o.id === v.id}
                  value={selectedEtiketPalet}
                  onChange={(e, newVal) => {
                    setSelectedEtiketPalet(newVal);
                    setEtiketNoPalet(newVal?.id ?? 0);
                  }}
                  renderInput={(params) => <TextField {...params} label="Etiket No Palet" variant="outlined" />}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Koli İçi Adet"
                  value={koliIciAdet}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setKoliIciAdet(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Palet İçi Koli Adet"
                  value={paletIciKoliAdet}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setPaletIciKoliAdet(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Fiyat"
                  value={fiyat}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setFiyat(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Dara"
                  value={dara}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setDara(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Alt Limit"
                  value={altLimit}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setAltLimit(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Üst Limit"
                  value={ustLimit}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setUstLimit(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Koli Etiket Adet"
                  value={koliEtiketAdet}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setKoliEtiketAdet(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Palet Etiket Adet"
                  value={paletEtiketAdet}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setPaletEtiketAdet(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Sabit Ağırlık Palet"
                  value={sabitAgirlikPalet}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setSabitAgirlikPalet(normalized);
                  }}
                />
              </Grid>
              <Grid item mt={1}>
                <TextField
                  size="large"
                  label="Sabit Ağırlık Koli"
                  value={sabitAgirlikKoli}
                  variant="outlined"
                  sx={{ width: 450 }}
                  onChange={(e) => {
                    const input = e.target.value;
                    const normalized = input.replace(',', '.');
                    setSabitAgirlikKoli(normalized);
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
                  sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setOpenModal(false);
                    updateProduct();
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

export default UpdateProductModal;
