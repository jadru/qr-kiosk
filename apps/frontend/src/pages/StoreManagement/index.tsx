import { Route, Routes } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { menuDataState } from '@src/states/atom';

interface MenuItem {
  image: string[];
  itemid: string;
  itemname: string;
  itemprice: string;
}
interface MenuItemList {
  menuItems: MenuItem[];
}

export const StoreManagement = () => {
  const [itemname, setItemName] = useState('');
  const [itemprice, setItemPrice] = useState('');
  const [itemid, SetItemId] = useState('');
  const [fileImage, setFileImage] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [menuItem, setMenuItem] = useState<MenuItem>({
    image: [],
    itemid: '',
    itemname: '',
    itemprice: '',
  });
  const [menuList, setMenuList] = useState<MenuItemList>({
    menuItems: [menuItem],
  });
  const onMenuList = useCallback(() => {
    setMenuList({
      menuItems: [...menuList.menuItems, menuItem],
    });
  }, [menuItem]);

  useEffect(() => {
    onMenuList();
  }, [onMenuList]);

  // const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // @ts-ignore
  //   setFileImage[URL.createObjectURL(event.target.files[0])];
  // };
  // const deleteImage = () => {
  //   //URL.revokeObjectURL(fileImage[0]);
  //   setFileImage([
  //     ...fileImage.slice(0, count),
  //     ...fileImage.slice(count + 1, fileImage.length),
  //   ]);
  // };
  const deletehandle = (itemid: string) => {
    setMenuList({
      menuItems: menuList.menuItems.filter((item) => item.itemid !== itemid),
    });
  };
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageList: any = event.target.files;
    let imageArray = [...fileImage];

    for (let i = 0; i < imageList.length; i++) {
      const image = URL.createObjectURL(imageList[i]);
      if (!image) {
        throw new Error('이미지가 없습니다.');
      }
      imageArray.push(image);
    }
    setFileImage(imageArray);
  };
  const handleSubmit = () => {
    setMenuItem({
      image: fileImage,
      itemid: itemid,
      itemname: itemname,
      itemprice: itemprice,
    });
    setCount(count + 1);
    console.log(count);
  };

  const resultData: any = (itemid: string) => {
    return menuList?.menuItems.map((item, index) => {
      if (item.itemid === itemid && item.itemname) {
        return (
          <Draggable draggableId={item.itemid} index={index} key={item.itemid}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="card w-96 bg-base-100 shadow-xl mt-4">
                  <div className="card-body">
                    <div className="card-actions justify-end">
                      <img
                        src={fileImage[index - 2]}
                        style={{ margin: 'auto' }}
                      />
                      <h4>메뉴 이름 : {item.itemname}</h4>
                      <h4>가격 : {item.itemprice}</h4>
                      <button
                        className="btn btn-square btn-sm"
                        onClick={() => deletehandle(item.itemid)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        );
      }
    });
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    let items = [...menuList.menuItems];
    let index;
    if (source.droppableId === destination.droppableId) {
      index = items.findIndex((item) => item.itemid === source.droppableId);
      let findObj = items[index];
      findObj.itemid = destination.droppableId;
      items.slice(index, 1);
      items = [...items, findObj];
      setMenuList({ menuItems: items });
    } else {
      if (source.index != destination.index) {
        let selectItem = items[result.source.index];
        items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, selectItem);
        setMenuList({ menuItems: items });
      }
    }
  };

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="grid h-20 flex-grow place-items-center w-1/3">
          <div>
            <label htmlFor="my-modal-3" className="btn btn-sm mt-4">
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
                    onChange={handleAddImages}
                  />
                  <div className="form-control mt-4">
                    <label className="input-group input-group-sm">
                      <span>ID</span>
                      <input
                        type="text"
                        placeholder="ID"
                        className="input input-bordered input-sm"
                        value={itemid}
                        onChange={(e) => SetItemId(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="form-control mt-4">
                    <label className="input-group input-group-sm">
                      <span>이름</span>
                      <input
                        type="text"
                        placeholder="메뉴 이름"
                        className="input input-bordered input-sm"
                        value={itemname}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="form-control mt-4">
                    <label className="input-group input-group-sm">
                      <span>가격</span>
                      <input
                        type="number"
                        placeholder="메뉴 가격"
                        className="input input-bordered input-sm"
                        value={itemprice}
                        onChange={(e) => setItemPrice(e.target.value)}
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
          <div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {menuList?.menuItems.map((item) => {
                return (
                  <Droppable
                    droppableId={item.itemid}
                    key={item.itemid}
                    direction={'vertical'}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {resultData(item.itemid)}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </DragDropContext>
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
