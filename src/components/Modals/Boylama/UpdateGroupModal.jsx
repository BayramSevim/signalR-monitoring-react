import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GetAPIUrl } from 'api/gama';

const AddGroupModal = ({ selectGroup, openModal, setOpenModal, toastMessage }) => {
  const [productGroup, setProductGroup] = useState(selectGroup.grupAdi);
  const [taze, setTaze] = useState(selectGroup.taze);
  const [donuk, setDonuk] = useState(false);

  const fetchData = async (productGroup, taze) => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/UpdateProductGroup?Id=${selectGroup.id}&GrupAdi=${productGroup}&Taze=${taze ? 1 : 0}`)
      .then(() => {
        getGroup();
        toastMessage('Ürün Grubu Güncelleme İşlemi Başarılı', 7);
      })
      .catch((err) => {
        toastMessage('Ürün Grubu Güncelleme İşlemi Başarısız', 8);
      });
  };

  const getGroup = async () => {
    await axios.get(`${GetAPIUrl()}/api/Label/GetLabel`);
  };

  useEffect(() => {
    setTaze(selectGroup.taze);
    setDonuk(!selectGroup.taze);
  }, [selectGroup]);

  // Taze checkbox'ı değiştiğinde donuk durumunu ayarla
  const handleTazeChange = (checked) => {
    setTaze(checked);
    setDonuk(!checked); // Taze true ise donuk false, taze false ise donuk true
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Grup Güncelle
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
              <Grid item>
                <TextField
                  placeholder="Ürün Grubu"
                  value={productGroup}
                  variant="outlined"
                  sx={{ width: 400 }}
                  onChange={(e) => {
                    setProductGroup(e.target.value);
                  }}
                />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'}>
                <FormControlLabel control={<Checkbox checked={taze} onChange={(e) => handleTazeChange(e.target.checked)} />} label="Taze" />
                <FormControlLabel control={<Checkbox checked={donuk} onChange={(e) => setDonuk(e.target.checked)} />} label="Donuk" />
              </Grid>

              <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                <Button
                  sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setOpenModal(false);
                    fetchData(productGroup, taze);
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

export default AddGroupModal;
