import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { TickCircle, CloseCircle } from 'iconsax-react';
import { SignalRContext } from 'contexts/SignalRContext';

const SendRecipeToast = ({ openModal, setOpenModal, selectedLot, plcNo }) => {
  const { sendValue } = useContext(SignalRContext);
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'orange', borderBottom: '2px solid orange' }} textAlign={'start'}>
          Lot Gönder
          <CloseCircle
            onClick={() => {
              setOpenModal(false);
            }}
            style={{ cursor: 'pointer', color: 'white', position: 'absolute', top: 5, right: 5 }}
            size={35}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid mt={1}>
              <Grid item>{selectedLot.lotYazici1} Lot'unun Gönderilmesini Onaylıyor Musunuz?</Grid>
              <Grid container display={'flex'} justifyContent={'end'}>
                <Grid item mt={2} mr={1}>
                  <Button
                    fullWidth
                    endIcon={<TickCircle size={32} />}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      sendValue(`PLC${plcNo}!serverLotId`, 0);
                      setTimeout(() => {
                        sendValue(`PLC${plcNo}!serverLotId`, selectedLot.id);
                      }, 500);
                      setOpenModal(false);
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
  );
};

export default SendRecipeToast;
