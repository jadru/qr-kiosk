import { Route, Routes } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { Item } from '../../type/Item';
import { useRecoilState } from 'recoil';
import MenuList from '../../components/Menu/MenuList';
import { menuDataState } from '@src/states/atom';
import { StoreDialog } from './StoreDialog';

export const StoreManagement: React.FC = () => {
  const [menuData, setMenuData] = useRecoilState(menuDataState);
  const [itemname, setItemName] = useState<string>('');
  const [itemprice, setItemPrice] = useState<string>('');
  const [itemid, SetItemId] = useState<string>('');
  const [fileImage, setFileImage] = useState<string[]>([]);

  const [MenuList1, setMenuList1] = useState<Item[]>([]);
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
    setMenuList1([
      ...MenuList1,
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

    console.log(source);
    console.log(destination);

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add: Item;
    let menu1 = MenuList1;
    let menu2 = MenuList2;
    let menu3 = MenuList3;

    if (source.droppableId === 'menulist1') {
      add = MenuList1[source.index];
      menu1?.splice(source.index, 1);
    } else if (source.droppableId === 'menulist2') {
      add = MenuList2[source.index];
      menu2?.splice(source.index, 1);
    } else {
      add = MenuList3[source.index];
      menu3?.splice(source.index, 1);
    }

    if (destination.droppableId === 'menulist1') {
      menu1?.splice(destination.index, 0, { ...add });
    } else if (destination.droppableId === 'menulist2') {
      menu2?.splice(destination.index, 0, { ...add });
    } else {
      menu3?.splice(destination.index, 0, { ...add });
    }

    setMenuList1(menu1);
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
            <StoreDialog
              itemname={itemname}
              setItemName={setItemName}
              itemprice={itemprice}
              setItemPrice={setItemPrice}
              itemid={itemid}
              SetItemId={SetItemId}
              handleAddImages={handleAddImages}
              handleSubmit={handleSubmit}
            />
          </div>
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div>
                <MenuList
                  title="MenuList 1"
                  items={MenuList1}
                  setItems={setMenuList1}
                  droppableId="menulist1"
                />
                <MenuList
                  title="MenuList 2"
                  items={MenuList2}
                  setItems={setMenuList2}
                  droppableId="menulist2"
                />
                <MenuList
                  title="MenuList 3"
                  items={MenuList3}
                  setItems={setMenuList3}
                  droppableId="menulist3"
                />
              </div>
            </DragDropContext>
          </div>
        </div>
        <div className="divider divider-horizontal">{'>'}</div>
        <div className="grid h-20 flex-grow place-items-center w-2/3">
          <p>MenuList1</p>
          {MenuList1.map((item, index) => (
            <p>{item.itemname}</p>
          ))}
          <p>MenuList2</p>
          {MenuList2.map((item, index) => (
            <p>{item.itemname}</p>
          ))}
          <p>MenuList3</p>
          {MenuList3.map((item, index) => (
            <p>{item.itemname}</p>
          ))}
        </div>
      </div>
    </>
  );
};
