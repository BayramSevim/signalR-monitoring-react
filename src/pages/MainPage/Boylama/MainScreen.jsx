import MainCard from 'components/MainCard';
import { Grid, Typography } from '@mui/material';
import AnaBoylamaTable from 'components/table/AnaBoylamaTable';
import GirisBoylamaTable from 'components/table/GirisBoylamaTable';
import { SignalRContext } from 'contexts/SignalRContext';
import { useContext } from 'react';
import { Wifi } from 'iconsax-react';

export default function MainScreen() {
  const { isConnected, userCancelled } = useContext(SignalRContext);

  return (
    <MainCard>
      <Grid display={'flex'} justifyContent={'start'} mt={-2}>
        {isConnected ? <Wifi size={38} color="lime" /> : <Wifi size={42} color="red" />}
      </Grid>

      <Grid container justifyContent="center" mb={2} mt={-4} display={userCancelled ? 'block' : 'none'}>
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

      <Grid container spacing={2}>
        <GirisBoylamaTable title="GİRİŞ BOYLAMA" />
        <AnaBoylamaTable title="ANA BOYLAMA" />
      </Grid>
    </MainCard>
  );
}
