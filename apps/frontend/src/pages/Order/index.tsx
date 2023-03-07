import React, { useEffect } from 'react';
import {
  CuteTheme,
  ModernTheme,
  SimpleTheme,
  VintageTheme,
} from '@src/components';
import { orderListState, storeManageState } from '@src/states/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

export const Order = () => {
  const store = useRecoilValue(storeManageState);
  const [orderList, setOrderList] = useRecoilState(orderListState);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let storeId = params.get('store');
    let tableId = params.get('tableId');
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
      <div className="btm-nav content-between">
        <p className="text-xl font-bold">담긴 음식 {orderList.length}개</p>
        <p className="text-xl font-bold">
          총 가격{' '}
          {orderList
            // @ts-ignore
            .reduce((prev, curr) => prev + Number(curr.itemprice), 0)
            .toLocaleString('en')}
          원
        </p>
        <Link to="confirm" className="btn-primary">
          <button>주문 확인하기</button>
        </Link>
      </div>
    </>
  );
};
