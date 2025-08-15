// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home, DocumentCode2, Chart1, Archive } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  Home: Chart1,
  label: Archive
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const etiketIslemleri = {
  id: 'etiket-islemleri',
  title: <FormattedMessage id="etiket-islemleri" />,
  type: 'group',
  // url: '/sample-page',
  url: '/etiket-islemleri',
  icon: icons.label
};

export default etiketIslemleri;
