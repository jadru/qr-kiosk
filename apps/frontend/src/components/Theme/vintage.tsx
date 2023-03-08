import { storeManageState } from '@src/states/atom';
import { StoreManageType } from '@src/type';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

interface Props {
  preview?: boolean;
  onOrderButtonClick?: any;
}

export const VintageTheme: React.FC<Props> = ({
  preview = false,
  onOrderButtonClick,
}) => {
  const Menu = useRecoilValue(storeManageState);
  return (
    <div className="w-full h-full bg-vintage py-10 px-5 bg-scroll overflow-scroll bg-no-repeat bg-cover">
      <h1 className="text-5xl font-bold text-center font-vintage-font py-4">
        {Menu.name}
      </h1>
      <div className="flex flex-col outline-1 outline">
        <div className="carousel w-fuill">
          {Menu.information.photos && Menu.information.photos.length > 0 &&
            Menu.information.photos.map(
              (photoUrl, index) =>
                photoUrl &&
                photoUrl !== '' && (
                  <div className="carousel-item w-2/3" key={photoUrl}>
                    <img src={photoUrl} alt={'photo' + index} />
                  </div>
                ),
            )}
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
              <div
                className="flex flex-col space-y-2 flex-wrap my-3 space-x-2 font-vintage-font outline outline-1 py-3 px-3"
                key={category.categoryName}
              >
                <>
                  <h3 className="text-2xl">{category.categoryName}</h3>
                  {category.menus.map((menuItem) => (
                    <div
                      className="flex flex-row outline-dotted h-32 items-center justify-between space-x-6 pr-6"
                      key={menuItem.itemid}
                    >
                      {menuItem.image && menuItem.image !== '' && (
                        <img
                          src={menuItem.image}
                          alt=""
                          className="w-24 h-full"
                        />
                      )}
                      <div className="w-1/2 ml-2">
                        <p className="text-xl font-bold">{menuItem.itemname}</p>
                        <p className="text-lg font-normal">
                          {parseFloat(menuItem.itemprice).toLocaleString('en')}
                          원
                        </p>
                      </div>
                      <button
                        className="btn btn-outline"
                        id={menuItem.itemid}
                        disabled={preview}
                        value={menuItem.itemprice}
                        name={menuItem.itemname}
                        onClick={() =>
                          onOrderButtonClick((prev: any) => {
                            return [...prev, menuItem];
                          })
                        }
                      >
                        주문하기
                      </button>
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
