import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { QRprint } from '@src/components/QRprint/QRprint';
import { Loading } from '@src/components';

interface Props {
  saving: boolean;
}

export const QRcodeDialog: React.FC<Props> = ({ saving }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [tableId, setTableId] = useState('0');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableId(e.target.value);
  };
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.select();
  return (
    <div className="modal">
      <div className="modal-box relative w-full">
        {saving ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <>
            <label
              htmlFor="my-modal-6"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h2 className="text-xl font-bold">QR코드 생성기</h2>
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
            <QRprint ref={ref} setTableId={setTableId} tableId={tableId} />
            <div className="text-end">
              <ReactToPrint
                trigger={() => <button>QR코드 출력</button>}
                content={() => ref.current}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
