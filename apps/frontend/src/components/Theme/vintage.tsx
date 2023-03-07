import { storeManageState } from '@src/states/atom';
import { StoreManageType } from '@src/type';
import { useRecoilValue } from 'recoil';

export const VintageTheme = () => {
  const Menu = useRecoilValue(storeManageState);
  console.log(Menu);
  return (
    <div className="w-full h-full bg-vintage py-10 px-5 bg-scroll overflow-scroll bg-no-repeat bg-cover">
      <h1 className="text-5xl font-bold text-center font-vintage-font py-4">
        {Menu.name}
      </h1>
      <div className="flex flex-col outline-1 outline">
        <div className="carousel w-fuill">
          {Menu.information.photos.map((photoUrl, index) => (
            <div className="carousel-item w-2/3">
              <img src={photoUrl} alt={'photo' + index} />
            </div>
          ))}
        </div>
        <div className="text-left mt-5 font-vintage-font text-lg w-full p-2">
          <p>{Menu.information.address}</p>
          <p>{Menu.information.facilities}</p>
          <p>{Menu.information.openTime}</p>
          <p>{Menu.information.phoneNumber}</p>
        </div>
      </div>
      <div className="divider divide-gray-700"></div>
      <div className="grid space-y-2">
        {Menu.menu.map((category) => (
          <>
            {category.menus.length > 0 && (
              <div className="flex flex-col space-y-2 flex-wrap my-3 space-x-2 font-vintage-font outline outline-1 py-3 px-3">
                <>
                  <h3 className="text-2xl">{category.categoryName}</h3>
                  {category.menus.map((menuItem) => (
                    <div className="flex flex-row outline-dotted px-4 py-2 h-32 items-center justify-center">
                      <div className="w-2/3">
                        <p className="text-2xl font-bold">
                          {menuItem.itemname}
                        </p>
                        <p className="text-lg font-normal">
                          {parseFloat(menuItem.itemprice).toLocaleString('en')}
                          원
                        </p>
                      </div>

                      <img src={menuItem.image} alt="" />
                      <button className="btn btn-outline">주문하기</button>
                    </div>
                  ))}
                </>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
