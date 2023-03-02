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
    menuList: [
      {
        menuname: '',
        menuprice: '',
      },
    ],
  },
});

export { loginAtom, tokenAtom, menuDataState };
