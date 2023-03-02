import { Route, Routes } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { menuDataState } from '@src/states/atom';

interface MenuItem {
  id: string;
  item: string;
  itemprice: string;
}

export const StoreManagement = () => {
  const [item, setItem] = useState('');
  const [itemprice, setItemPrice] = useState('');
  const [menu, setMenu] = useRecoilState(menuDataState);

  const [fileImage, setFileImage] = useState('');
  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const deleteImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
  };

  // const menuname = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setItem(event.target.value);
  //   menu.menuList1[0].menuItem[0].menuname = item;
  // };
  // const menuprice = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setItemPrice(event.target.value);
  //   menu.menuList1[0].menuItem[0].menuprice = itemprice;
  // };

  const handleSubmit = () => {
    console.log(item + itemprice);
    menu.menuList1[0].menuItem[0].menuname = item;
    menu.menuList1[0].menuItem[0].menuprice = itemprice;
  };
  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="grid h-20 flex-grow place-items-center w-1/3">
          <div>
            <label htmlFor="my-modal-3" className="btn btn-sm">
              메뉴 추가
            </label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h2 className="text-lg font-bold">메뉴 추가 다이얼로그</h2>
                <div>
                  <input
                    type="file"
                    className="file-input w-full max-w-xs file-input-sm mt-4"
                    accept="image/*"
                    onChange={saveFileImage}
                  />
                  <div>
                    {fileImage && (
                      <img
                        alt="sample"
                        src={fileImage}
                        style={{ margin: 'auto' }}
                      />
                    )}
                    <button className="btn btn-sm mt-2" onClick={deleteImage}>
                      삭제
                    </button>
                  </div>
                  <div className="form-control mt-4">
                    <label className="input-group input-group-sm">
                      <span>이름</span>
                      <input
                        type="text"
                        placeholder="메뉴 이름"
                        className="input input-bordered input-sm"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        //onChange={menuname}
                      />
                    </label>
                  </div>
                  <div className="form-control mt-4">
                    <label className="input-group input-group-sm">
                      <span>가격</span>
                      <input
                        type="text"
                        placeholder="메뉴 가격"
                        className="input input-bordered input-sm"
                        value={itemprice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        //onChange={menuprice}
                      />
                    </label>
                  </div>
                </div>
                <div className="modal-action">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm mt-4"
                    onClick={handleSubmit}
                  >
                    확인
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>{/* <DragDropContext></DragDropContext> */}</div>
          <div>
            <img src={fileImage} />
            <h4>
              메뉴이름 : {item}, 가격 : {itemprice}
            </h4>
          </div>
        </div>
        <div className="divider divider-horizontal">{'>'}</div>
        <div className="grid h-20 flex-grow place-items-center w-2/3">
          미리보기 위치
        </div>
      </div>
    </>
  );
};
