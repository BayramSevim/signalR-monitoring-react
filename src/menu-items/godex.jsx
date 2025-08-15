// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { User, DocumentCode2, Chart1, Archive } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  Home: Chart1,
  label: Archive,
  user: User
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const kullaniciIslemleri = {
  id: 'godex-etiket-detaylari',
  title: <FormattedMessage id="godex-etiket-detaylari" />,
  type: 'group',
  // url: '/sample-page',
  url: '/godex-etiket-detaylari',
  icon: icons.label
};

export default kullaniciIslemleri;
