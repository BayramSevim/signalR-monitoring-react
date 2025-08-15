import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { Save2 } from 'iconsax-react';
import Loader from 'components/Loader';

const AddLabelModal = ({ openModal, setOpenModal, refreshTable, toastMessage }) => {
  const fileInputRef = useRef(null);
  const [etiketAd, setEtiketAd] = useState('');
  const [etiketDetay, setEtiketDetay] = useState('');
  const [taze, setTaze] = useState(false);
  const [donuk, setDonuk] = useState(false);
  const [loading, setLoading] = useState(false);

  const insertEtiket = async () => {
    setLoading(true);
    const labelModel = {
      id: 0,
      etiketAd: etiketAd || '',
      taze: taze === true ? true : false,
      etiketData: etiketDetay
    };
    try {
      await axios.post(`${GetAPIUrl()}/api/Boylama/InsertLabel`, labelModel);

      setLoading(false);
      toastMessage('Etiket Ekleme İşlemi Başarılı', 1);
      setOpenModal(false);
      refreshTable();
    } catch (error) {
      toastMessage('Etiket Ekleme İşlemi Başarısız', 2);
      console.error('Error during insert operations: ', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setEtiketDetay(content);
    };
    reader.readAsText(file);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
          <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
            Etiket Ekle
            <CloseCircle
              onClick={() => {
                setOpenModal(false);
              }}
              style={{ cursor: 'pointer', position: 'absolute', top: 5, right: 5 }}
              size={32}
            />
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid>
                <Grid item>
                  <TextField value={etiketAd} variant="outlined" onChange={(e) => setEtiketAd(e.target.value)} sx={{ width: 500 }} />
                </Grid>
                <Grid display={'flex'} justifyContent={'center'}>
                  <FormControlLabel control={<Checkbox checked={taze} onChange={(e) => setTaze(e.target.checked)} />} label="Taze" />
                  <FormControlLabel control={<Checkbox checked={donuk} onChange={(e) => setDonuk(e.target.checked)} />} label="Donuk" />
                </Grid>
                <Grid mb={1} ml={2} mt={1} display={'flex'} flexDirection={'row'}>
                  <TextField
                    multiline
                    rows={10}
                    value={etiketDetay} // Bunu da eklemeyi unutma
                    onChange={(e) => setEtiketDetay(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: {
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        whiteSpace: 'pre'
                      }
                    }}
                    style={{
                      maxHeight: '400px',
                      width: '500px',
                      overflow: 'auto'
                    }}
                    sx={{
                      ml: -2
                    }}
                  />
                </Grid>
                <Grid container mt={2} display={'flex'} justifyContent={'center'}>
                  <Button
                    fullWidth
                    sx={{ width: 320, backgroundColor: '#5CB338', color: 'black', fontWeight: 'bold' }}
                    endIcon={<Save2 size={32} />}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      insertEtiket();
                    }}
                  >
                    Kaydet
                  </Button>
                </Grid>
                <Grid mt={2} display={'flex'} justifyContent={'center'}>
                  <input type="file" accept=".txt,.prn" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                  <Button
                    variant="contained"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    sx={{ width: 320, backgroundColor: '#074799', fontWeight: 'bold' }}
                    fullWidth
                  >
                    Dosya Seç (.txt)
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddLabelModal;
