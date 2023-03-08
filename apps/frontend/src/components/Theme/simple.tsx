import { storeManageState } from '@src/states/atom';
import { StoreManageType } from '@src/type';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

interface Props {
  preview?: boolean;
  onOrderButtonClick?: any;
}

export const SimpleTheme: React.FC<Props> = ({
  preview = false,
  onOrderButtonClick,
}) => {
  const Menu = useRecoilValue(storeManageState);
  return (
    <div className="w-full h-full bg-white py-10 px-5 bg-scroll overflow-scroll -z-0">
      <h1 className="text-5xl font-bold text-center font-nato-fon my-5">
        {Menu.name}
      </h1>
      <div className="flex flex-col">
        <div className="carousel my-4 w-fuill">
          {Menu.information.photos &&
            Menu.information.photos.length > 0 &&
            Menu.information.photos.map(
              (photoUrl, index) =>
                photoUrl &&
                photoUrl !== '' && (
                  <div className="carousel-item w-2/3" key={photoUrl + index}>
                    <img src={photoUrl} alt={'photo' + index} />
                  </div>
                ),
            )}
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
          <div
            className="flex flex-col space-y-2 flex-wrap my-3 font-nato-font"
            key={category.categoryName}
          >
            {category.menus.length > 0 && (
              <>
                <h3 className="text-2xl mb-4">{category.categoryName}</h3>
                {category.menus.map((menuItem) => (
                  <div
                    className="flex flex-row bg-slate-50/75 rounded-2xl h-32 items-center justify-between space-x-6 pr-6"
                    key={menuItem.itemid}
                  >
                    {menuItem.image && menuItem.image !== '' && (
                      <img
                        src={menuItem.image}
                        alt=""
                        className="w-24 h-full rounded-l-2xl"
                      />
                    )}
                    <div className="w-1/2 ml-2">
                      <p className="text-xl font-bold">{menuItem.itemname}</p>
                      <p className="text-lg font-normal">
                        {parseFloat(menuItem.itemprice).toLocaleString('en')}원
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
                      주문
                    </button>
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
