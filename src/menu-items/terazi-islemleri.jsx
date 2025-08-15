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
  Box1
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
  koli: Box1
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const digerIslemler = {
  id: 'terazi',
  title: <FormattedMessage id="terazi" />,
  type: 'group',
  icon: icons.Home,
  children: [
    {
      id: 'terazi',
      title: <FormattedMessage id="terazi" />,
      type: 'collapse',
      children: [
        {
          id: 'dashboard',
          title: <FormattedMessage id="dashboard" />,
          type: 'item',
          url: '/terazi/urun-islemleri',
          icon: icons.report,
          target: false
        },
        {
          id: 'etiket-islemleri',
          title: <FormattedMessage id="etiket-islemleri" />,
          type: 'item',
          url: '/terazi/etiket-islemleri',
          icon: icons.label,
          target: false
        },
        {
          id: 'barkod-tipleri',
          title: <FormattedMessage id="barkod-tipleri" />,
          type: 'item',
          url: '/terazi/barkod-tipleri',
          icon: icons.barcode,
          target: false
        },
        {
          id: 'makinalar',
          title: <FormattedMessage id="makinalar" />,
          type: 'item',
          url: '/terazi/makinalar',
          icon: icons.machine,
          target: false
        },
        {
          id: 'yazicilar',
          title: <FormattedMessage id="yazicilar" />,
          type: 'item',
          url: '/terazi/yazicilar',
          icon: icons.printer,
          target: false
        }
      ]
    }
  ]
};

export default digerIslemler;
