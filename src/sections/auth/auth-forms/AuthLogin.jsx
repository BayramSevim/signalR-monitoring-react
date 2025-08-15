import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { Eye, EyeSlash } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from 'components/Loader';

export default function AuthLogin({ forgot }) {
  const { isLoginError, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();

  const fetchUser = async (values) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      navigate('/boylama/anasayfa');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(true);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Kullanıcı Adı Gereklidir!'),
    password: Yup.string().required('Şifre Gereklidir!')
  });

  const theme = createTheme({
    palette: {
      customColor: {
        main: '#ff5722',
        contrastText: '#fff'
      }
    },
    typography: {
      button: {
        textTransform: 'none',
        fontWeight: '400'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '25px',
            border: 'none'
          }
        }
      }
    }
  });

  return (
    <>
      {loading && <Loader />}
      <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={fetchUser}>
        <Form noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isLoginError && (
                <Grid item mb={2} textAlign={'center'}>
                  <FormHelperText
                    error
                    style={{
                      fontSize: '14px',
                      textAlign: 'center',
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '10px 0px',
                      borderRadius: '5px'
                    }}
                  >
                    Hatalı kullanıcı adı veya şifre girişi!
                  </FormHelperText>
                </Grid>
              )}
              <Stack spacing={1}>
                <InputLabel htmlFor="username">Kullanıcı Adı *</InputLabel>

                {/* Formik'in context'ini kullanarak touched ve errors'a erişim */}
                <Field name="username">
                  {({ field, meta }) => (
                    <OutlinedInput
                      {...field}
                      fullWidth
                      id="username"
                      name="username"
                      error={meta.touched && Boolean(meta.error)} // Hata durumu için true/false
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: meta.touched && meta.error ? 'red' : 'default' // Hata varsa kırmızı, yoksa varsayılan
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: meta.touched && meta.error ? 'red' : 'gray' // Hover'da da kırmızı
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: meta.touched && meta.error ? 'red' : 'default' // Focus olduğunda
                        }
                      }}
                    />
                  )}
                </Field>

                {/* Hata mesajı */}
                <ErrorMessage style={{ color: 'red', fontSize: '12px' }} name="username" component="div" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password">Şifre *</InputLabel>

                {/* Formik'in context'ini kullanarak touched ve errors'a erişim */}
                <Field name="password">
                  {({ field, meta }) => (
                    <OutlinedInput
                      {...field}
                      fullWidth
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      error={meta.touched && Boolean(meta.error)} // Hata durumu için true/false
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: meta.touched && meta.error ? 'red' : 'default' // Hata varsa kırmızı, yoksa varsayılan
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: meta.touched && meta.error ? 'red' : 'gray' // Hover'da da kırmızı
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: meta.touched && meta.error ? 'red' : 'default' // Focus olduğunda
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <Eye /> : <EyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                </Field>

                {/* Hata mesajı */}
                <ErrorMessage style={{ color: 'red', fontSize: '12px' }} name="password" component="div" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" color="warning">
                    Giriş Yap
                  </Button>
                </AnimateButton>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { forgot: PropTypes.string };
