import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';

// ==============================|| API - CONTACT MESSAGES ||============================== //

const endpoints = {
  key: 'api/ContactMessages/List',
  list: 'api/ContactMessages/List',
  create: 'api/ContactMessages/Add',
  read: (id) => `api/ContactMessages/Get/${id}`,
  update: (id) => `api/ContactMessages/Update/${id}`,
  delete: (id) => `api/ContactMessages/Delete/${id}`,
  search: (name, email, status) => {
    let url = `api/ContactMessages/Search?name=${name || ''}`;
    if (email) url += `&email=${email}`;
    if (status) url += `&status=${status}`;
    return url;
  }
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

// Get single contact message
export function useGetContactMessage(id) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR(id ? [endpoints.read(id)] : null, () => fetcher(endpoints.read(id)), {
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
    const response = await axiosServices.post(endpoints.create, messageData);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating message');
  }
}

// Update contact message
export async function updateContactMessage(id, messageData) {
  try {
    const response = await axiosServices.put(endpoints.update(id), messageData);
    mutate(endpoints.key);
    mutate(endpoints.read(id));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating message');
  }
}

// Delete contact message
export async function deleteContactMessage(id) {
  try {
    const response = await axiosServices.delete(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting message');
  }
}

// Search contact messages
export async function searchContactMessages(name, email, status) {
  try {
    const response = await axiosServices.get(endpoints.search(name, email, status));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error searching messages');
  }
}
