import { StoreManageType } from '@src/type';
import { atom } from 'recoil';

const loginAtom = atom({
  key: 'loginAtom',
  default: { username: 'unknown', password: 'unknown' },
});

const tokenAtom = atom({
  key: 'tokenAtom',
  default: 'a',
});
const menuDataState = atom({
  key: 'menuData',
  default: [
    {
      categoryName: 'Category 1',
      menus: [
        {
          image: '/example.jpg',
          itemid: 'example1',
          itemname: 'Example Menu 1',
          itemprice: '3000',
        },
      ],
    },
  ],
});

const storeManageState = atom<StoreManageType>({
  key: 'storeManage',
  default: {
    name: '가게명', // string
    information: {
      address: '주소광역시 무슨구 어떤동 어떤로 70', // string
      openTime: '연중무휴', // string
      phoneNumber: '010-3333-4444', // string
      facilities: '남여 화장실, 장애인 이용 가능', // string
      website: 'www.instagram.com/helloworld', // string
      photos: ['/example.jpg', '/example.jpg', 'example.jpg'], // 사진 url 여러개
      theme: 'simple', // antic, modren, vintage, simple
    },
    menu: [
      {
        categoryName: 'Category 1',
        menus: [
          {
            image: '/example.jpg',
            itemid: 'example1',
            itemname: 'Example Menu 1',
            itemprice: '3000',
          },
        ],
      },
    ],
  },
});
// name: '가게명', // string
// information: {
//   address: '주소광역시 무슨구 어떤동 어떤로 70', // string
//   openTime: '연중무휴', // string
//   phoneNumber: '010-3333-4444', // string
//   facilities: '남여 화장실, 장애인 이용 가능', // string
//   website: 'www.instagram.com/helloworld', // string
//   photos: ['/example.jpg', '/example.jpg', 'example.jpg'], // 사진 url 여러개
//   theme: 'simple', // antic, modren, vintage, simple
// },
// menu: [
//   {
//     categoryName: 'Category 1',
//     menus: [
//       {
//         image: '/example.jpg',
//         itemid: 'example1',
//         itemname: 'Example Menu 1',
//         itemprice: '3000',
//       },
//     ],
//   },
// ],
// },

const orderListState = atom({
  key: 'orderList',
  default: [],
});

const orderPlaceState = atom({
  key: 'orderPlace',
  default: {
    storeId: 'default',
    tableId: '2',
  },
});

const successedOrderState = atom({
  key: 'successedOrder',
  default: [
    {
      orderid: 'aaa',
      itemlist: [],
      totalprice: 1000,
      ordertime: '2023-03-08T01:35:03+09:00',
    },
  ],
});

const countedOrderListState = atom({
  key: 'countedOrderList',
  default: [],
});

export {
  loginAtom,
  tokenAtom,
  menuDataState,
  storeManageState,
  orderListState,
  orderPlaceState,
  successedOrderState,
  countedOrderListState,
};
