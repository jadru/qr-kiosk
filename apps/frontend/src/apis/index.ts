import { API_URL } from '@src/constants';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import axios from 'axios';

const login: string = '/login';
const signup: string = '/user';

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
    console.log(error.message);
  }
};
const loginAPI = (data: loginType, navigate: NavigateFunction) => {
  axios
    .post(API_URL + login, null, {
      params: data,
      headers: headerConfig,
    })
    .then((response) => {
      navigate('/store-management');
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
export { loginAPI, signupAPI };
