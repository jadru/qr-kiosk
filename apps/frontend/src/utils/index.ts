import { StoreManageTypeBack, StoreManageType } from '@src/type';

export const parseJson = (json: StoreManageTypeBack): StoreManageType => {
  return {
    name: json.store_name,
    information: {
      address: json.store_address,
      openTime: json.store_operating_time,
      phoneNumber: json.store_phone,
      facilities: json.facilities,
      website: json.website,
      photos: json.photos,
      theme: json.theme,
    },
    menu: Object.values(json.menu).map((category) => {
      return {
        categoryName: category.category_name,
        menus: category.menu.map((menuitem) => {
          return {
            image: menuitem.photo,
            itemid: menuitem.itemid,
            itemname: menuitem.name,
            itemprice: menuitem.price,
          };
        }),
      };
    }),
  };
};

export const generalApiHeaderConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const generalApihandleError = (error: any) => {
  console.log(error);
};
