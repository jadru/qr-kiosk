import { storeManageState } from '@src/states/atom';
import { StoreManageType } from '@src/type';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

interface Props {
  preview?: boolean;
  onOrderButtonClick?: any;
}
export const ModernTheme: React.FC<Props> = ({
  preview = false,
  onOrderButtonClick,
}) => {
  const Menu = useRecoilValue(storeManageState);
  return (
    <div className="w-full h-full bg-white py-10 px-5 bg-scroll overflow-scroll space-y-4">
      <div className="w-full bg-base-100 shadow-2xl rounded-2xl px-6 py-5 space-y-2">
        <h2 className="text-5xl">{Menu.name}</h2>
        <p>{Menu.information.address}</p>
        <p>{Menu.information.facilities}</p>
        <p>{Menu.information.openTime}</p>
        <p>{Menu.information.phoneNumber}</p>
      </div>
      <div className="carousel rounded-box">
        {Menu.information.photo &&
          Menu.information.photo.length > 0 &&
          Menu.information.photo.map(
            (photoUrl, index) =>
              photoUrl &&
              photoUrl !== '' && (
                <div className="carousel-item" key={photoUrl}>
                  <img src={photoUrl} alt={'photo' + index} />
                </div>
              ),
          )}
      </div>
      <div className="divider divide-gray-700"></div>
      <div className="grid space-y-4">
        {Menu.menu.map((category) => (
          <>
            {category.menus.length > 0 && (
              <div
                className="flex flex-col space-y-2 flex-wrap px-4 py-5 space-x-2 font-nato-font card bg-slate-100 shadow-2xl"
                key={category.categoryName}
              >
                <h3 className="text-2xl">{category.categoryName}</h3>
                <>
                  {category.menus.map((menuItem) => (
                    <div
                      className="flex flex-row h-32 items-center justify-between space-x-6 pr-6 bg-white card"
                      key={menuItem.item_id}
                    >
                      {menuItem.image_url && menuItem.image_url !== '' && (
                        <img
                          src={menuItem.image_url}
                          alt=""
                          className="w-24 h-full rounded-l-2xl"
                        />
                      )}
                      <div className="w-1/2 ml-2">
                        <p className="text-xl font-bold">{menuItem.name}</p>
                        <p className="text-lg font-normal">
                          {menuItem.price.toLocaleString('en')}원
                        </p>
                      </div>
                      <button
                        className="btn"
                        disabled={preview}
                        id={String(menuItem.item_id)}
                        value={menuItem.price}
                        name={menuItem.name}
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
