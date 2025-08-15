import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { TickCircle, CloseCircle } from 'iconsax-react';

const DeleteMachineModal = ({ open, setOpen, selectGroup, toastMessage }) => {
  const deleteGrup = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/DeleteProductGroup`, {
        params: {
          Id: selectGroup.id
        }
      })
      .then(() => {
        setOpen(false);
        toastMessage('Grup Silme İşlemi Başarılı', 1);
      })
      .catch((err) => {
        console.log(err);
        toastMessage('Grup Silme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'orange', borderBottom: '2px solid orange' }} textAlign={'start'}>
          Grup Sil
          <CloseCircle
            onClick={() => {
              setOpen(false);
            }}
            style={{ cursor: 'pointer', color: 'white', position: 'absolute', top: 5, right: 5 }}
            size={35}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid mt={1}>
              <Grid item>
                <span style={{ color: '#A1E3F9', fontSize: 16, fontWeight: 'bold' }}>{selectGroup.grupAdi}</span> Grubunun Silinmesini
                Onaylıyor Musunuz?
              </Grid>
              <Grid container display={'flex'} justifyContent={'end'}>
                <Grid item mt={2} mr={1}>
                  <Button
                    fullWidth
                    endIcon={<TickCircle size={32} />}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      deleteGrup();
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
                      setOpen(false);
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
  );
};

export default DeleteMachineModal;
