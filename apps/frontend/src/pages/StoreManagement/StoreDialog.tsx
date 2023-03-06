interface Props {
  handleAddImages: (event: React.ChangeEvent<HTMLInputElement>) => void;
  itemid: string;
  itemname: string;
  itemprice: string;
  SetItemId: (s: string) => void;
  setItemName: (s: string) => void;
  setItemPrice: (s: string) => void;
  handleSubmit: () => void;
}

export const StoreDialog: React.FC<Props> = ({
  handleAddImages,
  itemid,
  itemname,
  itemprice,
  SetItemId,
  setItemName,
  setItemPrice,
  handleSubmit,
}) => (
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
);
