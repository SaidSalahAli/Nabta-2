import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

// project-imports
import MainCard from 'components/MainCard';
import { openSnackbar } from 'api/snackbar';
import { useGetUsers } from 'api/users';

// assets
import { Sms, Notification, SearchNormal1, People } from 'iconsax-react';

// ==============================|| REGISTERED USERS MANAGEMENT ||==============================//

export default function UsersAdmin() {
  const { users: fetchedUsers = [], usersLoading } = useGetUsers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);

  // Send Email Dialog States
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Send Notification Dialog States
  const [notiDialogOpen, setNotiDialogOpen] = useState(false);
  const [notiTitle, setNotiTitle] = useState('');
  const [notiBody, setNotiBody] = useState('');
  const [notiPlatform, setNotiPlatform] = useState('all');
  const [notiLoading, setNotiLoading] = useState(false);

  if (usersLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  const mappedUsers = fetchedUsers.map((user) => ({
    id: user.Id ?? user.id,
    name: `${user.FirstName || ''} ${user.LastName || ''}`.trim() || user.Name || 'مستخدم غير معروف',
    email: user.Email ?? user.email,
    phone: user.Mobail ?? user.phone ?? '',
    date: user.DateRecord ?? user.date ?? new Date().toISOString(),
    status: (user.Status === true || user.status === 'نشط' || String(user.Status) === 'true') ? 'نشط' : 'غير نشط'
  }));

  // Search filter
  const filteredUsers = mappedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Checkbox functions
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Actions trigger
  const handleOpenEmailDialog = () => {
    if (selected.length === 0) {
      openSnackbar({
        open: true,
        message: 'يرجى تحديد مستخدم واحد على الأقل لإرسال الإيميل',
        variant: 'alert',
        alert: { color: 'warning' }
      });
      return;
    }
    setEmailSubject('');
    setEmailBody('');
    setEmailDialogOpen(true);
  };

  const handleOpenNotiDialog = () => {
    if (selected.length === 0) {
      openSnackbar({
        open: true,
        message: 'يرجى تحديد مستخدم واحد على الأقل لإرسال الإشعار',
        variant: 'alert',
        alert: { color: 'warning' }
      });
      return;
    }
    setNotiTitle('');
    setNotiBody('');
    setNotiPlatform('all');
    setNotiDialogOpen(true);
  };

  // Submit bulk email (Mock call)
  const handleSendEmailSubmit = () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      openSnackbar({
        open: true,
        message: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'alert',
        alert: { color: 'error' }
      });
      return;
    }

    setEmailLoading(true);
    // Simulate API request
    setTimeout(() => {
      setEmailLoading(false);
      setEmailDialogOpen(false);
      setSelected([]);
      openSnackbar({
        open: true,
        message: `تم إرسال البريد الإلكتروني الجماعي بنجاح إلى ${selected.length} مستخدم`,
        variant: 'alert',
        alert: { color: 'success' }
      });
    }, 1500);
  };

  // Submit bulk notification (Mock call)
  const handleSendNotiSubmit = () => {
    if (!notiTitle.trim() || !notiBody.trim()) {
      openSnackbar({
        open: true,
        message: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'alert',
        alert: { color: 'error' }
      });
      return;
    }

    setNotiLoading(true);
    // Simulate API request
    setTimeout(() => {
      setNotiLoading(false);
      setNotiDialogOpen(false);
      setSelected([]);
      openSnackbar({
        open: true,
        message: `تم إرسال الإشعار الجماعي بنجاح إلى ${selected.length} مستخدم`,
        variant: 'alert',
        alert: { color: 'success' }
      });
    }, 1500);
  };

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <People size={28} style={{ color: '#3ca7b7' }} />
            <Typography variant="h4">المستخدمين المسجلين</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Sms size={18} />}
              onClick={handleOpenEmailDialog}
              disabled={selected.length === 0}
              sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              إرسال إيميل جماعي ({selected.length})
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Notification size={18} />}
              onClick={handleOpenNotiDialog}
              disabled={selected.length === 0}
              sx={{ bgcolor: '#5b6b79', '&:hover': { bgcolor: '#46535e' } }}
            >
              إرسال إشعار جماعي ({selected.length})
            </Button>
          </Stack>
        </Stack>
      </Grid>

      {/* Search */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TextField
            fullWidth
            placeholder="بحث عن مستخدم بالاسم، البريد الإلكتروني أو الهاتف..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            slotProps={{
              input: {
                startAdornment: <SearchNormal1 size={18} style={{ marginRight: 8, color: '#9e9e9e' }} />
              }
            }}
          />
        </MainCard>
      </Grid>

      {/* Table */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                      checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'تحديد جميع المستخدمين' }}
                    />
                  </TableCell>
                  <TableCell>الاسم</TableCell>
                  <TableCell>البريد الإلكتروني</TableCell>
                  <TableCell>رقم الهاتف</TableCell>
                  <TableCell align="center">تاريخ التسجيل</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => {
                    const isItemSelected = isSelected(user.id);
                    return (
                      <TableRow
                        key={user.id}
                        hover
                        onClick={(event) => handleClick(event, user.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {user.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.phone || '—'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="caption" color="text.secondary">
                            {new Date(user.date).toLocaleDateString('ar-EG')}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              bgcolor: user.status === 'نشط' ? 'success.lighter' : 'error.lighter',
                              color: user.status === 'نشط' ? 'success.main' : 'error.main'
                            }}
                          >
                            {user.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="textSecondary">
                        لا توجد نتائج متطابقة للبحث
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </Grid>

      {/* Send Email Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Sms size={22} style={{ color: '#3ca7b7' }} />
          إرسال بريد إلكتروني جماعي
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
            سيتم إرسال هذا البريد إلى <strong style={{ color: '#3ca7b7' }}>{selected.length}</strong> مستخدم تم تحديدهم.
          </Typography>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="عنوان البريد الإلكتروني (الموضوع)"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="محتوى البريد الإلكتروني"
              multiline
              rows={6}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setEmailDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button
            onClick={handleSendEmailSubmit}
            variant="contained"
            disabled={emailLoading}
            sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            {emailLoading ? 'جاري الإرسال...' : 'إرسال البريد'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send Notification Dialog */}
      <Dialog open={notiDialogOpen} onClose={() => setNotiDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Notification size={22} style={{ color: '#5b6b79' }} />
          إرسال إشعار جماعي
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
            سيتم إرسال هذا الإشعار إلى <strong style={{ color: '#5b6b79' }}>{selected.length}</strong> مستخدم تم تحديدهم.
          </Typography>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="noti-platform-label">منصة الإشعار</InputLabel>
              <Select
                labelId="noti-platform-label"
                value={notiPlatform}
                onChange={(e) => setNotiPlatform(e.target.value)}
                label="منصة الإشعار"
              >
                <MenuItem value="all">كل المنصات (All Platforms)</MenuItem>
                <MenuItem value="ios">تطبيق iOS فقط</MenuItem>
                <MenuItem value="android">تطبيق أندرويد فقط</MenuItem>
                <MenuItem value="web">الموقع الإلكتروني فقط</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="عنوان الإشعار"
              value={notiTitle}
              onChange={(e) => setNotiTitle(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="محتوى الإشعار"
              multiline
              rows={4}
              value={notiBody}
              onChange={(e) => setNotiBody(e.target.value)}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setNotiDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button
            onClick={handleSendNotiSubmit}
            variant="contained"
            disabled={notiLoading}
            sx={{ bgcolor: '#5b6b79', '&:hover': { bgcolor: '#46535e' } }}
          >
            {notiLoading ? 'جاري الإرسال...' : 'إرسال الإشعار'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
