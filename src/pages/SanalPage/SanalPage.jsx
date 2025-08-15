import MainCard from 'components/MainCard';
import { Grid, Typography } from '@mui/material';
import SanalBoylamaTable from 'components/table/SanalBoylamaTable';
import { SignalRContext } from 'contexts/SignalRContext';
import { useContext } from 'react';
import { Wifi } from 'iconsax-react';

export default function MainScreen() {
  const { isConnected, userCancelled } = useContext(SignalRContext);
  return (
    <MainCard>
      <Grid display={'flex'} justifyContent={'start'} mb={2} mt={-2}>
        {isConnected ? <Wifi size={38} color="lime" /> : <Wifi size={42} color="red" />}
      </Grid>
      <Grid container justifyContent="center" mb={2} mt={-6} display={userCancelled ? 'block' : 'none'}>
        <Grid item>
          <Typography
            sx={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center'
            }}
          >
            PLC Bağlantısı Başarısız
          </Typography>
        </Grid>
      </Grid>
      <Grid spacing={2}>
        <SanalBoylamaTable title="SANAL BOYLAMA" />
      </Grid>
    </MainCard>
  );
}
