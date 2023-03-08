import { API_URL } from '@src/constants';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import axios from 'axios';
import {
  MenuListCategoryType,
  MenuListType,
  StoreManageType,
  StoreManageTypeBack,
} from '@src/type';

const login: string = '/auth/login';
const signup: string = '/user';
const ownerifo: string = '/owner/';

type loginType = {
  username: string;
  password: string;
};
type signupType = {
  username: string;
  password: string;
  name: string;
};
const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const handleError = (error: any) => {
  if (error.response) {
  }
  console.log(error);
};
const loginAPI = (data: object, navigate: NavigateFunction) => {
  axios
    .post(API_URL + login, data, {
      data: data,
      headers: headerConfig,
    })
    .then((response) => {
      console.log(response.data.accessToken); // accessToken
      navigate('/owner/manage');
      window.alert('로그인 성공');
    })
    .catch((error) => {
      handleError(error);
    });
};
const signupAPI = (data: object, navigate: NavigateFunction) => {
  axios
    .post(API_URL + signup, data, {
      data: data,
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        navigate('/login');
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

const parseJson = (json: StoreManageTypeBack): StoreManageType => {
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
const OwnerInfoAPI = (
  setStore: SetterOrUpdater<StoreManageType>,
  owner_id?: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  axios
    .get(API_URL + ownerifo + owner_id, {
      headers: headerConfig,
    })
    .then((response) => {
      setStore(parseJson(response.data[0].information));
      setLoading && setLoading(false);
    })
    .catch((error) => {
      handleError(error);
    });
};
export { loginAPI, signupAPI, OwnerInfoAPI };
