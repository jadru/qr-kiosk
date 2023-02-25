import { tabAtom } from '@src/states/atom';
import { useRecoilValue } from 'recoil';
import { NavBar } from './NavBar';
export const GlobalLayout = () => {
  const tab = useRecoilValue(tabAtom);
  return (
    <div className="w-full h-full p-6">
      <p className="text-3xl">Hello world!</p>
      <p className="text-2xl">Selected tab is {tab}</p>
      <NavBar />
    </div>
  );
};
