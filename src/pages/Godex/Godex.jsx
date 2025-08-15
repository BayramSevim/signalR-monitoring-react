import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import HD from 'assets/images/Logo/HD.png';
const leftLabels = [
  '.urunNo.',
  '.urunAdi.',
  '.grupAdi.',
  '.aciklama1.',
  '.aciklama2.',
  '.aciklama3.',
  '.aciklama4.',
  '.aciklama5.',
  '.saat.',
  '.id.',
  '.adet.',
  '.toplamAdet.',
  '.paletAdet.',
  '.paletKoliAdet.',
  '.paletDetay1 ... 31.',
  '.kefeNo.'
];

const rightLabels = [
  '.kilo.',
  '.kiloSade.',
  '.toplamKilo.',
  '.fiyat.',
  '.lotNo.',
  '.010000012300017310012345611090423.',
  '.12345678.',
  '.paletNo.',
  '.uretimTarih.',
  '.paketTarih.',
  '.skt.',
  '.glazeOran.',
  '.glazeKilo.',
  '.barcodeNoKoli.',
  '.barcodeNoPalet.'
];

const GodexEtiketDetay = () => {
  return (
    <MainCard>
      <Box p={4}>
        <Box
          sx={{
            position: 'relative',
            mb: 3,
            borderBottom: '2px solid white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h2">Etiket Detayları</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <img src={HD} width={150} style={{ marginBottom: 38 }} />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            {leftLabels.map((label, index) => (
              <Typography fontSize={16} key={index}>
                {label}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6}>
            {rightLabels.map((label, index) => (
              <Typography fontSize={16} key={index}>
                {label}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default GodexEtiketDetay;
