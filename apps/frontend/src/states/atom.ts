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
  default: {
    menuList1: {
      name: '',
      menuItem: [
        {
          image: [],
          itemid: '',
          itemname: '',
          itemprice: '',
        },
      ],
    },

    menuList2: {
      name: '',
      menuItem: [
        {
          image: [],
          itemid: '',
          itemname: '',
          itemprice: '',
        },
      ],
    },

    menuList3: {
      name: '',
      menuItem: [
        {
          image: [],
          itemid: '',
          itemname: '',
          itemprice: '',
        },
      ],
    },
  },
});

const storeManageState = atom({
  key: 'storeManage',
  default: {
    name: '', // string
    information: {
      address: '', // string
      openTime: '', // string
      phoneNumber: '', // string
      facilities: '', // string
      website: '', // string
      photos: ['', '', ''], // 사진 url 여러개
      theme: '', // antic, modren, vintage, simple
    },
    menu: [
      {
        categoryName: '', // string
        menus: [
          {
            id: '', // string
            name: '', // string
            photo: '', // string
            price: '', // number
          },
        ],
      },
    ],
  },
});

export { loginAtom, tokenAtom, menuDataState, storeManageState };
