import { ReactNode } from 'react';

type ContentType = {
  children: ReactNode;
  className?: string;
};

type MenuListType = {
  categoryName: string;
  menus: {
    image: string;
    itemid: string;
    itemname: string;
    itemprice: string;
  }[];
}[];

type MenuListCategoryType = {
  categoryName: string;
  menus: {
    image: string;
    itemid: string;
    itemname: string;
    itemprice: string;
  }[];
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
  menu: [
    {
      categoryName: string;
      menus: [
        {
          itemid: string;
          itemname: string;
          image: string;
          itemprice: string;
        },
      ];
    },
  ];
};

export type {
  ContentType,
  MenuListType,
  MenuListCategoryType,
  StoreManageType,
};
