import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField, Autocomplete, Typography } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';

const AddLabelModal = ({ openModal, setOpenModal, refreshTable, toastMessage }) => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeCode, setRecipeCode] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [machines, setMachines] = useState([]);
  const [selectMachine, setSelectMachine] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        await axios.get(`${GetAPIUrl()}/api/Boylama/GetMakinalar`).then((res) => {
          setMachines(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchMachines();
  }, []);

  const insertRecipe = async () => {
    const recipeModel = {
      id: 0,
      receteAdi: recipeName,
      receteKodu: recipeCode,
      isActive: isActive,
      isDeleted: false,
      makinaId: selectMachine.Id,
      makinaAd: selectMachine.MakinaAdi
    };
    await axios
      .post(`${GetAPIUrl()}/api/Boylama/InsertRecete`, recipeModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        toastMessage('Reçete Ekleme İşlemi Başarılı', 1);
        refreshTable();
        setOpenModal(false);
      })
      .catch((error) => {
        console.error('Hata:', error.response?.data || error.message);
        toastMessage('Reçete Ekleme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Reçete Ekle
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
              <Grid item mb={1}>
                <Typography>Makina Seçimi</Typography>
                <Autocomplete
                  sx={{ width: 500 }}
                  options={machines}
                  getOptionLabel={(option) => option.MakinaAdi || ''}
                  isOptionEqualToValue={(option, value) => option.Id === value.Id}
                  value={selectMachine || null}
                  onChange={(event, newValue) => {
                    setSelectMachine(newValue); // newValue null olabilir
                  }}
                  disableClearable={false} // temizlemeye izin verir
                  clearOnEscape
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </Grid>
              <Grid item mb={1}>
                <Typography>Reçete Adı</Typography>
                <TextField value={recipeName} variant="outlined" onChange={(e) => setRecipeName(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid item mb={1}>
                <Typography>Reçete Kodu</Typography>
                <TextField value={recipeCode} variant="outlined" onChange={(e) => setRecipeCode(e.target.value)} sx={{ width: 500 }} />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'}>
                <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Aktif" />
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

export default AddLabelModal;
