import { useState, useEffect } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Autocomplete, Typography } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { CloseCircle } from 'iconsax-react';
import { toast } from 'react-toastify';

const AddMachinesModal = ({ selectTerazi, open, setOpen, refreshTable, toastMessage }) => {
  const [scaleName, setScaleName] = useState(selectTerazi.teraziAdi);
  const [ipAdress, setIpAdress] = useState(selectTerazi.ipAdress);

  const updateMachine = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Terazi/UpdateScales`, {
        params: {
          id: selectTerazi.id,
          teraziAdi: scaleName,
          ipAdress: ipAdress
        }
      })
      .then((res) => {
        refreshTable();
        setOpen(false);
        toastMessage('Güncelleme İşlemi Başarılı', 1);
      })
      .catch((error) => {
        console.error('Hata:', error);
        toastMessage('Güncelleme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
            <Typography>Terazi Adı</Typography>
            <TextField
              size="large"
              value={scaleName}
              sx={{ width: 450 }}
              variant="outlined"
              onChange={(e) => setScaleName(e.target.value)}
            />
          </Grid>
          <Grid item mb={1}>
            <Typography>Ip Adres</Typography>
            <TextField size="large" value={ipAdress} sx={{ width: 450 }} variant="outlined" onChange={(e) => setIpAdress(e.target.value)} />
          </Grid>
        </Grid>
        <Grid container mt={2} display={'flex'} justifyContent={'center'}>
          <Button
            sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
            variant="contained"
            onClick={() => {
              updateMachine();
            }}
          >
            Kaydet
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddMachinesModal;
