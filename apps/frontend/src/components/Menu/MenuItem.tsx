import React from 'react';
import { Item } from '../../type/Item';
import { Draggable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { MenuItemType, MenuListType } from '@src/type';

interface Props {
  index: number;
  item: MenuItemType;
  onDelete: (id: number) => void;
}

const MenuItem: React.FC<Props> = ({ index, item, onDelete }) => {
  return (
    <Draggable draggableId={item.item_id.toString()} index={index}>
      {(provided) => (
        <li
          className="card card-bordered card-side glass bg-white h-20"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-body flex flex-row p-0">
            {item.image_url && item.image_url !== '' && (
              <img
                src={item.image_url}
                alt=""
                className="w-20 h-20 rounded-l-2xl"
              />
            )}
            <div className="ml-4 py-3 px-1">
              <h4 className="card-title ">{item.name}</h4>
              <h4>{item.price.toLocaleString('en')}원</h4>
            </div>
          </div>
          <div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-circle btn-sm mr-2 mt-2"
                type="button"
                onClick={() => onDelete(item.item_id)}
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
