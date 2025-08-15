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

const raporlar = {
  id: 'raporlar',
  title: <FormattedMessage id="raporlar" />,
  type: 'group',
  icon: icons.printer,
  children: [
    {
      id: 'raporlar',
      title: <FormattedMessage id="raporlar" />,
      type: 'collapse',
      children: [
        {
          id: 'uretim-raporlari',
          title: <FormattedMessage id="uretim-raporlari" />,
          type: 'item',
          url: '/boylama/uretim-raporlari',
          icon: icons.printer,
          target: false
        },
        {
          id: 'koli-raporlari',
          title: <FormattedMessage id="koli-raporlari" />,
          type: 'item',
          url: '/boylama/koli-raporlari',
          icon: icons.printer,
          target: false
        }
      ]
    }
  ]
};

export default raporlar;
