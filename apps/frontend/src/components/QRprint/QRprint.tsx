import React, { forwardRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { storeManageState } from '@src/states/atom';
import QRCode from 'react-qr-code';
interface Props {
  setTableId: React.Dispatch<React.SetStateAction<string>>;
  tableId: string;
}
export const QRprint = forwardRef<HTMLInputElement, Props>(
  ({ tableId }, ref) => {
    const [storeManage, setStoreManage] = useRecoilState(storeManageState);

    return (
      // @ts-ignore
      <div ref={ref}>
        <div className="mt-4">
          <div>
            <h2 className="text-lg font-bold">QR Kiosk</h2>
            <h4 className="font-bold">{storeManage.name}</h4>
            <span>테이블 번호 : {tableId}</span>
          </div>
          <QRCode value={tableId} />
        </div>
      </div>
    );
  },
);
