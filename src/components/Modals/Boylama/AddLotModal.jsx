import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';

const AddLotModal = ({ openModal, setOpenModal, refreshTable, toastMessage }) => {
  const [lotYazici1, setLotYazici1] = useState('');
  const [lotYazici2, setLotYazici2] = useState('');
  const [lotYazici3, setLotYazici3] = useState('');
  const [girisKilo, setGirisKilo] = useState(0);
  const [aciklama, setAciklama] = useState('');

  const insertRecipe = async () => {
    const recipeModel = {
      id: 0,
      lotYazici1: lotYazici1,
      lotYazici2: lotYazici2,
      lotYazici3: lotYazici3,
      girisKilo: girisKilo,
      aciklama: aciklama,
      isActive: true,
      isDeleted: false
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/InsertLot`, recipeModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        refreshTable();
        setOpenModal(false);
        toastMessage('Lot Ekleme İşlemi Başarılı', 1);
      })
      .catch((error) => {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Lot Ekleme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Lot Ekle
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
              <Grid item mb={2}>
                <Typography>Lot Yazıcı 1</Typography>
                <TextField value={lotYazici1} variant="outlined" onChange={(e) => setLotYazici1(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid item mb={2}>
                <Typography>Lot Yazıcı 2</Typography>
                <TextField value={lotYazici2} variant="outlined" onChange={(e) => setLotYazici2(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid item mb={2}>
                <Typography>Lot Yazıcı 3</Typography>
                <TextField value={lotYazici3} variant="outlined" onChange={(e) => setLotYazici3(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid item mb={2}>
                <Typography>Giriş Kilo</Typography>
                <TextField value={girisKilo} variant="outlined" onChange={(e) => setGirisKilo(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid item mb={2}>
                <Typography>Açıklama</Typography>
                <TextField value={aciklama} variant="outlined" onChange={(e) => setAciklama(e.target.value)} sx={{ width: 500 }} />
              </Grid>

              <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                <Button
                  sx={{ width: 320, backgroundColor: '#5CB338', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="success"
                  endIcon={<Save2 size={32} />}
                  onClick={() => {
                    insertRecipe();
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

export default AddLotModal;
