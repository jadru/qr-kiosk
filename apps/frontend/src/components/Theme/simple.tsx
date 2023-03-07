import { storeManageState } from '@src/states/atom';
import { StoreManageType } from '@src/type';
import { useRecoilValue } from 'recoil';

export const SimpleTheme = () => {
  const Menu = useRecoilValue(storeManageState);
  console.log(Menu);
  return (
    <div className="w-full h-full bg-white py-10 px-5 bg-scroll overflow-scroll -z-0">
      <h1 className="text-5xl font-bold text-center font-nato-font">
        {Menu.name}
      </h1>
      <div className="flex flex-col">
        <div className="carousel my-4 w-fuill">
          {Menu.information.photos.map((photoUrl, index) => (
            <div className="carousel-item w-2/3">
              <img src={photoUrl} alt={'photo' + index} />
            </div>
          ))}
        </div>
        <div className="text-left mt-5 font-nato-font text-xl w-full">
          <p>{Menu.information.address}</p>
          <p>{Menu.information.facilities}</p>
          <p>{Menu.information.openTime}</p>
          <p>{Menu.information.phoneNumber}</p>
        </div>
      </div>
      <div className="divider divide-gray-700"></div>
      <div className="grid">
        {Menu.menu.map((category) => (
          <div className="flex flex-col space-y-2 flex-wrap my-3 x-2 space-x-2 font-nato-font">
            {category.menus.length > 0 && (
              <>
                <h3 className="text-2xl">{category.categoryName}</h3>
                {category.menus.map((menuItem) => (
                  <div className="flex flex-row bg-slate-50/75 rounded-2xl px-4 py-2 mx-2 h-32 items-center justify-center">
                    <div className="w-2/3">
                      <p className="text-2xl font-bold">{menuItem.itemname}</p>
                      <p className="text-lg font-normal">
                        {parseFloat(menuItem.itemprice).toLocaleString('en')}원
                      </p>
                    </div>

                    <img src={menuItem.image} alt="" />
                    <button className="btn btn-outline">주문하기</button>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
