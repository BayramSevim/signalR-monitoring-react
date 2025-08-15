import { Grid, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { CloseCircle, Save2 } from 'iconsax-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';

const UpdateLabelModal = ({ openModal, setOpenModal, selectEtiket, refreshTable, refreshDetailTable, toastMessage }) => {
  const fileInputRef = useRef(null);
  const [etiketAd, setEtiketAd] = useState(selectEtiket.etiketAd);
  const [taze, setTaze] = useState(selectEtiket.taze);
  const [donuk, setDonuk] = useState(selectEtiket.taze);
  const [etiketDetayText, setEtiketDetayText] = useState(selectEtiket.etiketData);

  const updateEtiket = async () => {
    const labelModel = {
      id: selectEtiket.id,
      etiketAd: etiketAd || '',
      taze: taze === true ? true : false,
      etiketData: etiketDetayText
    };
    try {
      await axios.post(`${GetAPIUrl()}/api/Boylama/UpdateLabel`, labelModel);
      refreshTable();
      refreshDetailTable(selectEtiket.id);
      setOpenModal(false);
      toastMessage('Etiket Güncelleme İşlemi Başarılı', 3);
    } catch (error) {
      toastMessage('Etiket Güncelleme İşlemi Başarısız', 4);
      console.error('Etiket güncelleme hatası:', error);
    }
  };

  const handleTazeChange = (checked) => {
    setTaze(checked);
    setDonuk(!checked);
  };

  useEffect(() => {
    setTaze(selectEtiket.taze);
    setDonuk(!selectEtiket.taze);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setEtiketDetayText(content);
    };
    reader.readAsText(file);
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Grid sx={{ border: '2px solid darkgray', borderRadius: '10px' }}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Etiket Güncelle
          <CloseCircle
            onClick={() => setOpenModal(false)}
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
                <FormControlLabel control={<Checkbox checked={taze} onChange={(e) => handleTazeChange(e.target.checked)} />} label="Taze" />
                <FormControlLabel control={<Checkbox checked={donuk} onChange={(e) => setDonuk(e.target.checked)} />} label="Donuk" />
              </Grid>
              <Grid mb={1} ml={2} mt={1} display={'flex'} flexDirection={'row'}>
                <TextField
                  multiline
                  rows={10}
                  value={etiketDetayText}
                  onChange={(e) => setEtiketDetayText(e.target.value)}
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
                  sx={{ width: 320, backgroundColor: '#FF9B17', color: 'black', fontWeight: 'bold' }}
                  variant="contained"
                  color="warning"
                  endIcon={<Save2 size={32} />}
                  onClick={updateEtiket}
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
  );
};

export default UpdateLabelModal;
