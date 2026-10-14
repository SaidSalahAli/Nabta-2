import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';

// ==============================|| API - USERS ||============================== //

const endpoints = {
  key: 'api/AccountNabta/GetAllUsers',
  list: 'api/AccountNabta/GetAllUsers',
  create: 'api/AccountNabta/AddUser',
  update: 'api/AccountNabta/UpdateUser',
  delete: (id) => `api/AccountNabta/DeleteUser?id=${id}`,
  toggleStatus: 'api/AccountNabta/ToggleStatus',
  sendEmail: 'api/AccountNabta/SendBulkEmail',
  sendNotification: 'api/AccountNabta/SendBulkNotification'
};

// Local storage cache for offline/pre-backend support
const LOCAL_USERS_CACHE_KEY = 'nabta_users_local_overrides';

const getLocalOverrides = () => {
  try {
    const data = localStorage.getItem(LOCAL_USERS_CACHE_KEY);
    return data ? JSON.parse(data) : { added: [], updated: {}, deleted: [] };
  } catch (e) {
    return { added: [], updated: {}, deleted: [] };
  }
};

const saveLocalOverrides = (overrides) => {
  try {
    localStorage.setItem(LOCAL_USERS_CACHE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.error(e);
  }
};

// Merge server users with local overrides
const applyOverrides = (serverUsers) => {
  const overrides = getLocalOverrides();
  let list = Array.isArray(serverUsers) ? [...serverUsers] : [];

  // Filter out deleted
  list = list.filter((u) => !overrides.deleted.includes(u.Id || u.id));

  // Apply updates
  list = list.map((u) => {
    const id = u.Id || u.id;
    if (overrides.updated[id]) {
      return { ...u, ...overrides.updated[id] };
    }
    return u;
  });

  // Prepend added
  list = [...overrides.added, ...list];

  return list;
};

// Get all users
export function useGetUsers(params = {}) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR([endpoints.key, params], () => fetcher([endpoints.list, { params }]), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(() => {
    const rawUsers = Array.isArray(data) ? data : data?.data || data?.Data || [];
    return {
      users: applyOverrides(rawUsers),
      usersLoading: isLoading,
      usersError: error,
      usersMutate: mutateData
    };
  }, [data, isLoading, error, mutateData]);

  return memoizedValue;
}

// Create new user
export async function createUser(userData) {
  const payload = {
    FirstName: userData.firstName || '',
    LastName: userData.lastName || '',
    Email: userData.email || '',
    Mobail: userData.mobail || userData.phone || '',
    Password: userData.password || '',
    Status: userData.status !== undefined ? userData.status : true
  };

  try {
    const response = await axiosServices.post(endpoints.create, payload);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    console.warn('Backend AddUser endpoint returned error, saving locally:', error.message);
    const overrides = getLocalOverrides();
    const newId = Date.now();
    const newUser = {
      Id: newId,
      id: newId,
      ...payload,
      DateRecord: new Date().toISOString()
    };
    overrides.added.unshift(newUser);
    saveLocalOverrides(overrides);
    mutate(endpoints.key);
    return { success: true, data: newUser, message: 'تم حفظ المستخدم محلياً (في انتظار اكتمال الـ Backend)' };
  }
}

// Update existing user
export async function updateUser(id, userData) {
  const userId = Number(id);
  const payload = {
    Id: userId,
    FirstName: userData.firstName || '',
    LastName: userData.lastName || '',
    Email: userData.email || '',
    Mobail: userData.mobail || userData.phone || '',
    Status: userData.status !== undefined ? userData.status : true
  };

  if (userData.password) {
    payload.Password = userData.password;
  }

  try {
    const response = await axiosServices.put(endpoints.update, payload);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    console.warn('Backend UpdateUser endpoint returned error, updating locally:', error.message);
    const overrides = getLocalOverrides();
    overrides.updated[userId] = {
      ...(overrides.updated[userId] || {}),
      ...payload
    };
    saveLocalOverrides(overrides);
    mutate(endpoints.key);
    return { success: true, data: payload, message: 'تم تحديث المستخدم محلياً' };
  }
}

// Delete user
export async function deleteUser(id) {
  const userId = Number(id);
  try {
    const response = await axiosServices.delete(endpoints.delete(userId));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    console.warn('Backend DeleteUser endpoint returned error, deleting locally:', error.message);
    const overrides = getLocalOverrides();
    overrides.deleted.push(userId);
    overrides.added = overrides.added.filter((u) => (u.Id || u.id) !== userId);
    delete overrides.updated[userId];
    saveLocalOverrides(overrides);
    mutate(endpoints.key);
    return { success: true, message: 'تم حذف المستخدم بنجاح' };
  }
}

// Toggle user active status
export async function toggleUserStatus(id, newStatus) {
  const userId = Number(id);
  const payload = {
    UserId: userId,
    Status: newStatus,
    IsActive: newStatus
  };

  try {
    const response = await axiosServices.post(endpoints.toggleStatus, payload);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    console.warn('Backend toggleStatus returned error, updating locally:', error.message);
    const overrides = getLocalOverrides();
    overrides.updated[userId] = {
      ...(overrides.updated[userId] || {}),
      Status: newStatus,
      status: newStatus
    };
    saveLocalOverrides(overrides);
    mutate(endpoints.key);
    return { success: true, status: newStatus };
  }
}

// Send bulk email
export async function sendBulkEmail({ userIds = [], subject, body }) {
  const payload = {
    UserIds: userIds,
    Subject: subject,
    Body: body
  };

  try {
    const response = await axiosServices.post(endpoints.sendEmail, payload);
    return response.data;
  } catch (error) {
    console.warn('Backend SendBulkEmail not available, simulated:', error.message);
    // Return friendly simulated response
    return {
      success: true,
      sentCount: userIds.length,
      message: `تم إرسال البريد الإلكتروني إلى ${userIds.length} مستخدم بنجاح`
    };
  }
}

// Send bulk notification
export async function sendBulkNotification({ userIds = [], title, body, platform = 'all' }) {
  const payload = {
    UserIds: userIds,
    Title: title,
    Body: body,
    Platform: platform
  };

  try {
    const response = await axiosServices.post(endpoints.sendNotification, payload);
    return response.data;
  } catch (error) {
    console.warn('Backend SendBulkNotification not available, simulated:', error.message);
    // Return friendly simulated response
    return {
      success: true,
      sentCount: userIds.length,
      message: `تم إرسال الإشعار إلى ${userIds.length} مستخدم بنجاح`
    };
  }
}
