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
    menuList1: [
      {
        name: '',
        menuItem: [
          {
            image: '',
            menuid: '',
            menuname: '',
            menuprice: '',
          },
        ],
      },
    ],
    menuList2: [
      {
        name: '',
        menuItem: [
          {
            image: '',
            menuid: '',
            menuname: '',
            menuprice: '',
          },
        ],
      },
    ],
    menuList3: [
      {
        name: '',
        menuItem: [
          {
            image: '',
            menuid: '',
            menuname: '',
            menuprice: '',
          },
        ],
      },
    ],
  },
});

export { loginAtom, tokenAtom, menuDataState };
