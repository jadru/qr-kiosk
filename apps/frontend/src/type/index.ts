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

export type { ContentType, MenuListType, MenuListCategoryType };
