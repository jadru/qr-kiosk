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

const usePreventLeave = () => {
  function listener(e: any) {
    e.preventDefault();
    e.returnValue = '';
  }

  function enablePrevent() {
    window.addEventListener('beforeunload', listener);
  }

  function disablePrevent() {
    window.removeEventListener('beforeunload', listener);
  }

  return [enablePrevent, disablePrevent];
};

let templateOfNewMenu = () => {
  let itemid = uuidv4();
  return {
    itemname: '새 메뉴',
    itemprice: '1000',
    image: '',
    itemid,
  };
};

export const StoreManagement: React.FC = () => {
  const [enablePrevent, disablePrevent] = usePreventLeave();
  const [storeMange, setStoreManage] = useRecoilState(storeManageState);
  const [menuData, setMenuData] = useRecoilState(menuDataState);
  const [newMenu, setNewMenu] = useState<Item>(templateOfNewMenu);
  const [mobile, setMobile] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('simple');

  useEffect(() => {
    // @ts-ignore
    setStoreManage((prev) => {
      return { ...prev, menu: cloneDeep(menuData) };
    });
    setTheme(storeMange.information.theme);
  }, [menuData]);

  const onMobileToggleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMobile((prev) => !prev);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imageUrl = '';
    if (e.target.files !== null) {
      imageUrl = URL.createObjectURL(e.target.files[0]);
    } else {
      throw new Error('No Image File');
    }
    setNewMenu((prev) => {
      return { ...prev, image: imageUrl };
    });
  };

  const handleSubmit = () => {
    let tempData = cloneDeep(menuData);
    tempData[0].menus.push({ ...newMenu });
    setMenuData(tempData);
    setNewMenu(templateOfNewMenu);
    enablePrevent();
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add: Item;

    const temp = cloneDeep(menuData);

    Array.apply(null, Array(temp.length)).map((_value, index) => {
      if (source.droppableId === `menulist${index}`) {
        add = temp[index].menus[source.index];
        temp[index].menus.splice(source.index, 1);
      }
    });

    Array.apply(null, Array(temp.length)).map((_value, index) => {
      if (destination.droppableId === `menulist${index}`) {
        temp[index].menus.splice(destination.index, 0, { ...add });
      }
    });

    setMenuData(temp);
    enablePrevent();
  };

  const dumyCategoryData = {
    categoryName: '새 카테고리 ' + (menuData.length + 1),
    menus: [],
  };

  return (
    <NormalLayout>
      <div className="flex w-full h-full space-x-3">
        <div className="grid h-20 flex-grow place-items-center w-1/4 space-y-2">
          <StoreInformationForm
            setTheme={setTheme}
            theme={theme}
            storeManage={storeMange}
            setStoreManage={setStoreManage}
          />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="divider divider-horizontal"></div>
        <div className="w-2/4 flex flex-col self-center items-center space-y-4 z-50">
          <label htmlFor="my-modal-6" className="btn btn-md mt-4 mx-2">
            저장
          </label>
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <QRcodeDialog />
          <div className="form-control glass p-3 rounded-2xl sticky top-12 flex flex-row space-x-3">
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
                className={`${mobile ? 'artboard artboard-demo phone-1' : ''}`}
              >
                {(theme === 'simple' && <SimpleTheme preview={true} />) ||
                  (theme === 'modern' && <ModernTheme preview={true} />) ||
                  (theme === 'vintage' && <VintageTheme preview={true} />) || (
                    <CuteTheme preview={true} />
                  )}
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
              onClick={() => setMenuData((prev) => [...prev, dumyCategoryData])}
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
              {Array.apply(null, Array(menuData.length)).map(
                (_value, index) => (
                  <>
                    <MenuList
                      key={menuData[index].categoryName + index}
                      items={menuData}
                      setItems={setMenuData}
                      index={index}
                    />
                    {index !== menuData.length - 1 && (
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
  );
};
