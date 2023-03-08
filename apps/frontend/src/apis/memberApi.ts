import { API_URL } from '@src/constants';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';
import { generalApihandleError, generalApiHeaderConfig } from '@src/utils';
import { createOwnerApiType } from '@src/type';

const login: string = '/auth/login';
const signup: string = '/owner/create';
const userCreate: string = '/user';

type loginType = {
  username: string;
  password: string;
};

type signupType = {
  username: string;
  password: string;
  name: string;
};

const loginAPI = (data: object, navigate: NavigateFunction) => {
  axios
    .post(API_URL + login, data, {
      data: data,
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      console.log(response.data.accessToken); // accessToken
      navigate('/owner/manage');
      window.alert('로그인 성공');
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

const signupAPI = (data: createOwnerApiType, navigate: NavigateFunction) => {
  axios
    .post(API_URL + signup, data, {
      data: { ...data },
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      alert('회원가입 완료');
      navigate('/login');
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

const createUserApi = (): string | undefined => {
  axios
    .post(API_URL + userCreate, {
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      return response.data.accessToken;
    })
    .catch((error) => {
      generalApihandleError(error);
      return undefined;
    });
  return undefined;
};

export { loginAPI, signupAPI, createUserApi };
