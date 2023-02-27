import { Route, Routes } from 'react-router-dom';

export const StoreManagement = () => {
  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="grid h-20 flex-grow place-items-center w-1/3">
          메뉴 편집 위치
        </div>
        <div className="divider divider-horizontal">{'>'}</div>
        <div className="grid h-20 flex-grow place-items-center w-2/3">
          미리보기 위치
        </div>
      </div>
    </>
  );
};
