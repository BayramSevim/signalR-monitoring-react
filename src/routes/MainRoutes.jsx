import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));

// Sayfalar burada
const BoylamaMainScreen = Loadable(lazy(() => import('pages/MainPage/Boylama/MainScreen')));
const BoylamaDashboardPage = Loadable(lazy(() => import('pages/Dashboard/Boylama/DashboardPage')));
const TeraziDashboardPage = Loadable(lazy(() => import('pages/Dashboard/Terazi/DashboardPage')));
const BoylamaEtiketIslemleri = Loadable(lazy(() => import('pages/EtiketIslemleri/Boylama/EtiketIslemleri')));
const TeraziEtiketIslemleri = Loadable(lazy(() => import('pages/EtiketIslemleri/Terazi/EtiketIslemleri')));
const BoylamaBarkodTipleri = Loadable(lazy(() => import('pages/DigerIslemler/BarkodTipleri/Boylama/BarkodTipleri')));
const TeraziBarkodTipleri = Loadable(lazy(() => import('pages/DigerIslemler/BarkodTipleri/Terazi/BarkodTipleri')));
const BoylamaMakinalar = Loadable(lazy(() => import('pages/DigerIslemler/Makinalar/Boylama/Makinalar')));
const TeraziMakinalar = Loadable(lazy(() => import('pages/DigerIslemler/Makinalar/Terazi/Makinalar')));
const BoylamaYazicilar = Loadable(lazy(() => import('pages/DigerIslemler/Yazicilar/Boylama/Yazicilar')));
const TeraziYazicilar = Loadable(lazy(() => import('pages/DigerIslemler/Yazicilar/Terazi/Yazicilar')));
const KullaniciIslemleri = Loadable(lazy(() => import('pages/KullaniciIslemleri/KullaniciIslemleri')));
const BoylamaReceteIslemleri = Loadable(lazy(() => import('pages/ReceteIslemleri/Boylama/ReceteIslemleri')));
const BoylamaLotIslemleri = Loadable(lazy(() => import('pages/LotIslemleri/Boylama/LotIslemleri')));
const ProductReport = Loadable(lazy(() => import('pages/Reports/ProductReport/ProductReport')));
const KoliReport = Loadable(lazy(() => import('pages/Reports/KoliReport/KoliReport')));
const SanalPage = Loadable(lazy(() => import('pages/SanalPage/SanalPage')));
const Godex = Loadable(lazy(() => import('pages/Godex/Godex')));
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'boylama/anasayfa',
          element: <BoylamaMainScreen />
        },
        {
          path: 'boylama/sanal-boylama',
          element: <SanalPage />
        },
        {
          path: 'boylama/urun-islemleri',
          element: <BoylamaDashboardPage />
        },
        {
          path: 'boylama/etiket-islemleri',
          element: <BoylamaEtiketIslemleri />
        },
        {
          path: 'boylama/recete-islemleri',
          element: <BoylamaReceteIslemleri />
        },
        {
          path: 'boylama/lot-islemleri',
          element: <BoylamaLotIslemleri />
        },
        {
          path: 'boylama/barkod-tipleri',
          element: <BoylamaBarkodTipleri />
        },
        {
          path: 'boylama/makinalar',
          element: <BoylamaMakinalar />
        },
        {
          path: 'boylama/yazicilar',
          element: <BoylamaYazicilar />
        },
        {
          path: 'boylama/',
          children: [
            {
              path: 'uretim-raporu',
              element: <ProductReport />
            },
            {
              path: 'koli-raporu',
              element: <KoliReport />
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'terazi/urun-islemleri',
          element: <TeraziDashboardPage />
        },
        {
          path: 'terazi/etiket-islemleri',
          element: <TeraziEtiketIslemleri />
        },
        {
          path: 'terazi/barkod-tipleri',
          element: <TeraziBarkodTipleri />
        },
        {
          path: 'terazi/makinalar',
          element: <TeraziMakinalar />
        },
        {
          path: 'terazi/yazicilar',
          element: <TeraziYazicilar />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'kullanici-islemleri',
          element: <KullaniciIslemleri />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'godex-etiket-detaylari',
          element: <Godex />
        }
      ]
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;
