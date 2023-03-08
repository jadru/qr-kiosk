import { StoreManageTypeBack, StoreManageType } from '@src/type';
import { Cookies } from 'react-cookie';

export const generalApiHeaderConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const generalApihandleError = (error: any) => {
  console.log(error);
};

export const calculateTotalPriceFromOrderList = (
  orderList: never[],
): number => {
  // @ts-ignore
  return orderList.reduce((prev, curr) => prev + Number(curr.price), 0);
};

export const tokenAccessProtected = () => {
  const cookie = new Cookies();
  const token = cookie.get('token');
  if (token && token !== '') {
    return false;
  } else {
    return true;
  }
};

export const parseJson = (json: StoreManageTypeBack): StoreManageType => {
  return {
    name: json.store_name,
    information: {
      address: json.store_address,
      openTime: json.store_operating_time,
      phoneNumber: json.store_phone,
      facilities: json.facility,
      website: json.website,
      photo: json.photo,
      theme: json.theme,
    },
    menu: json.menu
      ? json.menu.map((category) => {
          return {
            categoryName: category.category_name,
            menus: category.menu_items
              ? category.menu_items.map((menuitem) => {
                  return {
                    image_url: menuitem.image_url,
                    item_id: menuitem.id,
                    name: menuitem.name,
                    price: menuitem.price,
                  };
                })
              : [],
          };
        })
      : [],
  };
};

export const parseFromFrontJson = (
  json: StoreManageType,
): StoreManageTypeBack => {
  return {
    store_name: json.name,
    store_address: json.information.address,
    store_operating_time: json.information.openTime,
    store_phone: json.information.phoneNumber,
    facility: json.information.facilities,
    website: json.information.website,
    photo: json.information.photo,
    theme: json.information.theme,
    menu: json.menu.map((category) => {
      return {
        category_name: category.categoryName,
      };
    }),
  };
};
