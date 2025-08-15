// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home, DocumentCode2, Box, Chart1 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  Home: Chart1,
  box: Box
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage = {
  id: 'dashboard',
  title: <FormattedMessage id="dashboard" />,
  type: 'group',
  // url: '/sample-page',
  url: '/dashboard',
  icon: icons.box
};

export default samplePage;
