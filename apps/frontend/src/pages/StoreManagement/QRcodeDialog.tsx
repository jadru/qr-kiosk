import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export const QRcodeDialog = () => {
  const [tableId, setTableId] = useState('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableId(e.target.value);
  };
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.select();
  return (
    <div className="modal">
      <div className="modal-box relative w-full">
        <label
          htmlFor="my-modal-6"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h2 className="text-lg font-bold">QR코드 생성기</h2>
        <div className="form-control mt-4 w-full">
          <label className="input-group input-group-sm">
            <span>테이블 ID</span>
            <input
              type="text"
              className="input input-bordered input-md"
              placeholder="테이블 1"
              name="tableid"
              onFocus={handleFocus}
              onChange={handleOnChange}
            />
          </label>
        </div>
        <div className="mt-4">
          <span>테이블 번호 : {tableId}</span>
          <QRCode value={tableId} />
        </div>
      </div>
    </div>
  );
};
