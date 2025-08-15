import React, { useState, useEffect, useContext } from 'react';
import { GetAPIUrl } from 'api/gama';
import axios from 'axios';
import {
  Grid,
  Typography,
  TextField,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Box,
  TableBody,
  Paper,
  Autocomplete,
  Button
} from '@mui/material';
import { SignalRContext } from 'contexts/SignalRContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Brodcast } from 'iconsax-react';
import SanalSendRecipeToast from 'components/Toast/SanalSendRecipeToast';

const GirisBoylamaTable = ({ title }) => {
  const { readTag, sendValue, tagList } = useContext(SignalRContext);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [recipes, setRecipes] = useState([]);

  // Tablo Header
  const [logNoHMI, setLogNoHMI] = useState('');
  const [receteAdiHMI, setReceteAdiHMI] = useState('');
  const [ciftlikAdiHMI, setCiftlikAdiHMI] = useState('');
  const [kefeGrup1Isim, setKefeGrup1Isim] = useState('');
  const [kefeGrup2Isim, setKefeGrup2Isim] = useState('');
  const [kefeGrup3Isim, setKefeGrup3Isim] = useState('');
  const [kefeGrup4Isim, setKefeGrup4Isim] = useState('');
  const [kefeGrup5Isim, setKefeGrup5Isim] = useState('');
  const [kefeGrup6Isim, setKefeGrup6Isim] = useState('');
  const [kefeGrup7Isim, setKefeGrup7Isim] = useState('');
  const [kefeGrup8Isim, setKefeGrup8Isim] = useState('');
  const [kefeGrup9Isim, setKefeGrup9Isim] = useState('');
  const [kefeGrup10Isim, setKefeGrup10Isim] = useState('');
  const [kefeGrup11Isim, setKefeGrup11Isim] = useState('');
  const [kefeGrup12Isim, setKefeGrup12Isim] = useState('');
  const [kefeGrup1ToplamAdet, setKefeGrup1ToplamAdet] = useState(0);
  const [kefeGrup2ToplamAdet, setKefeGrup2ToplamAdet] = useState(0);
  const [kefeGrup3ToplamAdet, setKefeGrup3ToplamAdet] = useState(0);
  const [kefeGrup4ToplamAdet, setKefeGrup4ToplamAdet] = useState(0);
  const [kefeGrup5ToplamAdet, setKefeGrup5ToplamAdet] = useState(0);
  const [kefeGrup6ToplamAdet, setKefeGrup6ToplamAdet] = useState(0);
  const [kefeGrup7ToplamAdet, setKefeGrup7ToplamAdet] = useState(0);
  const [kefeGrup8ToplamAdet, setKefeGrup8ToplamAdet] = useState(0);
  const [kefeGrup9ToplamAdet, setKefeGrup9ToplamAdet] = useState(0);
  const [kefeGrup10ToplamAdet, setKefeGrup10ToplamAdet] = useState(0);
  const [kefeGrup11ToplamAdet, setKefeGrup11ToplamAdet] = useState(0);
  const [kefeGrup12ToplamAdet, setKefeGrup12ToplamAdet] = useState(0);
  const [kefeGrup1ToplamAgirlik, setKefeGrup1ToplamAgirlik] = useState(0);
  const [kefeGrup2ToplamAgirlik, setKefeGrup2ToplamAgirlik] = useState(0);
  const [kefeGrup3ToplamAgirlik, setKefeGrup3ToplamAgirlik] = useState(0);
  const [kefeGrup4ToplamAgirlik, setKefeGrup4ToplamAgirlik] = useState(0);
  const [kefeGrup5ToplamAgirlik, setKefeGrup5ToplamAgirlik] = useState(0);
  const [kefeGrup6ToplamAgirlik, setKefeGrup6ToplamAgirlik] = useState(0);
  const [kefeGrup7ToplamAgirlik, setKefeGrup7ToplamAgirlik] = useState(0);
  const [kefeGrup8ToplamAgirlik, setKefeGrup8ToplamAgirlik] = useState(0);
  const [kefeGrup9ToplamAgirlik, setKefeGrup9ToplamAgirlik] = useState(0);
  const [kefeGrup10ToplamAgirlik, setKefeGrup10ToplamAgirlik] = useState(0);
  const [kefeGrup11ToplamAgirlik, setKefeGrup11ToplamAgirlik] = useState(0);
  const [kefeGrup12ToplamAgirlik, setKefeGrup12ToplamAgirlik] = useState(0);
  const [kefeGrup1OrtalamaAgirlik, setKefeGrup1OrtalamaAgirlik] = useState(0);
  const [kefeGrup2OrtalamaAgirlik, setKefeGrup2OrtalamaAgirlik] = useState(0);
  const [kefeGrup3OrtalamaAgirlik, setKefeGrup3OrtalamaAgirlik] = useState(0);
  const [kefeGrup4OrtalamaAgirlik, setKefeGrup4OrtalamaAgirlik] = useState(0);
  const [kefeGrup5OrtalamaAgirlik, setKefeGrup5OrtalamaAgirlik] = useState(0);
  const [kefeGrup6OrtalamaAgirlik, setKefeGrup6OrtalamaAgirlik] = useState(0);
  const [kefeGrup7OrtalamaAgirlik, setKefeGrup7OrtalamaAgirlik] = useState(0);
  const [kefeGrup8OrtalamaAgirlik, setKefeGrup8OrtalamaAgirlik] = useState(0);
  const [kefeGrup9OrtalamaAgirlik, setKefeGrup9OrtalamaAgirlik] = useState(0);
  const [kefeGrup10OrtalamaAgirlik, setKefeGrup10OrtalamaAgirlik] = useState(0);
  const [kefeGrup11OrtalamaAgirlik, setKefeGrup11OrtalamaAgirlik] = useState(0);
  const [kefeGrup12OrtalamaAgirlik, setKefeGrup12OrtalamaAgirlik] = useState(0);
  const [kefeGrup1AdetYuzde, setKefeGrup1AdetYuzde] = useState(0);
  const [kefeGrup2AdetYuzde, setKefeGrup2AdetYuzde] = useState(0);
  const [kefeGrup3AdetYuzde, setKefeGrup3AdetYuzde] = useState(0);
  const [kefeGrup4AdetYuzde, setKefeGrup4AdetYuzde] = useState(0);
  const [kefeGrup5AdetYuzde, setKefeGrup5AdetYuzde] = useState(0);
  const [kefeGrup6AdetYuzde, setKefeGrup6AdetYuzde] = useState(0);
  const [kefeGrup7AdetYuzde, setKefeGrup7AdetYuzde] = useState(0);
  const [kefeGrup8AdetYuzde, setKefeGrup8AdetYuzde] = useState(0);
  const [kefeGrup9AdetYuzde, setKefeGrup9AdetYuzde] = useState(0);
  const [kefeGrup10AdetYuzde, setKefeGrup10AdetYuzde] = useState(0);
  const [kefeGrup11AdetYuzde, setKefeGrup11AdetYuzde] = useState(0);
  const [kefeGrup12AdetYuzde, setKefeGrup12AdetYuzde] = useState(0);
  const [kefeGrup1AgirlikYuzde, setKefeGrup1AgirlikYuzde] = useState(0);
  const [kefeGrup2AgirlikYuzde, setKefeGrup2AgirlikYuzde] = useState(0);
  const [kefeGrup3AgirlikYuzde, setKefeGrup3AgirlikYuzde] = useState(0);
  const [kefeGrup4AgirlikYuzde, setKefeGrup4AgirlikYuzde] = useState(0);
  const [kefeGrup5AgirlikYuzde, setKefeGrup5AgirlikYuzde] = useState(0);
  const [kefeGrup6AgirlikYuzde, setKefeGrup6AgirlikYuzde] = useState(0);
  const [kefeGrup7AgirlikYuzde, setKefeGrup7AgirlikYuzde] = useState(0);
  const [kefeGrup8AgirlikYuzde, setKefeGrup8AgirlikYuzde] = useState(0);
  const [kefeGrup9AgirlikYuzde, setKefeGrup9AgirlikYuzde] = useState(0);
  const [kefeGrup10AgirlikYuzde, setKefeGrup10AgirlikYuzde] = useState(0);
  const [kefeGrup11AgirlikYuzde, setKefeGrup11AgirlikYuzde] = useState(0);
  const [kefeGrup12AgirlikYuzde, setKefeGrup12AgirlikYuzde] = useState(0);
  const [toplamAdet, setToplamAdet] = useState(0);
  const [netAdet, setNetAdet] = useState(0);
  const [redAdet, setRedAdet] = useState(0);
  const [toplamAgirlik, setToplamAgirlik] = useState(0);
  const [netAgirlik, setNetAgirlik] = useState(0);
  const [redAgirlik, setRedAgirlik] = useState(0);
  const [netAgirlikYuzde, setNetAgirlikYuzde] = useState(0);
  const [redAgirlikYuzde, setRedAgirlikYuzde] = useState(0);
  const [ortalamaNetAgirlik, setOrtalamaNetAgirlik] = useState(0);
  const [ortalamaToplamAgirlik, setOrtalamaToplamAgirlik] = useState(0);

  const [kefeGrup1Aktif, setKefeGrup1Aktif] = useState(false);
  const [kefeGrup2Aktif, setKefeGrup2Aktif] = useState(false);
  const [kefeGrup3Aktif, setKefeGrup3Aktif] = useState(false);
  const [kefeGrup4Aktif, setKefeGrup4Aktif] = useState(false);
  const [kefeGrup5Aktif, setKefeGrup5Aktif] = useState(false);
  const [kefeGrup6Aktif, setKefeGrup6Aktif] = useState(false);
  const [kefeGrup7Aktif, setKefeGrup7Aktif] = useState(false);
  const [kefeGrup8Aktif, setKefeGrup8Aktif] = useState(false);
  const [kefeGrup9Aktif, setKefeGrup9Aktif] = useState(false);
  const [kefeGrup10Aktif, setKefeGrup10Aktif] = useState(false);
  const [kefeGrup11Aktif, setKefeGrup11Aktif] = useState(false);
  const [kefeGrup12Aktif, setKefeGrup12Aktif] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);

  const [openSendRecipe, setOpenSendRecipe] = useState(false);

  useEffect(() => {
    const tagMappings = [
      { tag: 'PLC1!serverLotAdi1', setter: setLogNoHMI },
      { tag: 'PLC1!serverCiftlikAdi', setter: setCiftlikAdiHMI },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__isim', setter: setKefeGrup1Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__isim', setter: setKefeGrup2Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__isim', setter: setKefeGrup3Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__isim', setter: setKefeGrup4Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__isim', setter: setKefeGrup5Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__isim', setter: setKefeGrup6Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__isim', setter: setKefeGrup7Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__isim', setter: setKefeGrup8Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__isim', setter: setKefeGrup9Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__isim', setter: setKefeGrup10Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__isim', setter: setKefeGrup11Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__isim', setter: setKefeGrup12Isim },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__toplamAdet', setter: setKefeGrup1ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__toplamAdet', setter: setKefeGrup2ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__toplamAdet', setter: setKefeGrup3ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__toplamAdet', setter: setKefeGrup4ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__toplamAdet', setter: setKefeGrup5ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__toplamAdet', setter: setKefeGrup6ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__toplamAdet', setter: setKefeGrup7ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__toplamAdet', setter: setKefeGrup8ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__toplamAdet', setter: setKefeGrup9ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__toplamAdet', setter: setKefeGrup10ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__toplamAdet', setter: setKefeGrup11ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__toplamAdet', setter: setKefeGrup12ToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__toplamKilo', setter: setKefeGrup1ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__toplamKilo', setter: setKefeGrup2ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__toplamKilo', setter: setKefeGrup3ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__toplamKilo', setter: setKefeGrup4ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__toplamKilo', setter: setKefeGrup5ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__toplamKilo', setter: setKefeGrup6ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__toplamKilo', setter: setKefeGrup7ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__toplamKilo', setter: setKefeGrup8ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__toplamKilo', setter: setKefeGrup9ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__toplamKilo', setter: setKefeGrup10ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__toplamKilo', setter: setKefeGrup11ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__toplamKilo', setter: setKefeGrup12ToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__ortalamaWeigh', setter: setKefeGrup1OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__ortalamaWeigh', setter: setKefeGrup2OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__ortalamaWeigh', setter: setKefeGrup3OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__ortalamaWeigh', setter: setKefeGrup4OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__ortalamaWeigh', setter: setKefeGrup5OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__ortalamaWeigh', setter: setKefeGrup6OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__ortalamaWeigh', setter: setKefeGrup7OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__ortalamaWeigh', setter: setKefeGrup8OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__ortalamaWeigh', setter: setKefeGrup9OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__ortalamaWeigh', setter: setKefeGrup10OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__ortalamaWeigh', setter: setKefeGrup11OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__ortalamaWeigh', setter: setKefeGrup12OrtalamaAgirlik },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__adetYuzdesi', setter: setKefeGrup1AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__adetYuzdesi', setter: setKefeGrup2AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__adetYuzdesi', setter: setKefeGrup3AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__adetYuzdesi', setter: setKefeGrup4AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__adetYuzdesi', setter: setKefeGrup5AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__adetYuzdesi', setter: setKefeGrup6AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__adetYuzdesi', setter: setKefeGrup7AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__adetYuzdesi', setter: setKefeGrup8AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__adetYuzdesi', setter: setKefeGrup9AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__adetYuzdesi', setter: setKefeGrup10AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__adetYuzdesi', setter: setKefeGrup11AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__adetYuzdesi', setter: setKefeGrup12AdetYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__agirlikYuzdesi', setter: setKefeGrup1AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__agirlikYuzdesi', setter: setKefeGrup2AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__agirlikYuzdesi', setter: setKefeGrup3AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__agirlikYuzdesi', setter: setKefeGrup4AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__agirlikYuzdesi', setter: setKefeGrup5AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__agirlikYuzdesi', setter: setKefeGrup6AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__agirlikYuzdesi', setter: setKefeGrup7AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__agirlikYuzdesi', setter: setKefeGrup8AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__agirlikYuzdesi', setter: setKefeGrup9AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__agirlikYuzdesi', setter: setKefeGrup10AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__agirlikYuzdesi', setter: setKefeGrup11AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__agirlikYuzdesi', setter: setKefeGrup12AgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalToplamUretimAdet', setter: setToplamAdet },
      { tag: 'PLC1!Application_GVL_sanalToplamNetAdet', setter: setNetAdet },
      { tag: 'PLC1!Application_GVL_sanalToplamRedAdet', setter: setRedAdet },
      { tag: 'PLC1!Application_GVL_sanalToplamUretimKilo', setter: setToplamAgirlik },
      { tag: 'PLC1!Application_GVL_sanalToplamNetKilo', setter: setNetAgirlik },
      { tag: 'PLC1!Application_GVL_sanalToplamRedKilo', setter: setRedAgirlik },
      { tag: 'PLC1!Application_GVL_sanalNetAgirlikYuzdesi', setter: setNetAgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalRedAgirlikYuzdesi', setter: setRedAgirlikYuzde },
      { tag: 'PLC1!Application_GVL_sanalGrup_1__aktif', setter: setKefeGrup1Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_2__aktif', setter: setKefeGrup2Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_3__aktif', setter: setKefeGrup3Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_4__aktif', setter: setKefeGrup4Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_5__aktif', setter: setKefeGrup5Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_6__aktif', setter: setKefeGrup6Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_7__aktif', setter: setKefeGrup7Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_8__aktif', setter: setKefeGrup8Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_9__aktif', setter: setKefeGrup9Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_10__aktif', setter: setKefeGrup10Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_11__aktif', setter: setKefeGrup11Aktif },
      { tag: 'PLC1!Application_GVL_sanalGrup_12__aktif', setter: setKefeGrup12Aktif },
      { tag: 'PLC1!serverSanalReceteAdi', setter: setReceteAdiHMI },
      { tag: 'PLC1!Application_GVL_sanalOrtalamaNetKilo', setter: setOrtalamaNetAgirlik },
      { tag: 'PLC1!Application_GVL_sanalOrtalamaToplamKilo', setter: setOrtalamaToplamAgirlik },
      { tag: 'PLC1!serverOnline', setter: setServerOnline }
    ];

    // const handleSignalRData = (e) => {
    //   const data = e.detail;
    //   data.forEach((item) => {
    //     tagMappings.forEach(({ tag, setter }) => {
    //       if (item.Name === tag) {
    //         setter(item.Value);
    //       }
    //     });
    //   });
    // };

    const checkStat = (data) => {
      data.forEach((item) => {
        tagMappings.forEach(({ tag, setter }) => {
          if (item.Name === tag) {
            setter(item.Value);
          }
        });
      });
    };

    const fetchGetItemAll = async () => {
      await axios.get(`${GetAPIUrl()}/api/OpcUa/GetAllTags`).then((res) => {
        checkStat(res.data);
      });
    };

    const handleSignalRData = (e) => {
      const data = e.detail;
      checkStat(data);
    };
    fetchGetItemAll();

    window.addEventListener('SignalRDataReceived', handleSignalRData);

    return () => {
      window.removeEventListener('SignalRDataReceived', handleSignalRData);
    };
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await axios.get(`${GetAPIUrl()}/api/Boylama/GetReceteler`).then((res) => {
          const data = res.data;

          const filterRecipe = data.filter((item) => item.makinaAd === 'Sanal Boylama' && item.isActive === true);
          setRecipes(filterRecipe);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, []);

  const grupVerileri = [
    {
      isim: kefeGrup1Isim,
      adet: kefeGrup1ToplamAdet,
      agirlik: kefeGrup1ToplamAgirlik,
      ortAgirlik: kefeGrup1OrtalamaAgirlik,
      adetYuzde: kefeGrup1AdetYuzde,
      agirlikYuzde: kefeGrup1AgirlikYuzde,
      aktif: kefeGrup1Aktif
    },
    {
      isim: kefeGrup2Isim,
      adet: kefeGrup2ToplamAdet,
      agirlik: kefeGrup2ToplamAgirlik,
      ortAgirlik: kefeGrup2OrtalamaAgirlik,
      adetYuzde: kefeGrup2AdetYuzde,
      agirlikYuzde: kefeGrup2AgirlikYuzde,
      aktif: kefeGrup2Aktif
    },
    {
      isim: kefeGrup3Isim,
      adet: kefeGrup3ToplamAdet,
      agirlik: kefeGrup3ToplamAgirlik,
      ortAgirlik: kefeGrup3OrtalamaAgirlik,
      adetYuzde: kefeGrup3AdetYuzde,
      agirlikYuzde: kefeGrup3AgirlikYuzde,
      aktif: kefeGrup3Aktif
    },
    {
      isim: kefeGrup4Isim,
      adet: kefeGrup4ToplamAdet,
      agirlik: kefeGrup4ToplamAgirlik,
      ortAgirlik: kefeGrup4OrtalamaAgirlik,
      adetYuzde: kefeGrup4AdetYuzde,
      agirlikYuzde: kefeGrup4AgirlikYuzde,
      aktif: kefeGrup4Aktif
    },
    {
      isim: kefeGrup5Isim,
      adet: kefeGrup5ToplamAdet,
      agirlik: kefeGrup5ToplamAgirlik,
      ortAgirlik: kefeGrup5OrtalamaAgirlik,
      adetYuzde: kefeGrup5AdetYuzde,
      agirlikYuzde: kefeGrup5AgirlikYuzde,
      aktif: kefeGrup5Aktif
    },
    {
      isim: kefeGrup6Isim,
      adet: kefeGrup6ToplamAdet,
      agirlik: kefeGrup6ToplamAgirlik,
      ortAgirlik: kefeGrup6OrtalamaAgirlik,
      adetYuzde: kefeGrup6AdetYuzde,
      agirlikYuzde: kefeGrup6AgirlikYuzde,
      aktif: kefeGrup6Aktif
    },
    {
      isim: kefeGrup7Isim,
      adet: kefeGrup7ToplamAdet,
      agirlik: kefeGrup7ToplamAgirlik,
      ortAgirlik: kefeGrup7OrtalamaAgirlik,
      adetYuzde: kefeGrup7AdetYuzde,
      agirlikYuzde: kefeGrup7AgirlikYuzde,
      aktif: kefeGrup7Aktif
    },
    {
      isim: kefeGrup8Isim,
      adet: kefeGrup8ToplamAdet,
      agirlik: kefeGrup8ToplamAgirlik,
      ortAgirlik: kefeGrup8OrtalamaAgirlik,
      adetYuzde: kefeGrup8AdetYuzde,
      agirlikYuzde: kefeGrup8AgirlikYuzde,
      aktif: kefeGrup8Aktif
    },
    {
      isim: kefeGrup9Isim,
      adet: kefeGrup9ToplamAdet,
      agirlik: kefeGrup9ToplamAgirlik,
      ortAgirlik: kefeGrup9OrtalamaAgirlik,
      adetYuzde: kefeGrup9AdetYuzde,
      agirlikYuzde: kefeGrup9AgirlikYuzde,
      aktif: kefeGrup9Aktif
    },
    {
      isim: kefeGrup10Isim,
      adet: kefeGrup10ToplamAdet,
      agirlik: kefeGrup10ToplamAgirlik,
      ortAgirlik: kefeGrup10OrtalamaAgirlik,
      adetYuzde: kefeGrup10AdetYuzde,
      agirlikYuzde: kefeGrup10AgirlikYuzde,
      aktif: kefeGrup10Aktif
    },
    {
      isim: kefeGrup11Isim,
      adet: kefeGrup11ToplamAdet,
      agirlik: kefeGrup11ToplamAgirlik,
      ortAgirlik: kefeGrup11OrtalamaAgirlik,
      adetYuzde: kefeGrup11AdetYuzde,
      agirlikYuzde: kefeGrup11AgirlikYuzde,
      aktif: kefeGrup11Aktif
    },
    {
      isim: kefeGrup12Isim,
      adet: kefeGrup12ToplamAdet,
      agirlik: kefeGrup12ToplamAgirlik,
      ortAgirlik: kefeGrup12OrtalamaAgirlik,
      adetYuzde: kefeGrup12AdetYuzde,
      agirlikYuzde: kefeGrup12AgirlikYuzde,
      aktif: kefeGrup12Aktif
    }
  ];

  useEffect(() => {
    if (recipes) {
      const match = recipes.find((r) => r.receteAdi === receteAdiHMI);
      if (match) {
        setSelectedRecipe(match);
      }
    }
  }, [recipes, receteAdiHMI]);

  const formatFromString = (val) => {
    if (val === '' || val === null || val === undefined) return '-'; // Boşsa eksi çizgi
    const num = Number(val.toString().replace(',', '.')); // Noktalı formatı destekle
    return isNaN(num)
      ? '-'
      : num.toLocaleString('tr-TR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        });
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <Grid item xs={6}>
        <Box
          sx={{
            position: 'relative',
            mb: 1,
            borderBottom: '2px solid white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <Brodcast size="32" color={serverOnline.toString().toLowerCase() === 'true' ? 'lime' : 'red'} />
          </Box>
        </Box>

        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid container spacing={1} mt={1} mb={1}>
            <Grid item xs={6}>
              <Typography ml={0.5}>Lot No</Typography>
              <TextField fullWidth value={logNoHMI} size="large" InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={6}>
              <Typography ml={0.5}>Reçete Seçimi</Typography>
              <Autocomplete
                fullWidth
                size="large"
                options={recipes}
                getOptionLabel={(option) => option.receteAdi || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                value={selectedRecipe}
                onChange={(event, newValue) => {
                  setSelectedRecipe(newValue);
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <Typography ml={0.5}>Çiftlik Adı</Typography>
              <TextField fullWidth value={ciftlikAdiHMI} size="large" InputProps={{ readOnly: true }} />
            </Grid> */}
          </Grid>

          {/* <Grid container>
            <Grid item xs={6}>
              <Autocomplete
                fullWidth
                options={recipes}
                getOptionLabel={(option) => option.receteAdi || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Reçete Seçimi" variant="outlined" />}
                value={selectedRecipe}
                onChange={(event, newValue) => {
                  setSelectedRecipe(newValue);
                }}
              />
            </Grid>
          </Grid> */}

          <Grid item display={'flex'} justifyContent={'end'} alignItems={'center'} mb={1} xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1, backgroundColor: '#261FB3' }}
              onClick={() => {
                if (selectedRecipe) {
                  setOpenSendRecipe(true);
                } else {
                  toast.error('Reçete Seçimi Yapınız');
                }
              }}
              size="large"
            >
              Reçete Gönder
            </Button>
          </Grid>
        </Grid>

        <Table component={Paper} size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>İsim</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Adet</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ağırlık</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ort.Ağırlık</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Adet %</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ağırlık %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grupVerileri.map((grup, index) => {
              if (grup.aktif.toString().toLowerCase() === 'true') {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{grup.isim}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{grup.adet}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.agirlik)} kg</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.ortAgirlik)} gr</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.adetYuzde)} %</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatFromString(grup.agirlikYuzde)} %</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Adet Bilgileri</strong>
              </Typography>
              <Typography variant="body2">Toplam Adet: {toplamAdet}</Typography>
              <Typography variant="body2">Net Adet: {netAdet}</Typography>
              <Typography variant="body2">Red Adet: {redAdet}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Ağırlık Bilgileri</strong>
              </Typography>
              <Typography variant="body2">Toplam Ağırlık: {formatFromString(toplamAgirlik)} kg</Typography>
              <Typography variant="body2">Net Ağırlık: {formatFromString(netAgirlik)} kg</Typography>
              <Typography variant="body2">Red Ağırlık: {formatFromString(redAgirlik)} kg</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Yüzdelik Bilgiler</strong>
              </Typography>
              <Typography variant="body2">Net Ağırlık Yüzdesi: {formatFromString(netAgirlikYuzde)} %</Typography>
              <Typography variant="body2">Red Ağırlık Yüzdesi: {formatFromString(redAgirlikYuzde)} %</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#1e1e2f', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid white' }}>
                <strong>Ortalama Ağırlık</strong>
              </Typography>
              <Typography variant="body2">Ortalama Net Ağırlık: {formatFromString(ortalamaNetAgirlik)} kg</Typography>
              <Typography variant="body2">Ortalama Toplam Ağırlık: {formatFromString(ortalamaToplamAgirlik)} kg</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {openSendRecipe && (
        <SanalSendRecipeToast openModal={openSendRecipe} setOpenModal={setOpenSendRecipe} selectedRecipe={selectedRecipe} plcNo={1} />
      )}
    </>
  );
};

export default GirisBoylamaTable;
