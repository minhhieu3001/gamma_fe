import * as axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const regist = (params) => {
  return axiosInstance.post('/api/register', params);
};

export const login = (params) => {
  return axiosInstance.post('/api/login', params);
};

export const list = (params) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.post('/api/project/list', params, config);
};

export const upload = (payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axiosInstance.post('/api/upload', payload, config);
};

export const update = (payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axiosInstance.post('/api/file/update', payload, config);
};

export const getFile = (payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.post('/api/file/read', payload, config);
};

export const deletePj = (payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.post('/api/project/delete', payload, config);
};

export const getUser = (id) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.get(`/api/user/${id}`, config);
};

export const updateUser = (id, payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.post(`/api/user/update/${id}`, payload, config);
};

export const createPj = (params) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  return axiosInstance.post('/api/project', params, config);
};

export const simulate = (params) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  return axiosInstance.post('/api/simulate', params, config);
};
export const simulateLastest = (id) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  return axiosInstance.get(`/api/simulate/latest/${id}`, config);
};

export const readList = (payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.post('/api/file/list', payload, config);
};

export const downloadSimulation = (payload) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return axiosInstance.post('/api/simulate/download', payload, config);
};
