import { NormalLayout } from '@src/components';

export const Owner = () => {
  return (
    <NormalLayout>
      <div className="w-full h-full flex flex-row space-x-2">
        <div className="flex flex-col w-1/3 bg-slate-50">
          <div className="rounded-2xl py-12 px-12 outline space-y-3">
            <div className="space-y-2">
              <p className="text-3xl font-bold">9번 테이블</p>
              <p className="font-bold text-md">
                주문 아이디: asdjfhklasjhdfkjasf
              </p>
              <div className="space-y-none text-xl">
                <p>아이스 아메리카노 x 2</p>
                <p>아이스 카페라떼 x 5</p>
                <p>아이스 아메리카노 x 2</p>
              </div>
            </div>
            <hr />
            <div className="">
              <p className="text-3xl font-bold">9번 테이블</p>
              <p className="font-bold text-sm">
                주문 아이디: asdjfhklasjhdfkjasf
              </p>
              <div className="space-y-none text-xl px-3 py-4 bg-white">
                <p className="font-bold text-sm">
                  2023년 3월 8일 10시 35분 000초 주문
                </p>
                <p>아이스 아메리카노 x 2</p>
                <p>아이스 카페라떼 x 5</p>
                <p>아이스 아메리카노 x 2</p>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2">ddd</div>
      </div>
    </NormalLayout>
  );
};
