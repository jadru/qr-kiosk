import { API_URL } from '@src/constants';
import { generalApihandleError, generalApiHeaderConfig } from '@src/utils';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { orderListState } from '@src/states/atom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams, NavigateFunction } from 'react-router-dom';
import { MenuItemType } from '@src/type';

const orderdetail: string = '/order-detail';
const { VITE_APP_TOSS_CLIENT_KEY, VITE_APP_URL } = import.meta.env;

export const tosspaymentAPI = async (
  orderList: MenuItemType[],
  totalprice: number,
  navigate: NavigateFunction,
  storeId?: string,
  tableId?: string,
) => {
  const tosspayments = await loadTossPayments(VITE_APP_TOSS_CLIENT_KEY);
  tosspayments
    .requestPayment('카드', {
      amount: totalprice,
      orderId: uuidv4(),
      orderName: orderList[0].name + '외 ' + orderList.length + '건',
      successUrl: `${VITE_APP_URL}/${storeId}/${tableId}/order/success`,
      failUrl: `${VITE_APP_URL}/${storeId}/${tableId}/order`,
    })
    .then((res) => {
      navigate(`/${storeId}/${tableId}/success`);
    })
    .catch(function (error) {
      if (error.code === 'USER_CANCEL') {
        alert('결제를 취소하였습니다');
        navigate(`/${storeId}/${tableId}/order`);
      } else {
        alert('결제에 실패하였습니다');
        navigate(`/${storeId}/${tableId}/order`);
      }
    });
};

export const orderdetailAPI = (
  orderList: MenuItemType[],
  totalprice: number,
  storeId?: string,
) => {
  axios.post(
    API_URL + orderdetail,
    {
      order_name: orderList[0].name,
      total_amout: totalprice,
      owner_id: storeId,
    },
    {
      headers: generalApiHeaderConfig,
    },
  );
};
export const tossstatusAPI = (id: string, status: string) => {
  axios
    .patch(API_URL + orderdetail + '/' + id + '/toss-status', {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};
