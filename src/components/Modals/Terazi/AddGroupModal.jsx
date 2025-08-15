import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GetAPIUrl } from 'api/gama';

const AddGroupModal = ({ selectGroup, openModal, setOpenModal, toastMessage }) => {
  const [productGroup, setProductGroup] = useState('');
  const [updateGroup, setUpdateGroup] = useState(selectGroup);
  const [taze, setTaze] = useState(false);
  const [donuk, setDonuk] = useState(false);

  const fetchData = async (productGroup, taze) => {
    await axios
      .get(`${GetAPIUrl()}/api/Product/InsertProductGroup?GrupAdi=${productGroup}&Taze=${taze ? 1 : 0}`)
      .then((res) => {
        toastMessage('Ürün Grubu Ekleme İşlemi Başarılı', 5);
      })
      .catch((err) => {
        toastMessage('Ürün Grubu Ekleme İşlemi Başarısız', 6);
      });
  };

  return (
    <Dialog open={openModal} onClose={!openModal}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
        Grup Ekle
        <CloseCircle
          onClick={() => {
            setOpenModal(false);
          }}
          style={{ cursor: 'pointer', position: 'absolute', top: 0, right: 0 }}
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
              <FormControlLabel control={<Checkbox checked={taze} onChange={(e) => setTaze(e.target.checked)} />} label="Taze" />
              <FormControlLabel control={<Checkbox checked={donuk} onChange={(e) => setDonuk(e.target.checked)} />} label="Donuk" />
            </Grid>
            <Grid item mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="success"
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
    </Dialog>
  );
};

export default AddGroupModal;
