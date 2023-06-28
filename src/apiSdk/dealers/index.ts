import axios from 'axios';
import queryString from 'query-string';
import { DealerInterface, DealerGetQueryInterface } from 'interfaces/dealer';
import { GetQueryInterface } from '../../interfaces';

export const getDealers = async (query?: DealerGetQueryInterface) => {
  const response = await axios.get(`/api/dealers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDealer = async (dealer: DealerInterface) => {
  const response = await axios.post('/api/dealers', dealer);
  return response.data;
};

export const updateDealerById = async (id: string, dealer: DealerInterface) => {
  const response = await axios.put(`/api/dealers/${id}`, dealer);
  return response.data;
};

export const getDealerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dealers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDealerById = async (id: string) => {
  const response = await axios.delete(`/api/dealers/${id}`);
  return response.data;
};
