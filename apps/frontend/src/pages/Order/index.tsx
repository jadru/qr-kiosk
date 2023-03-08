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
import { OwnerInfoAPI } from '@src/apis/api';

export const Order = () => {
  const { storeId, tableId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [store, setStore] = useRecoilState(storeManageState);
  const setStoreInfo = useSetRecoilState(orderPlaceState);
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    OwnerInfoAPI(setStore, storeId, setLoading);
  }, []);

  useEffect(() => {
    console.log(store);
  }, [store]);

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
          disabled={
            orderList
              // @ts-ignore
              .reduce((prev, curr) => prev + Number(curr.itemprice), 0) === 0
          }
        >
          {orderList.length}개 {' : '}
          {orderList
            // @ts-ignore
            .reduce((prev, curr) => prev + Number(curr.itemprice), 0)
            .toLocaleString('en')}
          원 장바구니
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};
