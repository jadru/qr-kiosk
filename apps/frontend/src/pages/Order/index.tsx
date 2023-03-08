import React, { useEffect, useLayoutEffect } from 'react';
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
import { useCookies } from 'react-cookie';
import { createUserApi } from '@src/apis/memberApi';
import { calculateTotalPriceFromOrderList } from '@src/utils';

export const Order = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const { storeId, tableId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [store, setStore] = useRecoilState(storeManageState);
  const setStoreInfo = useSetRecoilState(orderPlaceState);
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const navigate = useNavigate();

  // useLayoutEffect(() => {
  //   // OwnerInfoAPI(setStore, storeId, setLoading);
  //   if (!(cookies && cookies.user)) {
  //     const userId = createUserApi();
  //     userId && setCookie('user', userId, { path: '/', maxAge: 3600 });
  //   }
  // }, []);

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
