import jwt_decode from 'jwt-decode';
import { API_URL } from '@src/constants';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';
import { generalApihandleError, generalApiHeaderConfig } from '@src/utils';
import { createOwnerApiType, jwtdecodeType } from '@src/type';
import { Cookies } from 'react-cookie';

const login: string = '/auth/login';
const signup: string = '/owner/create';
const userCreate: string = '/user';

type loginType = {
  username: string;
  password: string;
};

/** return accessToken string */
const loginAPI = (data: loginType, navigate: NavigateFunction) => {
  const cookies = new Cookies();
  axios
    .post(API_URL + login, data, {
      data: data,
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      const decodedToken: jwtdecodeType = jwt_decode(response.data.accessToken);
      cookies.set('token', response.data.accessToken, {
        path: '/',
        maxAge: decodedToken.exp - decodedToken.nbf,
      });
      cookies.set('owner_id', decodedToken.owner_id);
      navigate('/owner');
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

const signupAPI = (data: createOwnerApiType) => {
  axios
    .post(API_URL + signup, data, {
      data: { ...data },
      headers: generalApiHeaderConfig,
    })
    .then((response) => {
      alert('회원가입 완료');
    })
    .catch((error) => {
      generalApihandleError(error);
    });
};

/** accessToken을 리턴 */
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
