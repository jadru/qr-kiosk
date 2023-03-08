import { userOrderListApi } from '@src/apis/orderManage';
import { successedOrderState } from '@src/states/atom';
import { orderDetailType } from '@src/type';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const LastOrder = () => {
  const { storeId, tableId } = useParams();
  const [orderList, setOrderList] = useState<orderDetailType[]>([
    {
      order_name: '',
      total_amount: 0,
      toss_status: 'string',
      order_status: 'done',
      approveAt: 'string',
      requestAt: 'string',
      owner_id: 0,
      id: 0,
      table_number: 0,
      user_id: '0;',
      item_orders: [
        {
          count: 0,
          menu_item_id: 0,
        },
      ],
    },
  ]);
  const cookie = new Cookies();
  useEffect(() => {
    userOrderListApi(cookie.get('user_id'), setOrderList);
  }, []);
  return (
    <div className="w-full h-screen bg-slate-100 p-6 space-y-4 mbr-16">
      <div className="flex flex-col space-y-2">
        <h1 className="text-center text-2xl font-medium mb-6">주문 목록</h1>
        <div className="space-y-2">
          {orderList.map((order: any) => (
            <div
              tabIndex={0}
              className="border border-base-300 bg-white rounded-box py-5 px-7"
              key={order.orderid}
            >
              <p>주문번호 : {order.id}</p>
              <p>{order.order_name}</p>
              <p className="text-lg font-semibold">
                {order.total_amount.toLocaleString('en')}원
              </p>
              <p>주문시간 : {new Date(order.approveAt).toLocaleString('ko')}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="btm-nav content-between">
        <Link
          className="btn-primary text-xl"
          to={`/${storeId}/${tableId}/order`}
        >
          주문하기
        </Link>
      </div>
    </div>
  );
};
