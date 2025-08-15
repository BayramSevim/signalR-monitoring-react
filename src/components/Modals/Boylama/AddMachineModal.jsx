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

const AddMachinesModal = ({ open, setOpen, refreshTable, toastMessage }) => {
  const [machineName, setMachineName] = useState('');
  const [recipeId, setRecipeId] = useState(0);
  const [lotId, setLotId] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [lots, setLots] = useState([]);
  const [ipAdres, setIpAdres] = useState('');
  const [printerIpAdres1, setPrinterIpAdres1] = useState('');
  const [printerIpAdres2, setPrinterIpAdres2] = useState('');
  const [printerIpAdres3, setPrinterIpAdres3] = useState('');
  const [basket, setBasket] = useState('');
  const [isDouble, setIsDouble] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetReceteler`)
        .then((res) => {
          setRecipes(res.data);
        })
        .catch((err) => console.log(err));
    };

    const fetchLot = async () => {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/GetLots`)
        .then((res) => {
          setLots(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchLot();
    fetchRecipe();
  }, []);

  const insertMachine = async () => {
    const recipeModel = {
      id: 0,
      makinaAdi: machineName,
      ipAdress: ipAdres,
      yaziciIpAdres1: printerIpAdres1,
      yaziciIpAdres2: printerIpAdres2,
      yaziciIpAdres3: printerIpAdres3,
      kefeSayisi: basket,
      receteId: recipeId,
      isDouble: isDouble,
      lotLotId: lotId
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/InsertMakina`, recipeModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        refreshTable();
        setOpen(false);
        toastMessage('Makina Ekleme Başarılı', 1);
      })
      .catch((error) => {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Makina Ekleme Başarısız', 2);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Makina Ekle
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
                onChange={(event, newValue) => {
                  setRecipeId(newValue.id);
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
                onChange={(event, newValue) => {
                  setLotId(newValue.id);
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <Typography>Ip Adres</Typography>
              <TextField
                size="large"
                sx={{ width: 650 }}
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
              sx={{ width: 320, backgroundColor: '#5CB338', color: 'black', fontWeight: 'bold' }}
              variant="contained"
              color="success"
              onClick={() => {
                insertMachine();
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
