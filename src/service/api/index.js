import * as axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
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
  return axiosInstance.post('/api/project/list', params);
};

export const upload = (payload) => {
  return axiosInstance.post('/api/upload', payload);
};

export const update = (payload) => {
  return axiosInstance.post('/api/file/update', payload);
};

export const getFile = (payload, responseType = '') => {
  return axiosInstance.post('/api/file/read', payload, {
    responseType,
  });
};

export const deletePj = (payload) => {
  return axiosInstance.post('/api/project/delete', payload);
};

export const getUser = (id) => {
  return axiosInstance.get(`/api/user/${id}`);
};

export const updateUser = (id, payload) => {
  return axiosInstance.post(`/api/user/update/${id}`, payload);
};

export const createPj = (params) => {
  return axiosInstance.post('/api/project', params);
};

export const simulate = (params) => {
  return axiosInstance.post('/api/simulate', params);
};
export const simulateLastest = (id) => {
  return axiosInstance.get(`/api/simulate/latest/${id}`);
};

export const readList = (payload) => {
  return axiosInstance.post('/api/file/list', payload);
};

export const downloadSimulation = (payload) => {
  const { fps, id } = payload;
  let config = {
    responseType: 'blob',
  };
  return axiosInstance.get(`/api/simulate/download/${id}?fps=${fps}`, config);
};

export const uploadFile = (payload) => {
  return axiosInstance.post('/api/file/create', payload);
};
