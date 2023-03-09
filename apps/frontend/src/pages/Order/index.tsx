import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  CuteTheme,
  ModernTheme,
  SimpleTheme,
  VintageTheme,
} from '@src/components';
import {
  orderListState,
  orderPlaceState,
  storeManageState,
} from '@src/states/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { OwnerInfoAPI } from '@src/apis/storeOwnerApi';
import { Cookies, useCookies } from 'react-cookie';
import { createUserApi } from '@src/apis/memberApi';
import { calculateTotalPriceFromOrderList } from '@src/utils';

export const Order = () => {
  const [loading, setLoading] = useState(false);
  const { storeId, tableId } = useParams();
  const [user_id, setUserId] = useState('');
  const [store, setStore] = useRecoilState(storeManageState);
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const navigate = useNavigate();

  const cookie = new Cookies();

  useLayoutEffect(() => {
    OwnerInfoAPI(setStore, storeId, setLoading);
    if (!cookie.get('user_id')) {
      createUserApi(setUserId);
    }
  }, []);

  useEffect(() => {
    user_id !== '' && cookie.set('user_id', user_id, { path: '/' });
  }, [user_id]);

  return !loading ? (
    <>
      {(store.information.theme === 'simple' && (
        <SimpleTheme onOrderButtonClick={setOrderList} />
      )) ||
        (store.information.theme === 'vintage' && (
          <VintageTheme onOrderButtonClick={setOrderList} />
        )) ||
        (store.information.theme === 'modern' && (
          <ModernTheme onOrderButtonClick={setOrderList} />
        )) || <CuteTheme onOrderButtonClick={setOrderList} />}
      <div className="h-16"></div>
      <div className="btm-nav content-between">
        <Link
          to={`/${storeId}/${tableId}/order/list`}
          className="text-xl btn-accent"
        >
          이전 주문
        </Link>
        <button
          onClick={() => {
            navigate(`/${storeId}/${tableId}/order/confirm`);
          }}
          className="text-xl btn-primary"
          disabled={calculateTotalPriceFromOrderList(orderList) === 0}
        >
          {orderList.length}개 {' : '}
          {calculateTotalPriceFromOrderList(orderList).toLocaleString('en')}원
          장바구니
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};
