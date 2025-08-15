import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { TickCircle, CloseCircle } from 'iconsax-react';

const DeleteLabelModal = ({ openModal, setOpenModal, selectUser, refreshTable, toastMessage }) => {
  const deleteEtiket = async () => {
    try {
      await axios
        .get(`${GetAPIUrl()}/api/Authentication/DeleteUser`, {
          params: {
            Id: selectUser.id
          }
        })
        .then((res) => {
          refreshTable();
          setOpenModal(false);
          toastMessage('Kullanıcı Başarıyla Silindi', 1);
        })
        .catch((err) => toastMessage('Kullanıcı Silinemedi', 2));
    } catch (error) {
      console.error('Error during insert operations: ', error);
    }
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'orange', borderBottom: '2px solid orange' }} textAlign={'start'}>
        Kullanıcı Sil
        <CloseCircle
          onClick={() => {
            setOpenModal(false);
          }}
          style={{ cursor: 'pointer', color: 'white', position: 'absolute', top: 6, right: 6 }}
          size={35}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid mt={1}>
            <Grid item>Seçilen Kullanıcının Silinmesini Onaylıyor Musunuz?</Grid>
            <Grid container display={'flex'} justifyContent={'end'}>
              <Grid item mt={2} mr={1}>
                <Button
                  fullWidth
                  endIcon={<TickCircle size={32} />}
                  variant="contained"
                  color="success"
                  onClick={() => {
                    deleteEtiket();
                  }}
                >
                  Evet
                </Button>
              </Grid>
              <Grid item mt={2}>
                <Button
                  fullWidth
                  endIcon={<CloseCircle size={32} />}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Hayır
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLabelModal;
