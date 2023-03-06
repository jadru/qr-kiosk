import React from 'react';
import { Item } from '../../type/Item';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  item: Item;
  items: Item[];
  setItems: (s: Item[]) => void;
}

const MenuItem: React.FC<Props> = ({ index, item, items, setItems }) => {
  const handleDelte = (id: string) => {
    setItems(items.filter((item) => item.itemid !== id));
  };
  return (
    <Draggable draggableId={item.itemid.toString()} index={index}>
      {(provided) => (
        <li
          className="card card-side bg-base-100 shadow-xl mt-5 w-96"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-title">
            <div className="ml-4">
              <h4>{item.itemname}</h4>
              <h4>{item.itemprice}원</h4>
            </div>
          </div>
          <div className="card-body">
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary ml-2 mb-2"
                type="button"
                onClick={() => handleDelte(item.itemid)}
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default MenuItem;
