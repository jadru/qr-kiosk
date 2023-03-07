import { successedOrderState } from '@src/states/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

export const LastOrder = () => {
  const orderList = useRecoilValue(successedOrderState);
  console.log(orderList);
  return (
    <div className="w-full h-screen bg-slate-100 p-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-center text-2xl font-medium mb-6">주문 목록</h1>
        <div className="space-y-2">
          {orderList.map((order: any) => (
            <div
              tabIndex={0}
              className="border border-base-300 bg-white rounded-box py-5 px-7"
              key={order.orderid}
            >
              <p>주문번호 : {order.orderid}</p>
              <p>{order.orderName}</p>
              <p className="text-lg font-semibold">
                {parseFloat(order.totalprice).toLocaleString('en')}원
              </p>
              <p>주문시간 : {new Date(order.ordertime).toLocaleString('ko')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
