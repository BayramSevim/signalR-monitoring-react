import { Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import MainCard from 'components/MainCard';
import Paper from '@mui/material/Paper';
import 'react-toastify/dist/ReactToastify.css';
import skryba from 'assets/images/barkod/skryba.png';
import sputnik from 'assets/images/barkod/sputnik.png';
import image from 'assets/images/barkod/image.png';
import stok from 'assets/images/barkod/stok.png';

export default function YazicilarVeMakinalar() {
  return (
    <>
      <MainCard>
        <Grid display={'flex'} flexDirection={'row'} height={700} justifyContent={'center'} flexWrap={'wrap'}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Barkod Adı</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Bilgileri</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Barkod Görseli</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    id: 1,
                    title: 'SKRYBA',
                    details: '(01) + urun kodu + kilo (11) üretim yıl2 + ay + gün',
                    detailDesc: '(sınırsız)  (6 hane)  (6 hane)',
                    barcode: skryba
                  },
                  {
                    id: 2,
                    title: 'SPUTNIK',
                    details: '(01) + urun kodu + (3103) kilo (11) üretim yıl2 + ay + gün (17) tüketim yıl2 + ay + gün (10) log numarası',
                    detailDesc: '(sınırsız)  (6 hane)  (6 hane) (6 hane)',
                    barcode: sputnik
                  },
                  {
                    id: 3,
                    title: '',
                    details: '(01) + urun kodu + (3103) kilo (11) üretim yıl2 + ay + gün (17) tüketim yıl2 + ay + gün',
                    detailDesc: '(sınırsız)  (6 hane)  (6 hane) (6 hane)',
                    barcode: image
                  },
                  {
                    id: 4,
                    title: 'STOK',
                    details: '+ urun kodu + kilo + palet kodu + palet toplam koli adeti + gün + ay + üretim yıl2 + müşteri kodu',
                    detailDesc: '(sınırsız)  (5 hane)  (5 hane) (2 hane) (6 hane) (2 hane)',
                    barcode: stok
                  }
                ].map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{row.title}</TableCell>
                    <TableCell>
                      <Typography>
                        <Grid display={'flex'} justifyItems={'center'} flexDirection={'column'} alignItems={'center'}>
                          <Grid>{row.details}</Grid>
                          <Grid>{row.detailDesc}</Grid>
                        </Grid>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <img src={row.barcode} alt={`Barkod ${row.id}`} style={{ maxWidth: '100%' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </MainCard>
    </>
  );
}
