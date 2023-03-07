import { orderListState } from '@src/states/atom';
import { Item } from '@src/type/Item';
import { useRecoilState } from 'recoil';

export const OrderList = () => {
  const [orderList, setOrderList] = useRecoilState(orderListState);
  return (
    <div>
      <h1>Order List</h1>
      {orderList.map((value: Item, index) => (
        <div>
          <p>{value.itemid}</p>
          <p>{value.itemname}</p>
          <p>{value.itemprice}</p>
        </div>
      ))}
      <p>총 가격</p>
      <p>
        {orderList
          // @ts-ignore
          .reduce((prev, curr) => prev + Number(curr.itemprice), 0)
          .toLocaleString('en')}
        원
      </p>
    </div>
  );
};
