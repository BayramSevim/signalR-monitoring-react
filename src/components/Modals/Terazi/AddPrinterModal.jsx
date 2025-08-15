import { useState, useEffect } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { CloseCircle } from 'iconsax-react';
import { toast } from 'react-toastify';

const AddPrinterModal = ({ open, setOpen, refreshTable, toastMessage }) => {
  const [teraziName, setTeraziName] = useState('');
  const [teraziAdres, setTeraziAdres] = useState('');
  const fetchData = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Terazi/InsertPrinter`, {
        params: {
          teraziAdi: teraziName,
          yaziciIpAdres: teraziAdres
        }
      })
      .then(() => {
        toastMessage('Terazi Ekleme Başarılı', 1);
        setOpen(false);
        refreshTable();
      })
      .catch((err) => {
        toastMessage('Terazi Ekleme Başarısız', 2);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
        Yazıcı Ekle
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
              variant="outlined"
              onChange={(e) => {
                setTeraziAdres(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container mt={2} display={'flex'} justifyContent={'center'}>
          <Button
            sx={{ width: 320, backgroundColor: '#5CB338', color: 'black', fontWeight: 'bold' }}
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

export default AddPrinterModal;
