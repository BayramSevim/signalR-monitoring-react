import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Typography, Autocomplete } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';

const UpdateRecipeModal = ({ openModal, setOpenModal, selectEtiket, fetchData, toastMessage }) => {
  const [recipeCode, setRecipeCode] = useState(selectEtiket.receteKodu);
  const [recipeName, setRecipeName] = useState(selectEtiket.receteAdi);
  const [isActive, setIsActive] = useState(selectEtiket.isActive);
  const [machines, setMachines] = useState([]);
  const [selectMachine, setSelectMachine] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await axios.get(`${GetAPIUrl()}/api/Boylama/GetMakinalar`);
        setMachines(res.data);

        const selected = res.data.find((item) => item.Id === selectEtiket.makinaId);
        if (selected) {
          setSelectMachine(selected);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMachines();
  }, [selectEtiket.makinaId]);

  const updateRecipe = async () => {
    const recipeModel = {
      id: selectEtiket.id,
      receteAdi: recipeName,
      receteKodu: recipeCode,
      isActive: isActive,
      isDeleted: selectEtiket.isDeleted,
      makinaId: selectMachine?.Id || 0,
      makinaAd: selectMachine?.MakinaAdi || ''
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/UpdateRecete`, recipeModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        fetchData();
        setOpenModal(false);
        toastMessage('Reçete Güncelleme İşlemi Başarılı', 1);
      })
      .catch((error) => {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Reçete Güncelleme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Reçete Güncelle
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
              <Grid item mt={2} mb={1}>
                <Autocomplete
                  sx={{ width: 500 }}
                  options={machines}
                  getOptionLabel={(option) => option.MakinaAdi || ''}
                  isOptionEqualToValue={(option, value) => option.Id === value.Id}
                  value={selectMachine}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSelectMachine(newValue);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Makina Seç" variant="outlined" />}
                />
              </Grid>

              <Grid item mb={1}>
                <Typography>Reçete Kodu</Typography>
                <TextField value={recipeCode} variant="outlined" onChange={(e) => setRecipeCode(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid item mb={1}>
                <Typography>Reçete Adı</Typography>
                <TextField value={recipeName} variant="outlined" onChange={(e) => setRecipeName(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'}>
                <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Aktif" />
              </Grid>

              <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                <Button
                  sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="warning"
                  endIcon={<Save2 size={32} />}
                  onClick={() => {
                    updateRecipe();
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

export default UpdateRecipeModal;
