import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';
import { SignalRContext } from 'contexts/SignalRContext';

const UpdateLotModal = ({ openModal, setOpenModal, selectEtiket, refreshTable, toastMessage }) => {
  const { sendValue } = useContext(SignalRContext);

  const [lotYazici1, setLotYazici1] = useState(selectEtiket.lotYazici1);
  const [lotYazici2, setLotYazici2] = useState(selectEtiket.lotYazici2);
  const [lotYazici3, setLotYazici3] = useState(selectEtiket.lotYazici3);
  const [girisKilo, setGirisKilo] = useState(selectEtiket.girisKilo);
  const [aciklama, setAciklama] = useState(selectEtiket.aciklama);
  const [isActive, setIsActive] = useState(selectEtiket.isActive);

  const updateRecipeDetail = async () => {
    const recipeModel = {
      id: selectEtiket.id,
      lotYazici1: lotYazici1,
      lotYazici2: lotYazici2,
      lotYazici3: lotYazici3,
      girisKilo: girisKilo,
      aciklama: aciklama,
      isActive: isActive,
      isDeleted: selectEtiket.isDeleted
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/UpdateLot`, recipeModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        refreshTable();
        setOpenModal(false);
        sendValue('PLC1!serverLotId', selectEtiket.id);
        toastMessage('Lot Güncelleme İşlemi Başarılı', 1);
      })
      .catch((error) => {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Lot Güncelleme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Lot Güncelle
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
              <Grid display={'flex'} justifyContent={'center'} mt={-1} mb={-1}>
                <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Aktif" />
              </Grid>

              <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                <Button
                  sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    updateRecipeDetail();
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

export default UpdateLotModal;
