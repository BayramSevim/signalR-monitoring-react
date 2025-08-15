import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { TickCircle, CloseCircle } from 'iconsax-react';

const DeletePrinterModal = ({ selectTerazi, open, setOpen, refreshTable, toastMessage }) => {
  console.log(selectTerazi.id);
  const deleteTerazi = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Terazi/DeleteWeighing`, {
        params: {
          etiketId: selectTerazi.id
        }
      })
      .then(() => {
        setOpen(false);
        refreshTable();
      });

    await axios
      .get(`${GetAPIUrl()}/api/Terazi/DeleteScales`, {
        params: {
          Id: selectTerazi.id
        }
      })
      .then(() => {
        toastMessage('Yazıcı Silme İşlemi Başarılı', 5);
        setOpen(false);
        refreshTable();
      })
      .catch((err) => {
        toastMessage('Yazıcı Silme İşlemi Başarısız', 6);
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'orange', borderBottom: '2px solid orange' }} textAlign={'start'}>
        Yazıcı Sil
        <CloseCircle
          onClick={() => {
            setOpen(false);
          }}
          style={{ cursor: 'pointer', color: 'white', position: 'absolute', top: 6, right: 6 }}
          size={35}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid mt={1}>
            <Grid item>Seçilen Yazıcının Silinmesini Onaylıyor Musunuz?</Grid>
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
    </Dialog>
  );
};

export default DeletePrinterModal;
