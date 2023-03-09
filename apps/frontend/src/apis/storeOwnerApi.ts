import { parseFromFrontJson } from './../utils/index';
import { API_URL } from '@src/constants';
import { MenuItemType, StoreManageType, MenuListType } from '@src/type';
import {
  generalApihandleError,
  generalApiHeaderConfig,
  parseJson,
} from '@src/utils';
import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

const ownerifo: string = '/owner';

export const OwnerInfoAPI = (
  setStore: SetterOrUpdater<StoreManageType>,
  owner_id?: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  axios
    .get(API_URL + ownerifo + '/' + owner_id, {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      setStore(parseJson(response.data));
      setLoading && setLoading(false);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

export const patchStoreData = async (
  owner_id: number,
  storeManageData: StoreManageType,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  axios
    .patch(
      API_URL + ownerifo + '/' + owner_id + '/all',
      parseFromFrontJson(storeManageData),
      {
        headers: generalApiHeaderConfig,
      },
    )
    .then((response) => {
      storeManageData.menu.map((category) => {
        menuUpdateApi(
          owner_id.toString(),
          category.categoryName,
          category.menus,
        );
      });
      setLoading(false);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

export const menuUpdateApi = async (
  owner_id: string,
  categoru_name: string,
  menuItem: MenuItemType[],
) => {
  const tempData = menuItem.map((item) => {
    return {
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    };
  });
  axios
    .post(
      API_URL + '/menu-item/' + owner_id + '/' + categoru_name,
      {
        menu_items: tempData,
      },
      {
        headers: generalApiHeaderConfig,
      },
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};
