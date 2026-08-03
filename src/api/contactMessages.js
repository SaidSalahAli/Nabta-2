import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';

// ==============================|| API - CONTACT MESSAGES ||============================== //

const endpoints = {
  key: 'api/ContactUs/List',
  list: 'api/ContactUs/List',
  create: 'api/ContactUs/Add',
  read: (id) => `api/ContactUs/ById?id=${id}`,
  update: 'api/ContactUs/Update',
  delete: (id) => `api/ContactUs/Delete?id=${id}`,
  search: (params = {}) => {
    let url = `api/ContactUs/Search?`;
    const queryParams = [];
    if (params.fullName) queryParams.push(`fullName=${encodeURIComponent(params.fullName)}`);
    if (params.email) queryParams.push(`email=${encodeURIComponent(params.email)}`);
    if (params.phone) queryParams.push(`phone=${encodeURIComponent(params.phone)}`);
    if (params.subject) queryParams.push(`subject=${encodeURIComponent(params.subject)}`);
    if (params.isRead !== undefined && params.isRead !== null) queryParams.push(`isRead=${params.isRead}`);
    return url + queryParams.join('&');
  }
};

const fetcherPost = async (url) => {
  const res = await axiosServices.post(url);
  return res.data;
};

// Get all contact messages
export function useGetContactMessages(params = {}) {
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

  const memoizedValue = useMemo(
    () => ({
      contactMessages: Array.isArray(data) ? data : data?.Data || data?.data || [],
      contactMessagesLoading: isLoading,
      contactMessagesError: error,
      contactMessagesMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Get single contact message (uses POST as per api specification)
export function useGetContactMessage(id) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR(id ? [endpoints.read(id)] : null, () => fetcherPost(endpoints.read(id)), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      contactMessage: data?.data || data?.Data || null,
      contactMessageLoading: isLoading,
      contactMessageError: error,
      contactMessageMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create contact message
export async function createContactMessage(messageData) {
  try {
    const payload = {
      fullName: messageData.fullName || messageData.name || '',
      FullName: messageData.fullName || messageData.name || '',
      email: messageData.email || '',
      Email: messageData.email || '',
      phone: messageData.phone || '',
      Phone: messageData.phone || '',
      subject: messageData.subject || '',
      Subject: messageData.subject || '',
      message: messageData.message || '',
      Message: messageData.message || ''
    };
    const response = await axiosServices.post(endpoints.create, payload);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating message');
  }
}

// Update contact message
export async function updateContactMessage(id, messageData) {
  try {
    const payload = {
      id: Number(id || messageData.id || messageData.Id),
      Id: Number(id || messageData.id || messageData.Id),
      fullName: messageData.fullName || messageData.name || messageData.Name || messageData.FullName || '',
      FullName: messageData.fullName || messageData.name || messageData.Name || messageData.FullName || '',
      email: messageData.email || messageData.Email || '',
      Email: messageData.email || messageData.Email || '',
      phone: messageData.phone || messageData.Phone || '',
      Phone: messageData.phone || messageData.Phone || '',
      subject: messageData.subject || messageData.Subject || '',
      Subject: messageData.subject || messageData.Subject || '',
      message: messageData.message || messageData.Message || '',
      Message: messageData.message || messageData.Message || '',
      isRead: messageData.isRead !== undefined ? messageData.isRead : (messageData.IsRead !== undefined ? messageData.IsRead : false),
      IsRead: messageData.isRead !== undefined ? messageData.isRead : (messageData.IsRead !== undefined ? messageData.IsRead : false)
    };
    const response = await axiosServices.put(endpoints.update, payload);
    mutate(endpoints.key);
    mutate(endpoints.read(id));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating message');
  }
}

// Delete contact message (uses POST as per api specification)
export async function deleteContactMessage(id) {
  try {
    const response = await axiosServices.post(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting message');
  }
}

// Search contact messages
export async function searchContactMessages(params = {}) {
  try {
    const url = endpoints.search(params);
    const response = await axiosServices.get(url);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error searching messages');
  }
}
