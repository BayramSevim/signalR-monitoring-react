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
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { GetAPIUrl } from 'api/gama';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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

  const handleExportClick = () => {
    const exportUrl = createExportUrl();
    window.open(exportUrl, '_blank');
  };
  return (
    <>
      <Box sx={{ p: 1, pb: 2 }}>
        <Grid item container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <MainCard>
                <DateTimePicker
                  label="Başlangıç Tarihi"
                  select={selectedDateS}
                  defaultValue={dayjs(selectedDateS)}
                  onChange={handleDateChangeS}
                  format="DD.MM.YYYY HH:mm"
                />
                <DateTimePicker
                  label="Bitiş Tarihi"
                  defaultValue={dayjs(selectedDateF)}
                  select={selectedDateF}
                  format="DD.MM.YYYY HH:mm"
                  onChange={handleDateChangeF}
                />
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
                <Box sx={{ minWidth: 150 }} marginTop={1}>
                  <FormControl fullWidth className="form-control">
                    <InputLabel id="demo-simple-select-label">Makina Seçimi</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={product.MakinaAdi}
                      label="Age"
                      onChange={(e) => checkProduct(e)}
                    >
                      {getMakinalar.map((product, index) => (
                        <MenuItem value={product.Id} key={index}>
                          {product.MakinaAdi}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={fetchProduct}
                      style={{ marginTop: '2%', backgroundColor: '#261FB3' }}
                    >
                      Göster
                    </Button>
                    {product.length > 0 && (
                      <Button variant="contained" onClick={handleExportClick} color="warning" style={{ marginTop: '2%' }}>
                        Export
                      </Button>
                    )}
                  </FormControl>
                </Box>
              </MainCard>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Box>
    </>
  );
};

export default Selection;
