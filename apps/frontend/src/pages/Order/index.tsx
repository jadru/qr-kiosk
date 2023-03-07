import React, { useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';

export const Order = () => {
  const store = useRecoilValue(storeManageState);
  const setStoreInfo = useSetRecoilState(orderPlaceState);
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const navigate = useNavigate();
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let storeId = params.get('storeId');
    let tableId = params.get('tableId');
    !storeId || !tableId
      ? setStoreInfo({ storeId: 'default', tableId: '0' })
      : setStoreInfo({ storeId, tableId });
  }, [window.location.search]);

  return (
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
        <Link to={'/order/list'} className="text-xl btn-accent">
          이전 주문
        </Link>
        <button
          onClick={() => {
            navigate('/order/confirm');
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
  );
};
