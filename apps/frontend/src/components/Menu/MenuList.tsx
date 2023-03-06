import { Item } from '../../type/Item';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import MenuItem from './MenuItem';

interface Props {
  items: Item[];
  setItems: (s: Item[]) => void;
  droppableId: string;
  title: string;
}

const MenuList: React.FC<Props> = ({
  items,
  setItems,
  droppableId,
  title,
}: Props) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl my-5 w-96 px-4 py-3">
        <h1 className="card-title pl-2">{title}</h1>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="card-body px-3 py-4">
                {items.length === 0 ? (
                  <p className="text-info-content text-center py-4">
                    메뉴가 없습니다
                  </p>
                ) : (
                  items.map((item, index) => (
                    <MenuItem
                      key={item.itemid}
                      index={index}
                      item={item}
                      items={items}
                      setItems={setItems}
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
