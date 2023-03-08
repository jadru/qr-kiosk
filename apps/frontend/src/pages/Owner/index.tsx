import {
  orderDetailDeleteAPi,
  orderStatusChangeAPi,
} from '@src/apis/orderManage';
import { NormalLayout } from '@src/components';
import { orderDetailType } from '@src/type';
import { Link } from 'react-router-dom';

export const Owner = () => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.value !== 'delete'
      ? orderStatusChangeAPi(
          e.currentTarget.id,
          e.currentTarget.name,
          e.currentTarget.value,
        )
      : orderDetailDeleteAPi(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };
  const temp: orderDetailType[] = [];

  return (
    <NormalLayout>
      <div className="w-full h-full space-y-3">
        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-bold">블루포트 인제대점 {'  '}</p>
          <Link to={`/owner/manage`} className="btn btn-success">
            매장 정보 및 메뉴판 관리
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-12">
          <div className="rounded-2xl py-12 px-12 outline space-y-3">
            <div className="space-y-2">
              <p className="text-3xl font-bold mb-3"></p>
              {temp.map((order) => (
                <div className=" bg-white outline-1 outline flex flex-row justify-between items-center rounded-xl">
                  <div className="space-y-none text-xl pl-6">
                    <p className="font-bold text-slate-600 text-2xl">
                      {(order.order_status === 'confirm' && '접수') ||
                        (order.order_status === 'order' && '접수 전') ||
                        (order.order_status === 'cancel' && '취소') ||
                        (order.order_status === 'done' && '완료')}
                    </p>
                    <p>아이스 아메리카노 x 2</p>
                    <p>아이스 카페라떼 x 5</p>
                    <p>아이스 아메리카노 x 2</p>
                    <p className="font-bold text-sm text-slate-500">
                      <>
                        주문 id {order.id} <br />
                        {order.approveAt}
                      </>
                    </p>
                  </div>
                  <div className="btn-group btn-group-vertical items-stretch">
                    <button
                      className="btn btn-primary"
                      onClick={onButtonClick}
                      id={String(order.id)}
                      value="승인"
                      name={'confirm'}
                    >
                      승인
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={onButtonClick}
                      id={String(order.id)}
                      name={'done'}
                      value="완료"
                    >
                      완료
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={onButtonClick}
                      id={String(order.id)}
                      name={'cancel'}
                      value="취소"
                    >
                      취소
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={onButtonClick}
                      id={String(order.id)}
                      name={'delete'}
                      value="삭제"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};
