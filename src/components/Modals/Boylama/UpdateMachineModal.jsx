import { useState, useEffect } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { CloseCircle } from 'iconsax-react';
import { toast } from 'react-toastify';

const AddMachinesModal = ({ selectTerazi, open, setOpen, refreshTable, toastMessage }) => {
  const [machineName, setMachineName] = useState(selectTerazi.MakinaAdi);
  const [ipAdres, setIpAdres] = useState(selectTerazi.IpAdress);
  const [printerIpAdres1, setPrinterIpAdres1] = useState(selectTerazi.YaziciIpAdres1);
  const [printerIpAdres2, setPrinterIpAdres2] = useState(selectTerazi.YaziciIpAdres2);
  const [printerIpAdres3, setPrinterIpAdres3] = useState(selectTerazi.YaziciIpAdres3);
  const [basket, setBasket] = useState(selectTerazi.KefeSayisi);
  const [isDouble, setIsDouble] = useState(selectTerazi.IsDouble);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedLots, setSelectedLots] = useState(null);

  const [recipes, setRecipes] = useState([]);
  const [lots, setLots] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetReceteler`);
        setRecipes(res.data);
        if (selectTerazi.ReceteId) {
          const matched = res.data.find((item) => item.id === selectTerazi.ReceteId);
          setSelectedRecipe(matched || null);
        } else {
          setSelectedRecipe(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchLot = async () => {
      try {
        const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetLots`);
        setLots(res.data);
        if (selectTerazi.LotLotId) {
          const matched = res.data.find((item) => item.id === selectTerazi.LotLotId);
          setSelectedLots(matched || null);
        } else {
          setSelectedLots(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLot();
    fetchRecipe();
  }, []);

  const updateMachine = async () => {
    const recipeModel = {
      id: selectTerazi.Id,
      makinaAdi: machineName ? machineName : '',
      ipAdress: ipAdres ? ipAdres : '',
      yaziciIpAdres1: printerIpAdres1 ? printerIpAdres1 : '',
      yaziciIpAdres2: printerIpAdres2 ? printerIpAdres2 : '',
      yaziciIpAdres3: printerIpAdres3 ? printerIpAdres3 : '',
      kefeSayisi: basket ? basket : 0,
      receteId: selectedRecipe ? selectedRecipe.id : 0,
      isDouble: isDouble,
      lotLotId: selectedLots ? selectedLots.id : 0
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/UpdateMakina`, recipeModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        refreshTable();
        setOpen(false);
        toastMessage('Makina Güncelleme Başarılı', 1);
      })
      .catch((error) => {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Makina Güncelleme Başarısız', 2);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Makina Güncelle
          <CloseCircle
            onClick={() => {
              setOpen(false);
            }}
            style={{ cursor: 'pointer', position: 'absolute', top: 5, right: 5 }}
            size={32}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container display={'flex'} flexDirection={'column'}>
            <Grid item mb={1}>
              <Typography>Makina Adı</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
                value={machineName}
                variant="outlined"
                onChange={(e) => {
                  setMachineName(e.target.value);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Reçete</Typography>
              <Autocomplete
                fullWidth
                options={recipes}
                getOptionLabel={(option) => option.receteAdi || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                value={selectedRecipe}
                onChange={(event, newValue) => {
                  setSelectedRecipe(newValue);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Lot</Typography>
              <Autocomplete
                fullWidth
                options={lots}
                getOptionLabel={(option) => option.aciklama || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                value={selectedLots}
                onChange={(event, newValue) => {
                  setSelectedLots(newValue);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Ip Adres</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
                value={ipAdres}
                variant="outlined"
                onChange={(e) => {
                  setIpAdres(e.target.value);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Yazıcı Ip Adres-1</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
                value={printerIpAdres1}
                variant="outlined"
                onChange={(e) => {
                  setPrinterIpAdres1(e.target.value);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Yazıcı Ip Adres-2</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
                value={printerIpAdres2}
                variant="outlined"
                onChange={(e) => {
                  setPrinterIpAdres2(e.target.value);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Yazıcı Ip Adres-3</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
                value={printerIpAdres3}
                variant="outlined"
                onChange={(e) => {
                  setPrinterIpAdres3(e.target.value);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Kefe Sayısı</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
                value={basket}
                variant="outlined"
                onChange={(e) => {
                  setBasket(e.target.value);
                }}
              />
            </Grid>
            <Grid item mb={-1} display={'flex'} justifyContent={'center'}>
              <FormControlLabel
                control={<Checkbox checked={isDouble} onChange={(e) => setIsDouble(e.target.checked)} />}
                label="Çift Hat"
              />
            </Grid>
          </Grid>
          <Grid container mt={2} display={'flex'} justifyContent={'center'}>
            <Button
              sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
              variant="contained"
              color="warning"
              onClick={() => {
                updateMachine();
              }}
            >
              Kaydet
            </Button>
          </Grid>
        </DialogContent>
      </Grid>
    </Dialog>
  );
};

export default AddMachinesModal;
