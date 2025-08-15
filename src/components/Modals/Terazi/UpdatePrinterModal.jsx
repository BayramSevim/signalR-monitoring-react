import { useState, useEffect } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { CloseCircle } from 'iconsax-react';

const UpdatePrinterModal = ({ selectTerazi, open, setOpen, refreshTable, toastMessage }) => {
  const [teraziName, setTeraziName] = useState(selectTerazi.teraziAdi);
  const [teraziAdres, setTeraziAdres] = useState(selectTerazi.yaziciIpAdres);
  const fetchData = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Terazi/UpdatePrinter`, {
        params: {
          id: selectTerazi.id,
          teraziAdi: teraziName,
          ipAdress: teraziAdres
        }
      })
      .then(() => {
        toastMessage('Yazıcı Güncelleme Başarılı', 3);
        setOpen(false);
        refreshTable();
      })
      .catch((err) => {
        toastMessage('Yazıcı Güncelleme Başarısız', 4);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
        Yazıcı Güncelle
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
          <Grid item mt={1}>
            <Typography sx={{ ml: 0.5 }}>Terazi Adı</Typography>
            <TextField
              size="large"
              sx={{ width: 450 }}
              value={teraziName}
              variant="outlined"
              onChange={(e) => {
                setTeraziName(e.target.value);
              }}
            />
          </Grid>
          <Grid item mt={2}>
            <Typography sx={{ ml: 0.5 }}>İp Adresi</Typography>
            <TextField
              size="large"
              sx={{ width: 450 }}
              value={teraziAdres}
              variant="outlined"
              onChange={(e) => {
                setTeraziAdres(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container mt={2} display={'flex'} justifyContent={'center'}>
          <Button
            sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
            variant="contained"
            onClick={() => {
              fetchData(false);
            }}
          >
            Kaydet
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePrinterModal;
