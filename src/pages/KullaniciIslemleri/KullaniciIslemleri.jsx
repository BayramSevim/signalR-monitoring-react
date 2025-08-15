import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Autocomplete,
  TableContainer
} from '@mui/material';
import MainCard from 'components/MainCard';
import Paper from '@mui/material/Paper';
import UpdateUserModal from 'components/Modals/Boylama/UpdateUserModal';
import AddUserModal from 'components/Modals/Boylama/AddUserModal';
import DeleteUserModal from 'components/Modals/Boylama/DeleteUserModal';
import { GetAPIUrl } from 'api/gama';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, CloseCircle, TickCircle, Magicpen } from 'iconsax-react';

export default function EtiketIslemleri() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [getUser, setGetUser] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  const fetchUser = async () => {
    await axios.get(`${GetAPIUrl()}/api/Authentication/GetUsers`).then((res) => {
      setGetUser(res.data);
    });
  };

  const toastMessage = (message, type) => {
    if (type === 1) toast.success(message);
    else if (type === 2) toast.error(message);
  };

  useEffect(() => {
    fetchUser();
    const user = JSON.parse(localStorage.getItem('loginnedUser'));
    setIsAdmin(user[0].isAdmin);
  }, []);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başlar
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <MainCard>
        <Grid display={'flex'} flexDirection={'row'} justifyContent={'start'} flexWrap={'wrap'}>
          <Typography fontSize={20} mb={1} fontWeight={'bold'}>
            Kullanıcı İşlemleri
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>Kullanıcı Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Şifre</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Oluşturulma Tarihi</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Güncellenme Tarihi</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Aktif</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getUser.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: selectUser.id === user.id ? '2px solid lime' : 'none'
                    }}
                    onClick={() => {
                      setSelectUser(user);
                    }}
                  >
                    <TableCell sx={{ textAlign: 'center' }}>{user.userName}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.password}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatDate(user.createdDate)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatDate(user.updatedDate)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {user.isActive ? <TickCircle size={30} color="lime" /> : <CloseCircle size={30} color="red" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid mt={6} display={'flex'} justifyContent={'flex-end'} padding={2} sx={{ display: isAdmin ? 'flex' : 'none' }}>
          <Grid item mr={1.2}>
            <Button
              variant="contained"
              color="warning"
              endIcon={<Magicpen size={32} />}
              onClick={() => {
                if (selectUser.length <= 0) toast.error('Lütfen Bir Kullanıcı Seçiniz');
                else setUpdateUser(true);
              }}
              sx={{ width: 250, height: 55 }}
            >
              Kullanıcı Güncelle
            </Button>
          </Grid>
          <Grid item mr={1.2}>
            <Button
              variant="contained"
              color="success"
              endIcon={<Add size={32} />}
              onClick={() => setAddUser(true)}
              sx={{ width: 250, height: 55 }}
            >
              Kullanıcı Ekle
            </Button>
          </Grid>
          <Grid item mr={1.2}>
            <Button
              variant="contained"
              color="error"
              endIcon={<CloseCircle size={32} />}
              onClick={() => {
                if (selectUser.length <= 0) toast.error('Lütfen Bir Kullanıcı Seçiniz');
                else setDeleteUser(true);
              }}
              sx={{ width: 250, height: 55 }}
            >
              Kullanıcı Sil
            </Button>
          </Grid>
        </Grid>
      </MainCard>
      {updateUser && (
        <UpdateUserModal
          openModal={updateUser}
          setOpenModal={setUpdateUser}
          selectUser={selectUser}
          refreshTable={fetchUser}
          toastMessage={toastMessage}
        />
      )}
      {addUser && <AddUserModal openModal={addUser} setOpenModal={setAddUser} refreshTable={fetchUser} toastMessage={toastMessage} />}
      {deleteUser && (
        <DeleteUserModal
          openModal={deleteUser}
          setOpenModal={setDeleteUser}
          selectUser={selectUser}
          refreshTable={fetchUser}
          toastMessage={toastMessage}
        />
      )}
    </>
  );
}
