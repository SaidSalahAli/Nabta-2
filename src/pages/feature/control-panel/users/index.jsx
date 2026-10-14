import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
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
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';

// project-imports
import MainCard from 'components/MainCard';
import { openSnackbar } from 'api/snackbar';
import {
  useGetUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  sendBulkEmail,
  sendBulkNotification
} from 'api/users';
import UserForm from 'sections/users/UserForm';

// assets
import { Sms, Notification, SearchNormal1, People, UserAdd, Edit, Trash } from 'iconsax-react';

// ==============================|| REGISTERED USERS MANAGEMENT ||==============================//

export default function UsersAdmin() {
  const { users: fetchedUsers = [], usersLoading, usersMutate } = useGetUsers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState([]);

  // Form Dialog States (Create / Edit)
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Dialog States
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
    firstName: user.FirstName ?? user.firstName ?? '',
    lastName: user.LastName ?? user.lastName ?? '',
    name: `${user.FirstName || ''} ${user.LastName || ''}`.trim() || user.Name || user.name || 'مستخدم غير معروف',
    email: user.Email ?? user.email ?? '',
    phone: user.Mobail ?? user.mobail ?? user.phone ?? '',
    date: user.DateRecord ?? user.date ?? new Date().toISOString(),
    isActive: Boolean(user.Status === true || user.status === 'نشط' || user.status === true || String(user.Status) === 'true'),
    raw: user
  }));

  // Search & Status filter
  const filteredUsers = mappedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(filteredUsers.map((n) => n.id));
      return;
    }
    setSelected([]);
  };

  const handleSelectUser = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Add / Edit User Actions
  const handleCreateUserClick = () => {
    setSelectedUser(null);
    setUserFormOpen(true);
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setUserFormOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (selectedUser?.id) {
        await updateUser(selectedUser.id, values);
        openSnackbar({
          open: true,
          message: 'تم تحديث بيانات المستخدم بنجاح',
          variant: 'alert',
          alert: { color: 'success' }
        });
      } else {
        await createUser(values);
        openSnackbar({
          open: true,
          message: 'تم إضافة المستخدم الجديد بنجاح وتفعيل حسابه',
          variant: 'alert',
          alert: { color: 'success' }
        });
      }
      usersMutate();
      setUserFormOpen(false);
      setSelectedUser(null);
    } catch (err) {
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ أثناء حفظ بيانات المستخدم',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Delete User Action
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      openSnackbar({
        open: true,
        message: 'تم حذف المستخدم بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      usersMutate();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (err) {
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ أثناء حذف المستخدم',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

  // Toggle user activation status
  const handleToggleStatus = async (user) => {
    const newStatus = !user.isActive;
    try {
      await toggleUserStatus(user.id, newStatus);
      openSnackbar({
        open: true,
        message: newStatus ? 'تم تفعيل حساب المستخدم بنجاح' : 'تم إيقاف تفعيل حساب المستخدم',
        variant: 'alert',
        alert: { color: 'success' }
      });
      usersMutate();
    } catch (err) {
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ أثناء تغيير حالة المستخدم',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

  // Bulk Email Dialog
  const handleOpenEmailDialog = () => {
    if (selected.length === 0) {
      openSnackbar({
        open: true,
        message: 'يرجى تحديد مستخدم واحد على الأقل لإرسال البريد',
        variant: 'alert',
        alert: { color: 'warning' }
      });
      return;
    }
    setEmailSubject('');
    setEmailBody('');
    setEmailDialogOpen(true);
  };

  const handleSendEmailSubmit = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      openSnackbar({
        open: true,
        message: 'يرجى كتابة عنوان ونص البريد الإلكتروني',
        variant: 'alert',
        alert: { color: 'error' }
      });
      return;
    }

    setEmailLoading(true);
    try {
      const res = await sendBulkEmail({
        userIds: selected,
        subject: emailSubject,
        body: emailBody
      });
      setEmailDialogOpen(false);
      setSelected([]);
      openSnackbar({
        open: true,
        message: res?.message || `تم إرسال البريد الإلكتروني إلى ${selected.length} مستخدم بنجاح`,
        variant: 'alert',
        alert: { color: 'success' }
      });
    } catch (err) {
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ أثناء إرسال البريد',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setEmailLoading(false);
    }
  };

  // Bulk Notification Dialog
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

  const handleSendNotiSubmit = async () => {
    if (!notiTitle.trim() || !notiBody.trim()) {
      openSnackbar({
        open: true,
        message: 'يرجى كتابة عنوان ونص الإشعار',
        variant: 'alert',
        alert: { color: 'error' }
      });
      return;
    }

    setNotiLoading(true);
    try {
      const res = await sendBulkNotification({
        userIds: selected,
        title: notiTitle,
        body: notiBody,
        platform: notiPlatform
      });
      setNotiDialogOpen(false);
      setSelected([]);
      openSnackbar({
        open: true,
        message: res?.message || `تم إرسال الإشعار إلى ${selected.length} مستخدم بنجاح`,
        variant: 'alert',
        alert: { color: 'success' }
      });
    } catch (err) {
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ أثناء إرسال الإشعار',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setNotiLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <People size={28} color="#3ca7b7" />
            <Typography variant="h4">إدارة المستخدمين المسجلين</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<UserAdd size={18} />}
              onClick={handleCreateUserClick}
              sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: '#2e8996' } }}
            >
              إضافة مستخدم جديد
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Sms size={18} />}
              onClick={handleOpenEmailDialog}
              disabled={selected.length === 0}
            >
              إرسال بريد ({selected.length})
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Notification size={18} />}
              onClick={handleOpenNotiDialog}
              disabled={selected.length === 0}
            >
              إرسال إشعار ({selected.length})
            </Button>
          </Stack>
        </Stack>
      </Grid>

      {/* Filter & Search */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField
                fullWidth
                placeholder="بحث بالاسم، البريد الإلكتروني أو رقم الهاتف..."
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
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                label="حالة الحساب"
              >
                <MenuItem value="all">جميع الحسابات</MenuItem>
                <MenuItem value="active">الحسابات النشطة فقط</MenuItem>
                <MenuItem value="inactive">الحسابات المعطلة فقط</MenuItem>
              </TextField>
            </Grid>
          </Grid>
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
                      inputProps={{ 'aria-label': 'تحديد الكل' }}
                    />
                  </TableCell>
                  <TableCell>الاسم</TableCell>
                  <TableCell>البريد الإلكتروني</TableCell>
                  <TableCell>رقم الهاتف</TableCell>
                  <TableCell align="center">تاريخ التسجيل</TableCell>
                  <TableCell align="center">تفعيل الحساب</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
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
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={() => handleSelectUser(user.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {user.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.email || '—'}
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
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Tooltip title={user.isActive ? 'تعطيل الحساب' : 'تفعيل الحساب'}>
                              <Switch
                                checked={user.isActive}
                                onChange={() => handleToggleStatus(user)}
                                color="success"
                                size="small"
                              />
                            </Tooltip>
                            <Chip
                              label={user.isActive ? 'نشط' : 'معطل'}
                              color={user.isActive ? 'success' : 'error'}
                              size="small"
                              variant="light"
                            />
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                            <Tooltip title="تعديل بيانات المستخدم">
                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                startIcon={<Edit size={16} />}
                                onClick={() => handleEditUserClick(user)}
                              >
                                تعديل
                              </Button>
                            </Tooltip>
                            <Tooltip title="حذف المستخدم">
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<Trash size={16} />}
                                onClick={() => handleDeleteClick(user)}
                              >
                                حذف
                              </Button>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="textSecondary">
                        لا يوجد مستخدمين مطابقين للبحث
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="عدد المستخدمين في الصفحة:"
          />
        </MainCard>
      </Grid>

      {/* User Form Dialog (Add / Edit) */}
      <Dialog open={userFormOpen} onClose={() => setUserFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد وتفعيل حسابه'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <UserForm
            user={selectedUser}
            onSubmit={handleFormSubmit}
            isLoading={formLoading}
            onCancel={() => setUserFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>تأكيد حذف المستخدم</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد من رغبتك في حذف حساب المستخدم &quot;{userToDelete?.name}&quot;؟ لن يتمكن المستخدم من تسجيل الدخول مرة أخرى.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            حذف الحساب
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Email Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>إرسال بريد إلكتروني للمستخدمين المحددين ({selected.length})</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2.5}>
            <TextField
              label="عنوان البريد الإلكتروني (Subject)"
              fullWidth
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="مثال: تحديثات جديدة وتطبيقات تعليمية بانتظارك"
            />
            <TextField
              label="محتوى الرسالة (Body)"
              multiline
              rows={5}
              fullWidth
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="اكتب نص الرسالة البريدية هنا..."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEmailDialogOpen(false)} color="secondary" disabled={emailLoading}>
            إلغاء
          </Button>
          <Button
            onClick={handleSendEmailSubmit}
            variant="contained"
            disabled={emailLoading}
            startIcon={emailLoading ? <CircularProgress size={16} color="inherit" /> : <Sms size={18} />}
            sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: '#2e8996' } }}
          >
            {emailLoading ? 'جاري الإرسال...' : 'إرسال البريد الآن'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Notification Dialog */}
      <Dialog open={notiDialogOpen} onClose={() => setNotiDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>إرسال إشعار للمستخدمين المحددين ({selected.length})</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2.5}>
            <TextField
              label="عنوان الإشعار (Title)"
              fullWidth
              value={notiTitle}
              onChange={(e) => setNotiTitle(e.target.value)}
              placeholder="مثال: حلقة جديدة متوفرة الآن!"
            />
            <TextField
              label="نص الإشعار (Body)"
              multiline
              rows={4}
              fullWidth
              value={notiBody}
              onChange={(e) => setNotiBody(e.target.value)}
              placeholder="اكتب نص الإشعار الذي سيظهر للمستخدم..."
            />
            <FormControl fullWidth>
              <InputLabel id="noti-platform-label">المنصة المستهدفة</InputLabel>
              <Select
                labelId="noti-platform-label"
                value={notiPlatform}
                label="المنصة المستهدفة"
                onChange={(e) => setNotiPlatform(e.target.value)}
              >
                <MenuItem value="all">جميع المنصات (تطبيق + ويب)</MenuItem>
                <MenuItem value="mobile">تطبيق الهاتف فقط</MenuItem>
                <MenuItem value="web">الموقع الإلكتروني فقط</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setNotiDialogOpen(false)} color="secondary" disabled={notiLoading}>
            إلغاء
          </Button>
          <Button
            onClick={handleSendNotiSubmit}
            variant="contained"
            disabled={notiLoading}
            startIcon={notiLoading ? <CircularProgress size={16} color="inherit" /> : <Notification size={18} />}
            sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: '#2e8996' } }}
          >
            {notiLoading ? 'جاري إرسال الإشعار...' : 'إرسال الإشعار الآن'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
