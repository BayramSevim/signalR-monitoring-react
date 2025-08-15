import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';

const Selection = ({
  selectedDateS,
  selectedDateF,
  handleDateChangeS,
  handleDateChangeF,
  getMakinalar,
  fetchProduct,
  responseURL,
  checkProduct,
  product,
  type,
  onReceteChange,
  onLotChange
}) => {
  const [receteler, setReceteler] = useState([]);
  const [lotlar, setLotlar] = useState([]);
  const [selectRecete, setSelectRecete] = useState(null);
  const [selectLot, setSelectLot] = useState(null);

  useEffect(() => {
    axios
      .get(`${GetAPIUrl()}/api/Boylama/GetReceteler`)
      .then((res) => setReceteler(res.data))
      .catch((err) => console.error(err));
    axios
      .get(`${GetAPIUrl()}/api/Boylama/GetLots`)
      .then((res) => setLotlar(res.data))
      .catch((err) => console.error(err));
  }, []);

  const createExportUrl = () => {
    const encodedJData = encodeURIComponent(responseURL);
    return `${GetAPIUrl()}/ExportApi/ExportPage.aspx?jdata=${encodedJData}&type=${type}`;
  };
  const handleExportClick = () => window.open(createExportUrl(), '_blank');

  return (
    <Box sx={{ p: 1, pb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <MainCard>
                <DateTimePicker
                  label="Başlangıç Tarihi"
                  value={dayjs(selectedDateS)}
                  onChange={handleDateChangeS}
                  format="DD.MM.YYYY HH:mm"
                />
                <DateTimePicker label="Bitiş Tarihi" value={dayjs(selectedDateF)} onChange={handleDateChangeF} format="DD.MM.YYYY HH:mm" />
                <Grid container sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Autocomplete
                      size="large"
                      options={receteler}
                      getOptionLabel={(opt) => opt.receteAdi}
                      value={selectRecete}
                      onInputChange={(e, newInput, reason) => {
                        if (reason === 'clear') {
                          setSelectRecete('');
                        }
                      }}
                      onChange={(e, v) => {
                        setSelectRecete(v);
                        onReceteChange(v);
                      }}
                      renderInput={(params) => <TextField {...params} label="Reçete Seçimi" fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      size="large"
                      options={lotlar}
                      getOptionLabel={(opt) => opt.lotYazici1}
                      value={selectLot}
                      onInputChange={(e, newInput, reason) => {
                        if (reason === 'clear') {
                          setSelectLot('');
                        }
                      }}
                      onChange={(e, v) => {
                        setSelectLot(v);
                        onLotChange(v);
                      }}
                      renderInput={(params) => <TextField {...params} label="Lot Seçimi" fullWidth />}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ minWidth: 150, mt: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Makina Seçimi</InputLabel>
                    <Select labelId="demo-simple-select-label" value={product.MakinaAdi} onChange={checkProduct}>
                      {getMakinalar.map((m, i) => (
                        <MenuItem value={m.Id} key={i}>
                          {m.MakinaAdi}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button variant="contained" sx={{ mt: 1, backgroundColor: '#261FB3' }} onClick={fetchProduct}>
                      Göster
                    </Button>
                    {product.length > 0 && (
                      <Button variant="contained" color="warning" sx={{ mt: 1 }} onClick={handleExportClick}>
                        Export
                      </Button>
                    )}
                  </FormControl>
                </Box>
              </MainCard>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Selection;
