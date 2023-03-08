import {
  countedOrderListState,
  orderListState,
  orderPlaceState,
  storeManageState,
} from '@src/states/atom';
import { CountedItem, Item } from '@src/type/Item';
import { cloneDeep } from 'lodash';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { calculateTotalPriceFromOrderList } from '@src/utils';
import { orderdetailAPI, tosspaymentAPI } from '@src/apis/paymentApi';

export const OrderList = () => {
  const { storeId, tableId } = useParams();
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const [store, setStore] = useRecoilState(storeManageState);
  const [countedOrderList, setCountedOrderList] = useRecoilState(
    countedOrderListState,
  );
  const [totalprice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const storeValue = useRecoilValue(orderPlaceState);

  useEffect(() => {
    setCountedOrderList(
      orderList.reduce((acc: any, cur: any) => {
        const found = acc.find((a: any) => a.item_id === cur.item_id);
        if (found) found.count += 1;
        else acc.push({ ...cur, count: 1 });
        return acc;
      }, []),
    );
    setTotalPrice(calculateTotalPriceFromOrderList(orderList));
    if (calculateTotalPriceFromOrderList(orderList) === 0) {
      navigate(`/${storeId}/${tableId}/order`);
    }
    console.log(countedOrderList);
  }, [orderList]);

  const tosspayment = async () => {
    const orderId = uuidv4();
    await tosspaymentAPI(
      orderList,
      totalprice,
      navigate,
      orderId,
      storeId,
      tableId,
    );
    orderdetailAPI(
      orderList,
      totalprice,
      countedOrderList,
      orderId,
      tableId,
      storeId,
    );
  };

  const minusItem = (item: Item) => {
    const tempOrderList: Item[] = cloneDeep(orderList);
    const index = tempOrderList.findIndex(
      (value) => value.item_id === item.item_id,
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
                key={value.item_id}
              >
                <p className="text-xl font-normal ml-6">{value.name}</p>
                <div className="flex flex-row items-center space-x-4">
                  <div>
                    <p className="text-xl font-semibold">
                      {value.count}개 X{' '}
                      {parseFloat(value.price).toLocaleString('en')}원 ={' '}
                      {(parseFloat(value.price) * value.count).toLocaleString(
                        'en',
                      )}
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
        <Link
          className="btn-secondary text-xl"
          to={`/${storeId}/${tableId}/order`}
        >
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
