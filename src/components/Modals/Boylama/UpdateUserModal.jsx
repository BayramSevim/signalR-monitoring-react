import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';

const UpdateLabelModal = ({ openModal, setOpenModal, selectUser, refreshTable, toastMessage }) => {
  const [userName, setUserName] = useState(selectUser.userName);
  const [password, setPassword] = useState(selectUser.password);
  const [isActive, setIsActive] = useState(selectUser.isActive);

  const updateUser = async () => {
    const userModel = {
      id: selectUser.id,
      userName: userName,
      password: password,
      createdDate: selectUser.createdDate ? selectUser.createdDate : new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      isActive: isActive,
      isAdmin: selectUser.isActive
    };

    await axios
      .post(`${GetAPIUrl()}/api/Authentication/UpdateUser`, userModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        refreshTable();
        toastMessage('Kullanıcı Güncelleme Başarılı', 1);
        setOpenModal(false);
      })
      .catch((err) => {
        toastMessage('Kullanıcı Güncelleme Başarısız', 2);
      });
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
        Kullanıcı Güncelle
        <CloseCircle
          onClick={() => {
            setOpenModal(false);
          }}
          style={{ cursor: 'pointer', position: 'absolute', top: 0, right: 0 }}
          size={32}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container mt={2}>
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
            <Grid item mt={2}>
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
                color="warning"
                onClick={() => {
                  updateUser();
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

export default UpdateLabelModal;
