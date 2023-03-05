import { Item } from '../../type/Item';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import MenuItem from './MenuItem';

interface Props {
  items: Item[];
  setItems: (s: Item[]) => void;
  MenuList2: Item[];
  setMenuList2: (s: Item[]) => void;
  MenuList3: Item[];
  setMenuList3: (s: Item[]) => void;
}

const MenuList: React.FC<Props> = ({
  items,
  setItems,
  MenuList2,
  setMenuList2,
  MenuList3,
  setMenuList3,
}: Props) => {
  return (
    <>
      <div>
        <h2>MenuList 1</h2>
        <Droppable droppableId="menulist1">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="list-none">
                {items.length === 0 ? (
                  <p>No Item</p>
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
      <div>
        <h2>MenuList 2</h2>
        <Droppable droppableId="menulist2">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="list-none">
                {MenuList2.length === 0 ? (
                  <p>No Item</p>
                ) : (
                  MenuList2.map((item, index) => (
                    <MenuItem
                      key={item.itemid}
                      index={index}
                      item={item}
                      items={MenuList2}
                      setItems={setMenuList2}
                    />
                  ))
                )}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </div>
      <div>
        <h2>MenuList 3</h2>
        <Droppable droppableId="menulist3">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="list-none">
                {MenuList3.length === 0 ? (
                  <p>No Item</p>
                ) : (
                  MenuList3.map((item, index) => (
                    <MenuItem
                      key={item.itemid}
                      index={index}
                      item={item}
                      items={MenuList3}
                      setItems={setMenuList3}
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
