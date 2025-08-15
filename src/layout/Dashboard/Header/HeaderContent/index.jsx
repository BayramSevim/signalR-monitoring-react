import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports

import MobileSection from './MobileSection';
import FullScreen from './FullScreen';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'components/@extended/IconButton';
import { Logout } from 'iconsax-react';
import ListItemIcon from '@mui/material/ListItemIcon';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();
  const navigate = useNavigate();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}

      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <FullScreen /> */}

      {/* <Grid item ml={1}>
        <Tooltip title="Çıkış Yap">
          <IconButton size="large" color="error" sx={{ p: 1 }} onClick={handleLogout}>
            <ListItemIcon>
              <Logout variant="Bulk" size={18} />
            </ListItemIcon>
          </IconButton>
        </Tooltip>
      </Grid> */}
      {/* {downLG && <MobileSection />} */}
    </>
  );
}
