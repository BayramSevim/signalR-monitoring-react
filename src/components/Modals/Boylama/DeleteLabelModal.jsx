import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { TickCircle, CloseCircle } from 'iconsax-react';
import Loader from 'components/Loader';

const DeleteLabelModal = ({ openModal, setOpenModal, selectEtiket, refreshTable, toastMessage, setIsDeleted }) => {
  const [loading, setLoading] = useState(false);
  const deleteEtiket = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${GetAPIUrl()}/api/Boylama/DeleteLabel`, {
          params: {
            Id: selectEtiket.id
          }
        })
        .then(() => {
          setLoading(false);
          refreshTable();
          setIsDeleted(true);
          setOpenModal(false);
          toastMessage('Etiket Silme İşlemi Başarılı', 5);
        })
        .catch((err) => {
          toastMessage('Etiket Silme İşlemi Başarısız', 6);
        });
    } catch (error) {
      console.error('Error during insert operations: ', error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
          <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'orange', borderBottom: '2px solid orange' }} textAlign={'start'}>
            Etiket Sil
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
                <Grid item>Seçilen Etiketin Silinmesini Onaylıyor Musunuz?</Grid>
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
        </Grid>
      </Dialog>
    </>
  );
};

export default DeleteLabelModal;
