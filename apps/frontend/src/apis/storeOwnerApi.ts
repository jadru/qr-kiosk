import { API_URL } from '@src/constants';
import { StoreManageType } from '@src/type';
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
