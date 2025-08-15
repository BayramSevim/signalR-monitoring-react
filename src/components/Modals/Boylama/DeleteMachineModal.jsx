import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { TickCircle, CloseCircle } from 'iconsax-react';

const DeleteMachineModal = ({ selectTerazi, open, setOpen, refreshTable, toastMessage }) => {
  const deleteTerazi = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/DeleteMakina`, {
        params: {
          makinaId: selectTerazi.Id
        }
      })
      .then(() => {
        setOpen(false);
        refreshTable();
        toastMessage('Silme İşlemi Başarılı', 1);
      })
      .catch((err) => {
        console.log(err);
        toastMessage('Silme İşlemi Başarısız', 2);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'orange', borderBottom: '2px solid orange' }} textAlign={'start'}>
          Makina Sil
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
              <Grid item>Seçilen Terazinin Silinmesini Onaylıyor Musunuz?</Grid>
              <Grid container display={'flex'} justifyContent={'end'}>
                <Grid item mt={2} mr={1}>
                  <Button
                    fullWidth
                    endIcon={<TickCircle size={32} />}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      deleteTerazi();
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
