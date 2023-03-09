import React from 'react';
import {
  generalApihandleError,
  generalApiHeaderConfig,
} from './../utils/index';
import { API_URL } from '@src/constants';
import axios from 'axios';
import { orderDetailType, orderStatusType } from '@src/type';

const orderdetail = '/order-detail';

export const orderStatusChangeAPi = (
  id: string,
  status: string,
  statusKor: string,
): orderStatusType | undefined => {
  axios
    .patch(
      API_URL + orderdetail + '/' + id + '/order-status',
      {},
      {
        params: { status },
      },
    )
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

export const imageUploadApi = async (images: File[], setImageUrl: string[]) => {
  const formData = new FormData();
  images.forEach((element) => {
    formData.append('images', element);
  });
  await axios
    .post(API_URL + '/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response.data.data.files);
      response.data.data.files.forEach((element: string) => {
        setImageUrl.push(element.replace(/\"/gi, ''));
      });
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

export const userOrderListApi = (
  userId: string,
  setOrderList: React.Dispatch<React.SetStateAction<orderDetailType[]>>,
) => {
  axios
    .get(API_URL + orderdetail + '/user/' + userId, {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      setOrderList(response.data);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
  return [];
};

export const ownerOrderListApi = (
  ownerId: string,
  setOrderList: React.Dispatch<React.SetStateAction<orderDetailType[]>>,
) => {
  axios
    .get(API_URL + orderdetail + '/owner/' + ownerId, {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      setOrderList(response.data);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};
