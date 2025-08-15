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

  // fields
  const [urunAd, setUrunAd] = useState(selectProduct.urunAdi ? selectProduct.urunAdi : '');
  const [urunNo, setUrunNo] = useState(selectProduct.urunNo ? selectProduct.urunNo : '');
  const [aciklama1, setAciklama1] = useState(selectProduct.aciklama1 ? selectProduct.aciklama1 : '');
  const [aciklama2, setAciklama2] = useState(selectProduct.aciklama2 ? selectProduct.aciklama2 : '');
  const [aciklama3, setAciklama3] = useState(selectProduct.aciklama3 ? selectProduct.aciklama3 : '');
  const [aciklama4, setAciklama4] = useState(selectProduct.aciklama4 ? selectProduct.aciklama4 : '');
  const [aciklama5, setAciklama5] = useState(selectProduct.aciklama5 ? selectProduct.aciklama5 : '');
  const [rafOmru, setRafOmru] = useState(selectProduct.rafOmru ? selectProduct.rafOmru : 0);
  const [barkodNoKoli, setBarkodNoKoli] = useState(selectProduct.barkodNo1 ? selectProduct.barkodNo1 : '');
  const [barkodNoPalet, setBarkodNoPalet] = useState(selectProduct.barkodNo2 ? selectProduct.barkodNo2 : '');
  const [barkodTip, setBarkodTipi] = useState(selectProduct.barkodTipi ? selectProduct.barkodTipi : 0);
  const [etiketNoKoli, setEtiketNoKoli] = useState(selectProduct.etiketNo1Id ? selectProduct.etiketNo1Id : 0);
  const [etiketNoPalet, setEtiketNoPalet] = useState(selectProduct.etiketNo2Id ? selectProduct.etiketNo2Id : 0);
  const [koliIciAdet, setKoliIciAdet] = useState(selectProduct.koliIciAdet ? selectProduct.koliIciAdet : 0);
  const [paletIciKoliAdet, setPaletIciKoliAdet] = useState(selectProduct.paletIciAdet ? selectProduct.paletIciAdet : 0);
  const [fiyat, setFiyat] = useState(selectProduct.fiyat ? selectProduct.fiyat : 0);
  const [dara, setDara] = useState(selectProduct.dara ? selectProduct.dara : 0);
  const [altLimit, setAltLimit] = useState(selectProduct.altLimit ? selectProduct.altLimit : 0);
  const [ustLimit, setUstLimit] = useState(selectProduct.ustLimit ? selectProduct.ustLimit : 0);
  const [koliEtiketAdet, setKoliEtiketAdet] = useState(selectProduct.koliEtiketAdet ? selectProduct.koliEtiketAdet : 0);
  const [paletEtiketAdet, setPaletEtiketAdet] = useState(selectProduct.paletEtiketAdet ? selectProduct.paletEtiketAdet : 0);
  const [sabitAgirlikPalet, setSabitAgirlikPalet] = useState(selectProduct.sabitAgirlikPalet ? selectProduct.sabitAgirlikPalet : 0);
  const [sabitAgirlikKoli, setSabitAgirlikKoli] = useState(selectProduct.sabitAgirlikKoli ? selectProduct.sabitAgirlikKoli : 0);
  const [paletEtiketMan, setPaletEtiketMan] = useState(selectProduct.paletEtiketiMan ? selectProduct.paletEtiketiMan : false);
  const [koliEtiketMan, setKoliEtiketMan] = useState(selectProduct.koliEtiketiMan ? selectProduct.koliEtiketiMan : false);
  const [etiketTipiKoliSabit, setEtiketTipiKoliSabit] = useState(selectProduct.etiketTipiKoli ? selectProduct.etiketTipiKoli : false);
  const [etiketTipiPaletSabit, setEtiketTipiPaletSabit] = useState(selectProduct.etiketTipiPalet ? selectProduct.etiketTipiPalet : false);
  const [aktif, setAktif] = useState(selectProduct.isAktif ? selectProduct.isAktif : false);

  const fetchData = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Product/GetProductGroupById`, {
        params: {
          Id: selectProduct.urunGrupId
        }
      })
      .then((res) => {
        setGetProductGroupById(res.data);
      });
    await axios.get(`${GetAPIUrl()}/api/Label/GetLabel`).then((res) => {
      setGetLabel(res.data);
    });
  };

  const urunModel = {
    grupAdi: selectProduct.grupAdi || '',
    id: selectProduct.id,
    urunGrupId: selectProduct.urunGrupId,
    urunAdi: urunAd || '',
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
      .post(`${GetAPIUrl()}/api/Product/UpdateProduct`, urunModel)
      .then((res) => {
        refreshTable(selectProduct.urunGrupId);
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

  return (
    <Dialog open={openModal}>
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
                  setUrunNo(e.target.value);
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
                  setRafOmru(e.target.value);
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
                  setBarkodNoKoli(e.target.value);
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
                  setBarkodNoPalet(e.target.value);
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
                value={koliIciAdet}
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
                value={paletIciKoliAdet}
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
                value={fiyat}
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
                value={dara}
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
                value={altLimit}
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
                value={ustLimit}
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
                value={koliEtiketAdet}
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
                value={paletEtiketAdet}
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
                value={sabitAgirlikPalet}
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
                value={sabitAgirlikKoli}
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
            <Grid item mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="success"
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
    </Dialog>
  );
};

export default UpdateProductModal;
