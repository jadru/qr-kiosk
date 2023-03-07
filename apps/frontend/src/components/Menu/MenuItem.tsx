import React from 'react';
import { Item } from '../../type/Item';
import { Draggable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { MenuListType } from '@src/type';

interface Props {
  index: number;
  item: Item;
  onDelete: (id: string) => void;
}

const MenuItem: React.FC<Props> = ({ index, item, onDelete }) => {
  return (
    <Draggable draggableId={item.itemid.toString()} index={index}>
      {(provided) => (
        <li
          className="card card-bordered card-side glass bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-body p-4">
            <div className="ml-4">
              <h4 className="card-title ">{item.itemname}</h4>
              <h4>{parseFloat(item.itemprice).toLocaleString('en')}원</h4>
            </div>
          </div>
          <div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-circle btn-sm mr-2 mt-2"
                type="button"
                onClick={() => onDelete(item.itemid)}
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
        </li>
      )}
    </Draggable>
  );
};
export default MenuItem;
