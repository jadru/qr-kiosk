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
    },
  }
  ];
};

export type {
  ContentType,
  MenuListType,
  MenuListCategoryType,
  StoreManageType,
  StoreManageTypeBack,
  MenuItemType,
};
