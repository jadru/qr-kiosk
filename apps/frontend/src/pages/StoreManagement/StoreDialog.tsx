import { MenuItemType } from '@src/type';
import { Item } from '@src/type/Item';

interface Props {
  newMenuItem: MenuItemType;
  setNewMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>;
  handleSubmit: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StoreDialog: React.FC<Props> = ({
  setNewMenuItem,
  newMenuItem,
  handleSubmit,
  handleImageUpload,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMenuItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.select();

  return (
    <div className="modal">
      <div className="modal-box relative w-full">
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
            className="file-input w-full max-w-xs file-input-md mt-4"
            accept="image/*"
            name="imageInputDialog"
            onChange={handleImageUpload}
          />
          <div className="form-control mt-4  w-full">
            <label className="input-group input-group-sm">
              <span>메뉴 이름</span>
              <input
                type="text"
                placeholder="새 메뉴"
                value={newMenuItem.name}
                className="input input-bordered input-md"
                name="name"
                onFocus={handleFocus}
                onChange={handleOnChange}
              />
            </label>
          </div>
          <div className="form-control mt-4">
            <label className="input-group input-group-sm">
              <span>메뉴 가격</span>
              <input
                type="number"
                placeholder="1,000"
                value={newMenuItem.price}
                className="input input-bordered input-md"
                name="price"
                onFocus={handleFocus}
                onChange={handleOnChange}
              />
              <span>원</span>
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
  );
};
