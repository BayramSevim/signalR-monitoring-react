// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home, DocumentCode2, Chart1, ScanBarcode, CpuSetting, Printer } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  Home: Chart1,
  barcode: ScanBarcode,
  machine: CpuSetting,
  printer: Printer
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const digerIslemler = {
  id: 'diger-islemler',
  title: <FormattedMessage id="diger-islemler" />,
  type: 'group',
  icon: icons.Home,
  children: [
    {
      id: 'diger-islemler',
      title: <FormattedMessage id="diger-islemler" />,
      type: 'collapse',
      children: [
        {
          id: 'barkod-tipleri',
          title: <FormattedMessage id="barkod-tipleri" />,
          type: 'item',
          url: '/diger-islemler/barkod-tipleri',
          icon: icons.barcode,
          target: false
        },
        {
          id: 'makinalar',
          title: <FormattedMessage id="makinalar" />,
          type: 'item',
          url: '/diger-islemler/makinalar',
          icon: icons.machine,
          target: false
        },
        {
          id: 'yazicilar',
          title: <FormattedMessage id="yazicilar" />,
          type: 'item',
          url: '/diger-islemler/yazicilar',
          icon: icons.printer,
          target: false
        }
      ]
    }
  ]
};

export default digerIslemler;
