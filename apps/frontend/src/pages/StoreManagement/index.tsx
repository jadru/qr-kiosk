import { Route, Routes, useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React, { useEffect, useId, useState } from 'react';
import { Item } from '../../type/Item';
import { useRecoilState } from 'recoil';
import MenuList from '../../components/Menu/MenuList';
import { menuDataState, storeManageState } from '@src/states/atom';
import { StoreDialog } from './StoreDialog';
import {
  CuteTheme,
  ModernTheme,
  NormalLayout,
  SimpleTheme,
  VintageTheme,
} from '@src/components';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import { StoreInformationForm } from './StoreInformationForm';
import { QRcodeDialog } from './QRcodeDialog';
import { imageUploadApi } from '@src/apis/orderManage';
import { tokenAccessProtected } from '@src/utils';
import { OwnerInfoAPI, patchStoreData } from '@src/apis/storeOwnerApi';
import { Cookies } from 'react-cookie';
import { MenuItemType } from '@src/type';

let templateOfNewMenu = () => {
  return {
    name: '새 메뉴',
    price: 1000,
    image_url: '',
    item_id: Math.random() * 100,
  };
};

export const StoreManagement: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [storeMange, setStoreManage] = useRecoilState(storeManageState);
  const [saving, setSaving] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<MenuItemType>(templateOfNewMenu);
  const [mobile, setMobile] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('simple');

  const navigate = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    tokenAccessProtected() && navigate('/login');
  });

  useEffect(() => {
    OwnerInfoAPI(setStoreManage, cookie.get('owner_id'), setLoading);
  }, []);

  useEffect(() => {
    setTheme(storeMange.information.theme);
    console.log('storeMange', storeMange);
  }, [storeMange]);

  const onMobileToggleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMobile((prev) => !prev);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const imageUrls: string[] = [];
      await imageUploadApi([e.target.files[0]], imageUrls);
      await setNewMenu((prev) => {
        return { ...prev, image_url: imageUrls[0] };
      });
    } else {
      throw new Error('No Image File');
    }
  };

  const handleSubmit = async () => {
    let tempData = cloneDeep(storeMange);
    tempData.menu[0].menus.push({ ...newMenu });
    await setStoreManage(tempData);
    await setNewMenu(templateOfNewMenu);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add: MenuItemType;

    const temp = cloneDeep(storeMange);

    Array.apply(null, Array(temp.menu.length)).map((_value, index) => {
      if (source.droppableId === `menulist${index}`) {
        add = temp.menu[index].menus[source.index];
        temp.menu[index].menus.splice(source.index, 1);
      }
    });

    Array.apply(null, Array(temp.menu.length)).map((_value, index) => {
      if (destination.droppableId === `menulist${index}`) {
        temp.menu[index].menus.splice(destination.index, 0, { ...add });
      }
    });

    setStoreManage(temp);
  };

  const dumyCategoryData = {
    categoryName: '새 카테고리 ' + (storeMange.menu.length + 1),
    menus: [],
  };

  const onSaveButtonClick = async () => {
    await setSaving(true);
    await patchStoreData(cookie.get('owner_id'), storeMange, setSaving);
  };

  return !loading ? (
    storeMange && (
      <NormalLayout>
        <div className="flex w-full h-full space-x-3">
          <div className="grid h-20 flex-grow place-items-center w-1/4 space-y-2">
            <StoreInformationForm
              setTheme={setTheme}
              theme={theme}
              storeManage={storeMange}
              setStoreManage={setStoreManage}
              loading={loading}
            />
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="divider divider-horizontal"></div>
          <div className="w-2/4 flex flex-col self-center items-center space-y-4 z-50">
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <QRcodeDialog saving={saving} />
            <div className="form-control glass p-3 rounded-2xl sticky top-12 flex flex-row space-x-5">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">
                  {mobile ? '모바일 폰' : '데스크탑'}
                </span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={mobile}
                  onChange={onMobileToggleChange}
                />
              </label>
              <label
                htmlFor="my-modal-6"
                className="btn btn-md btn-outline"
                onClick={onSaveButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                저장
              </label>
            </div>
            <div
              className={`${
                mobile
                  ? 'mockup-phone shadow-2xl'
                  : 'w-full h-[85vh] bg-slate-100 scroll-mb-10'
              }`}
            >
              <div className={mobile ? 'camera' : ''}></div>
              <div className={mobile ? 'display' : ''}>
                <div
                  className={`${
                    mobile ? 'artboard artboard-demo phone-1' : ''
                  }`}
                >
                  {(theme === 'simple' && <SimpleTheme preview={true} />) ||
                    (theme === 'modern' && <ModernTheme preview={true} />) ||
                    (theme === 'vintage' && (
                      <VintageTheme preview={true} />
                    )) || <CuteTheme preview={true} />}
                </div>
              </div>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="grid h-20 flex-grow place-items-center w-1/4 space-y-2">
            <div>
              <label htmlFor="my-modal-3" className="btn btn-md mt-4 mx-2">
                메뉴 추가
              </label>
              <button
                onClick={() =>
                  setStoreManage((prev) => {
                    return { ...prev, menu: [...prev.menu, dumyCategoryData] };
                  })
                }
                className="btn btn-md mt-4"
              >
                카테고리 추가
              </button>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <StoreDialog
                setNewMenuItem={setNewMenu}
                newMenuItem={newMenu}
                handleSubmit={handleSubmit}
                handleImageUpload={handleImageUpload}
              />
            </div>
            <div className="card bg-slate-100 mt-5 space-y-0 py-3">
              <DragDropContext onDragEnd={onDragEnd}>
                {Array.apply(null, Array(storeMange.menu.length)).map(
                  (_value, index) => (
                    <>
                      <MenuList
                        key={storeMange.menu[index].categoryName + index}
                        items={storeMange}
                        setItems={setStoreManage}
                        index={index}
                      />
                      {index !== storeMange.menu.length - 1 && (
                        <div className="divider"></div>
                      )}
                    </>
                  ),
                )}
              </DragDropContext>
            </div>
          </div>
        </div>
      </NormalLayout>
    )
  ) : (
    <></>
  );
};
