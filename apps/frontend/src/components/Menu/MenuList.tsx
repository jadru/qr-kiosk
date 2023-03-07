import { Item } from '../../type/Item';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import MenuItem from './MenuItem';
import { MenuListType } from '@src/type';
import { SetterOrUpdater } from 'recoil';
import { cloneDeep } from 'lodash';

interface Props {
  items: MenuListType;
  setItems: any;
  index: number;
}

const MenuList: React.FC<Props> = ({ items, setItems, index }: Props) => {
  const categoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp = cloneDeep(items);
    temp[index].categoryName = e.target.value;
    setItems(temp);
  };

  const categoryItemDelete = () => {
    let temp = cloneDeep(items);
    temp.splice(index, 1);
    setItems(temp);
  };

  const handleDeleteItem = (id: string) => {
    let temp = cloneDeep(items);
    temp[index].menus = temp[index].menus.filter((item) => item.itemid !== id);
    setItems(temp);
  };

  return (
    <>
      <div className="px-2">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Type here"
            className="input input-ghost w-full max-w-xs"
            defaultValue={items[index].categoryName}
            onBlur={categoryNameChange}
          />
          <button
            className="btn btn-ghost btn-sm mr-2 mt-2"
            type="button"
            onClick={categoryItemDelete}
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
        <Droppable droppableId={`menulist${index}`}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="px-2 py-3 space-y-2">
                {items[index].menus?.length === 0 ? (
                  <p className="text-info-content text-center py-4">
                    메뉴가 없습니다
                  </p>
                ) : (
                  items[index].menus?.map((item, idx) => (
                    <MenuItem
                      key={item.itemid}
                      index={idx}
                      onDelete={handleDeleteItem}
                      item={item}
                    />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};
export default MenuList;
