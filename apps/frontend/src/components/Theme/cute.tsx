import { storeManageState } from '@src/states/atom';
import { StoreManageType } from '@src/type';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

interface Props {
  preview?: boolean;
  onOrderButtonClick?: any;
}

export const CuteTheme: React.FC<Props> = ({
  preview = false,
  onOrderButtonClick,
}) => {
  const Menu = useRecoilValue(storeManageState);
  return (
    <div className="w-full h-full bg-cute py-10 px-5 bg-scroll overflow-scroll">
      <h1 className="text-5xl font-bold text-center font-cute-font">
        {Menu.name}
      </h1>
      <div className="text-center mt-5 font-cute-font text-xl">
        <p>{Menu.information.address}</p>
        <p>{Menu.information.facilities}</p>
        <p>{Menu.information.openTime}</p>
        <p>{Menu.information.phoneNumber}</p>
      </div>
      <div className="carousel rounded-box my-4">
        {Menu.information.photos &&
          Menu.information.photos.length > 0 &&
          Menu.information.photos.map(
            (photoUrl, index) =>
              photoUrl &&
              photoUrl !== '' && (
                <div className="carousel-item" key={photoUrl}>
                  <img src={photoUrl} alt={'photo' + index} />
                </div>
              ),
          )}
      </div>
      <div className="grid">
        {Menu.menu.map((category) => (
          <div
            className="flex flex-col space-y-2 flex-wrap my-3 x-2 space-x-2 font-cute-font"
            key={category.categoryName}
          >
            <h3 className="text-2xl">{category.categoryName}</h3>
            {category.menus.map((menuItem) => (
              <div
                className="flex flex-row bg-slate-50/75 rounded-2xl h-32 items-center justify-between space-x-6 pr-6"
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
                  className="btn btn-warning"
                  id={String(menuItem.item_id)}
                  disabled={preview}
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
          </div>
        ))}
      </div>
    </div>
  );
};
