import { ReactNode } from 'react';

type ContentType = {
  children: ReactNode;
  className?: string;
};

type MenuItemType = {
  image: string;
  itemid: string;
  itemname: string;
  itemprice: string;
};

type CountedMenuItemListType = {
  image: string;
  itemid: string;
  itemname: string;
  itemprice: string;
  count: number;
}[];

type MenuListType = {
  categoryName: string;
  menus: MenuItemType[];
}[];

type MenuListCategoryType = {
  categoryName: string;
  menus: MenuItemType[];
};

type StoreManageType = {
  name: string;
  information: {
    address: string;
    openTime: string;
    phoneNumber: string;
    facilities: string;
    website: string;
    photos: string[];
    theme: 'cute' | 'modern' | 'vintage' | 'simple';
  };
  menu: MenuListType;
};

type StoreManageTypeBack = {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  store_name: string;
  store_address: string;
  store_phone: string;
  store_operating_time: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  facilities: string;
  website: string;
  photos: string[];
  theme: 'cute' | 'modern' | 'vintage' | 'simple';
  menu: {
    0: {
      push: any;
      id: number;
      category_name: string;
      owner_id: number;
      createTime: string;
      updateTime: string;
      menu: [
        {
          id: number;
          itemid: string;
          photo: string;
          price: string;
          name: string;
          menu_id: number;
          createdTime: string;
          updatedTime: string;
        },
      ];
    };
  };
};

type createOwnerApiType = {
  username: string;
  password: string;
  passwordCheck?: string;
  email: string;
  store_phone: string;
  store_address: string;
  store_operating_time: string;
  store_name: string;
  theme: 'cute' | 'modern' | 'vintage' | 'simple';
};

type orderStatusType = 'order' | 'confirm' | 'cancel' | 'done';

type orderDetailType = {
  order_name: string;
  total_amount: number;
  toss_status?: string;
  order_status?: orderStatusType;
  approveAt?: Date | string;
  requestAt?: Date | string;
  owner_id: number;
  id: number;
  table_number: number;
  user_id: string;
  item_orders: {
    count: number;
    menu_item_id: number;
  }[];
};

type jwtdecodeType = {
  owner_id: number;
  username: string;
  exp: number;
  iat: number;
  nbf: number;
  iss: string;
  sub: string;
};

export type {
  ContentType,
  MenuListType,
  MenuListCategoryType,
  StoreManageType,
  StoreManageTypeBack,
  MenuItemType,
  CountedMenuItemListType,
  createOwnerApiType,
  orderStatusType,
  orderDetailType,
  jwtdecodeType,
};
