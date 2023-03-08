import {
  generalApihandleError,
  generalApiHeaderConfig,
} from './../utils/index';
import { API_URL } from '@src/constants';
import axios from 'axios';
import { orderDetailType, orderStatusType } from '@src/type';

const orderdetail = '/order-detail';

const { VITE_APP_URL } = import.meta.env;

export const orderStatusChangeAPi = (
  id: string,
  status: string,
  statusKor: string,
): orderStatusType | undefined => {
  axios
    .patch(VITE_APP_URL + orderdetail + '/' + id + '/order-status', {
      status,
    })
    .then((response) => {
      alert(statusKor + '되었습니다.');
      return console.log(response.data.orderStatus);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
  return undefined;
};

export const orderGetAllApi = (): orderDetailType[] => {
  axios
    .get(API_URL + orderdetail, {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      generalApihandleError(error);
    });
  return [];
};

export const orderDetailDeleteAPi = (id: string) => {
  axios
    .delete(API_URL + orderdetail + '/' + id, {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};
