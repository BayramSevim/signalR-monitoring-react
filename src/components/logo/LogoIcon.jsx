// material-ui
import { useTheme } from '@mui/material/styles';
// import Logo from '../../assets/images/Logo/GamaLogoBlack.png';
import Logo from '../../assets/images/Logo/HD.png';

export default function LogoIcon() {
  const theme = useTheme();

  return <img src={Logo} alt="" width={80} style={{ margin: '0px 0px 0px 0px' }} />;
}
