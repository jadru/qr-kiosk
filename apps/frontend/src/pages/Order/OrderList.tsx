import {
  countedOrderListState,
  orderListState,
  orderPlaceState,
} from '@src/states/atom';
import { CountedItem, CountedItemList, Item } from '@src/type/Item';
import { cloneDeep } from 'lodash';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

const { VITE_APP_TOSS_CLIENT_KEY } = import.meta.env;

export const OrderList = () => {
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const [countedOrderList, setCountedOrderList] = useRecoilState(
    countedOrderListState,
  );
  const [totalprice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const storeValue = useRecoilValue(orderPlaceState);

  useEffect(() => {
    setCountedOrderList(
      orderList.reduce((acc: any, cur: any) => {
        const found = acc.find((a: any) => a.itemid === cur.itemid);
        if (found) found.count += 1;
        else acc.push({ ...cur, count: 1 });
        return acc;
      }, []),
    );
    setTotalPrice(
      orderList
        // @ts-ignore
        .reduce((prev, curr) => prev + Number(curr.itemprice), 0),
    );
    if (
      orderList
        // @ts-ignore
        .reduce((prev, curr) => prev + Number(curr.itemprice), 0) === 0
    ) {
      navigate('/order');
    }
    console.log(orderList);
  }, [orderList]);

  const tosspayment = async () => {
    const tossPayments = await loadTossPayments(VITE_APP_TOSS_CLIENT_KEY);
    tossPayments
      .requestPayment('카드', {
        amount: totalprice,
        orderId: uuidv4(),
        // @ts-ignore
        orderName: orderList[0].itemname + ' 외 ' + orderList.length + '건',
        successUrl: 'http://localhost:3000/order/success',
        failUrl: 'http://localhost:3000',
      })
      .then((res) => {
        navigate('/order/success');
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          alert('결제를 취소하셨습니다.');
          navigate('/order');
        } else {
          alert('결제에 실패하였습니다.');
          navigate('/order');
        }
      });
  };

  const minusItem = (item: Item) => {
    const tempOrderList: Item[] = cloneDeep(orderList);
    const index = tempOrderList.findIndex(
      (value) => value.itemid === item.itemid,
    );
    tempOrderList.splice(index, 1);
    // @ts-ignore
    setOrderList(tempOrderList);
  };
  const plusItem = (item: Item) => {
    const tempOrderList: Item[] = cloneDeep(orderList);
    tempOrderList.push(item);
    // @ts-ignore
    setOrderList(tempOrderList);
  };

  return (
    <div className="w-full h-screen p-6 space-y-4 bg-slate-100">
      <h1 className="text-center text-2xl font-medium">주문 목록</h1>
      <div className="space-y-2">
        {countedOrderList.map(
          (value: CountedItem) =>
            value.count && (
              <div
                className="rounded-2xl bg-white flex justify-between items-center"
                key={value.itemid}
              >
                <p className="text-xl font-normal ml-6">{value.itemname}</p>
                <div className="flex flex-row items-center space-x-4">
                  <div>
                    <p className="text-xl font-semibold">
                      {value.count}개 X{' '}
                      {parseFloat(value.itemprice).toLocaleString('en')}원 ={' '}
                      {(
                        parseFloat(value.itemprice) * value.count
                      ).toLocaleString('en')}
                      원
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="btn text-xl  rounded-b-none rounded-l-none btn-outline"
                      onClick={() => plusItem(value)}
                    >
                      +
                    </button>
                    <button
                      className="btn text-xl rounded-t-none rounded-l-none btn-outline"
                      onClick={() => minusItem(value)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
      <p className="text-center text-2xl mt-6">
        {storeValue.tableId}번 테이블로 주문합니다
      </p>
      <div className="btm-nav content-between">
        <Link className="btn-secondary text-xl" to={'/order'}>
          추가 주문
        </Link>
        <button
          className="btn-primary text-xl"
          onClick={tosspayment}
          disabled={totalprice === 0}
        >
          <>{totalprice.toLocaleString('en')}원 주문하기</>
        </button>
      </div>
    </div>
  );
};
