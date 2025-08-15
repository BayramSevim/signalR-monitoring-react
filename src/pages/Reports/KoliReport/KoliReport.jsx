import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from 'components/MasterDetail/ShiftProduct/MasterDetail';
import Grid from '@mui/material/Grid';
import KoliSelection from 'components/selection/Selection';
import { GetAPIUrl } from 'api/gama';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
// import KoliReportCharts from 'components/charts/KoliReportCharts';
import { Typography } from '@mui/material';
import Loader from 'components/Loader';

const KoliReport = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  //UseStates
  const [product, setProduct] = useState([]);
  const [getMakinalar, setGetMakinalar] = useState([]);
  const [makinaId, setMakinaId] = useState(0);
  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [responseURL, setResponseURL] = useState([]);

  const [selectRecete, setSelectRecete] = useState('t');
  const [selectLot, setSelectLot] = useState('t');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(selectedDateS));
  const formattedDateF = formatDate(new Date(selectedDateF));

  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };

  const handleReceteChange = (recete) => {
    if (recete === null) {
      setSelectRecete('t');
    } else setSelectRecete(recete.receteAdi);
  };

  const handleLotChange = (lot) => {
    if (lot === null) {
      setSelectLot('t');
    } else setSelectLot(lot.lotYazici1);
  };

  const fetchProduct = async () => {
    setLoading(true);
    await axios
      .get(`${GetAPIUrl()}/api/Boylama/GetUretimKoliByDate`, {
        params: {
          dateS: formattedDateS,
          dateF: formattedDateF,
          makineId: makinaId > 0 ? makinaId : 0,
          receteAd: selectRecete,
          lotAd: selectLot
        }
      })
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
        setResponseURL(res.request.responseURL);
        setIsUpdate(!isUpdate);
      });
  };

  const getMakinaId = async () => {
    const response = await axios.get(`${GetAPIUrl()}/api/Boylama/GetMakinalar`);
    setGetMakinalar(response.data);
  };

  const checkProduct = (e) => {
    const selectedValue = e.target.value;
    setMakinaId(selectedValue);
  };

  useEffect(() => {
    fetchProduct();
    getMakinaId();
  }, []);

  // Get Data And UseEffects

  return (
    <>
      {loading && <Loader />}
      <Grid container style={{ height: 'auto' }} justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item xs={6} height={200} display="flex" alignItems="center">
          <Typography variant="h1" sx={{ fontWeight: '800' }}>
            Koli Raporu
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Box sx={{ minWidth: '300px', ml: 'auto' }}>
            <KoliSelection
              selectedDateS={formattedDateS}
              selectedDateF={formattedDateF}
              handleDateChangeS={handleDateChangeS}
              handleDateChangeF={handleDateChangeF}
              getMakinalar={getMakinalar}
              fetchProduct={fetchProduct}
              checkProduct={checkProduct}
              responseURL={responseURL}
              product={product}
              type={2}
              onReceteChange={handleReceteChange}
              onLotChange={handleLotChange}
            />
          </Box>
        </Grid>
      </Grid>

      <MainCard>
        {/* {product.length > 1 ? (
          <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Grid item md={8.5}>
              <MasterDetail product={product} isUpdate={isUpdate} />
            </Grid>
            <Grid item md={3.5}>
              <KoliReportCharts productList={product} isUpdate={isUpdate} />
            </Grid>
          </Grid>
        ) : ( */}
        <Grid container>
          <Grid item>
            <MasterDetail product={product} isUpdate={isUpdate} />
          </Grid>
        </Grid>
        {/* )} */}
      </MainCard>
    </>
  );
};

export default KoliReport;
