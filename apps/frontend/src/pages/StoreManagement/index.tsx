import { Route, Routes } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { Item } from '../../type/Item';
import MenuList from '../../components/Menu/MenuList';

export const StoreManagement: React.FC = () => {
  const [itemname, setItemName] = useState<string>('');
  const [itemprice, setItemPrice] = useState<string>('');
  const [itemid, SetItemId] = useState<string>('');
  const [fileImage, setFileImage] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [MenuList2, setMenuList2] = useState<Item[]>([]);
  const [MenuList3, setMenuList3] = useState<Item[]>([]);

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
    setItems([
      ...items,
      {
        image: fileImage,
        itemid: itemid,
        itemname: itemname,
        itemprice: itemprice,
      },
    ]);
    setItemName('');
    setItemPrice('');
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
    let menu2 = MenuList2;
    let menu3 = MenuList3;

    if (source.droppableId === 'menulist1') {
      add = items[source.index];
      items.splice(source.index, 1);
    } else if (source.droppableId === 'menulist2') {
      add = MenuList2[source.index];
      menu2.splice(source.index, 1);
    } else {
      add = MenuList3[source.index];
      menu3.splice(source.index, 1);
    }

    if (destination.droppableId === 'menulist1') {
      items.splice(destination.index, 0, { ...add });
    } else if (destination.droppableId === 'menulist2') {
      menu2.splice(destination.index, 0, { ...add });
    } else {
      menu3.splice(destination.index, 0, { ...add });
    }

    setItems(items);
    setMenuList2(menu2);
    setMenuList3(menu3);
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
            <DragDropContext onDragEnd={onDragEnd}>
              <div>
                <MenuList
                  items={items}
                  setItems={setItems}
                  MenuList2={MenuList2}
                  setMenuList2={setMenuList2}
                  MenuList3={MenuList3}
                  setMenuList3={setMenuList3}
                />
              </div>
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
