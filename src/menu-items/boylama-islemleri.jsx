// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  Home,
  DocumentCode2,
  PresentionChart,
  Chart1,
  ScanBarcode,
  CpuSetting,
  Printer,
  Archive,
  Barcode,
  ArrowRight3,
  Box1,
  Activity
} from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  product: Chart1,
  barcode: ScanBarcode,
  machine: CpuSetting,
  printer: Printer,
  home: Home,
  label: Archive,
  recipe: Barcode,
  lot: ArrowRight3,
  report: PresentionChart,
  koli: Box1,
  boylama: Activity
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const digerIslemler = {
  id: 'boylama',
  title: <FormattedMessage id="boylama" />,
  type: 'group',
  icon: icons.boylama,
  children: [
    {
      id: 'boylama',
      title: <FormattedMessage id="boylama" />,
      type: 'collapse',
      children: [
        {
          id: 'boylama-anasayfa',
          title: <FormattedMessage id="boylama-anasayfa" />,
          type: 'item',
          url: '/boylama/anasayfa',
          icon: icons.home,
          target: false
        },
        {
          id: 'sanal-boylama',
          title: <FormattedMessage id="sanal-boylama" />,
          type: 'item',
          url: '/boylama/sanal-boylama',
          icon: icons.boylama,
          target: false
        },
        {
          id: 'dashboard',
          title: <FormattedMessage id="dashboard" />,
          type: 'item',
          url: '/boylama/urun-islemleri',
          icon: icons.product,
          target: false
        },
        {
          id: 'etiket-islemleri',
          title: <FormattedMessage id="etiket-islemleri" />,
          type: 'item',
          url: '/boylama/etiket-islemleri',
          icon: icons.label,
          target: false
        },
        {
          id: 'receteler',
          title: <FormattedMessage id="receteler" />,
          type: 'item',
          url: '/boylama/recete-islemleri',
          icon: icons.recipe,
          target: false
        },
        {
          id: 'lot-islemleri',
          title: <FormattedMessage id="lot-islemleri" />,
          type: 'item',
          url: '/boylama/lot-islemleri',
          icon: icons.lot,
          target: false
        },
        {
          id: 'barkod-tipleri',
          title: <FormattedMessage id="barkod-tipleri" />,
          type: 'item',
          url: '/boylama/barkod-tipleri',
          icon: icons.barcode,
          target: false
        },
        {
          id: 'makinalar',
          title: <FormattedMessage id="makinalar" />,
          type: 'item',
          url: '/boylama/makinalar',
          icon: icons.machine,
          target: false
        },
        {
          id: 'raporlar',
          title: <FormattedMessage id="raporlar" />,
          type: 'collapse',
          icon: icons.report,
          children: [
            {
              id: 'uretim-raporu',
              title: <FormattedMessage id="uretim-raporu" />,
              type: 'item',
              url: '/boylama/uretim-raporu',
              icon: icons.product,
              target: false
            },
            {
              id: 'koli-raporu',
              title: <FormattedMessage id="koli-raporu" />,
              type: 'item',
              url: '/boylama/koli-raporu',
              icon: icons.koli,
              target: false
            }
          ]
        }
      ]
    }
  ]
};

export default digerIslemler;
