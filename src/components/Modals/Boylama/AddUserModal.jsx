import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';

const AddLabelModal = ({ openModal, setOpenModal, refreshTable, toastMessage }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  const insertUser = async () => {
    const userModel = {
      id: 0,
      userName: userName ?? '',
      password: password ?? '',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      isActive: isActive ?? true,
      isAdmin: false
    };

    await axios
      .post(`${GetAPIUrl()}/api/Authentication/InsertUser`, userModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        refreshTable();
        toastMessage('Kullanıcı Ekleme Başarılı', 1);
        setOpenModal(false);
      })
      .catch((err) => {
        toastMessage('Kullanıcı Ekleme Başarısız', 2);
      });
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
        Kullanıcı Ekle
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
                value={userName}
                variant="outlined"
                label="Kullanıcı Adı"
                onChange={(e) => setUserName(e.target.value)}
                sx={{ width: 500 }}
              />
            </Grid>
            <Grid item mt={1}>
              <TextField
                value={password}
                variant="outlined"
                label="Şifre"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: 500 }}
              />
            </Grid>
            <Grid display={'flex'} justifyContent={'center'}>
              <FormControlLabel control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Aktif" />
            </Grid>

            <Grid item mt={2}>
              <Button
                fullWidth
                endIcon={<Save2 size={32} />}
                variant="contained"
                color="success"
                onClick={() => {
                  insertUser();
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

export default AddLabelModal;
