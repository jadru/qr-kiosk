import { imageUploadApi } from '@src/apis/orderManage';
import { StoreManageType } from '@src/type';
import cloneDeep from 'lodash/cloneDeep';

interface Props {
  storeManage: StoreManageType;
  setStoreManage: React.Dispatch<React.SetStateAction<StoreManageType>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  theme: string;
}

export const StoreInformationForm: React.FC<Props> = ({
  setStoreManage,
  setTheme,
  theme,
  storeManage,
  loading,
}) => {
  const onStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempData = cloneDeep(storeManage);
    tempData.name = e.target.value;
    setStoreManage(tempData);
  };
  const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    const temp = cloneDeep(storeManage);
    // @ts-ignore
    temp.information = { ...temp.information, theme: e.target.value };
    setStoreManage(temp);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = cloneDeep(storeManage);
    // @ts-ignore
    temp.information = { ...temp.information, [e.target.name]: e.target.value };
    setStoreManage(temp);
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      let imageBinary = [];
      const imageUrls: string[] = [];
      let temp = cloneDeep(storeManage);
      for (let i = 0; i < e.target.files.length; i++) {
        imageBinary.push(e.target.files[i]);
      }
      await imageUploadApi(imageBinary, imageUrls);

      temp.information = { ...temp.information, photo: [...imageUrls] };
      await setStoreManage(temp);
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.select();
  return (
    storeManage && (
      <div className="flex flex-col flex-wrap pr-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">가게명</span>
          </label>
          <label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-group-lg"
              defaultValue={storeManage.name}
              onBlur={onStoreNameChange}
              onFocus={handleFocus}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">테마 선택</span>
          </label>
          <label>
            <select
              className="select select-bordered w-fit max-w-xs"
              onChange={onThemeChange}
            >
              <option value="simple" selected={theme === 'simple'}>
                심플
              </option>
              <option value="cute" selected={theme === 'cute'}>
                큐트
              </option>
              <option value="vintage" selected={theme === 'vintage'}>
                빈티지
              </option>
              <option value="modern" selected={theme === 'modern'}>
                모던
              </option>
            </select>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">주소</span>
          </label>
          <label>
            <input
              type="text"
              placeholder="주소"
              className="input input-bordered input-group-lg"
              defaultValue={storeManage.information.address}
              onBlur={onTextChange}
              name="address"
              onFocus={handleFocus}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">영업 정보</span>
          </label>
          <label>
            <input
              type="text"
              placeholder="영업 정보"
              className="input input-bordered input-group-lg"
              defaultValue={storeManage.information.openTime}
              onBlur={onTextChange}
              name="openTime"
              onFocus={handleFocus}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">전화번호</span>
          </label>
          <label>
            <input
              type="text"
              placeholder="전화번호"
              className="input input-bordered input-group-lg"
              defaultValue={storeManage.information.phoneNumber}
              onBlur={onTextChange}
              name="phoneNumber"
              onFocus={handleFocus}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">편의시설 정보</span>
          </label>
          <label>
            <input
              type="text"
              placeholder="편의시설 정보"
              className="input input-bordered input-group-lg"
              defaultValue={storeManage.information.facilities}
              onBlur={onTextChange}
              name="facilities"
              onFocus={handleFocus}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">매장 이미지</span>
          </label>
          <input
            type="file"
            className="file-input w-full"
            aria-label="이미지 업로드 / 변경"
            multiple
            onChange={onImageChange}
          />
        </div>
      </div>
    )
  );
};
