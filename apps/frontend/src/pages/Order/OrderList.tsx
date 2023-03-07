import { orderListState } from '@src/states/atom';
import { CountedItem, CountedItemList, Item } from '@src/type/Item';
import { cloneDeep } from 'lodash';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const { VITE_APP_TOSS_CLIENT_KEY } = import.meta.env;

export const OrderList = () => {
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const [countedOrderList, setCountedOrderList] =
    useState<CountedItemList>(orderList);
  const [totalprice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCountedOrderList(
      countedOrderList.reduce((acc: any, cur: any) => {
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
  }, [orderList]);

  const tosspayment = async () => {
    const tossPayments = await loadTossPayments(VITE_APP_TOSS_CLIENT_KEY);
    tossPayments
      .requestPayment('카드', {
        amount: totalprice,
        //amount: totalAmount,
        orderId: uuidv4(),
        // @ts-ignore
        orderName: orderList[0].itemname + ' 외 ' + orderList.length + '건',
        //orderName: orderName+'외'+orderList[0].length+'건',
        successUrl: 'http://localhost:3000/order/success',
        failUrl: 'http://localhost:3000',
      })
      .then((res) => {
        alert('결제가 완료되었습니다.');
        console.log(res);
        navigate('/order/success');
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          alert('결제를 취소하셨습니다.');
        } else {
          alert('결제에 실패하였습니다.');
        }
      });
  };

  return (
    <div className="w-full h-full p-6 space-y-4">
      <h1 className="text-center text-2xl font-medium">주문 목록</h1>
      <div className="space-y-2">
        {countedOrderList.map((value: CountedItem) => (
          <div
            className="rounded-2xl bg-slate-200 px-6 py-5 flex justify-between items-center"
            key={value.itemid}
          >
            <p className="text-xl font-normal">{value.itemname}</p>
            <div>
              <p className="text-lg font-semibold">
                {parseFloat(value.itemprice).toLocaleString('en')}원
              </p>
              <p>수량: {value.count}개</p>
            </div>
          </div>
        ))}
      </div>
      <div className="btm-nav content-between">
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
