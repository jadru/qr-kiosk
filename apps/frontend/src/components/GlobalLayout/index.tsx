import { tabAtom } from '@src/states/atom';
import QRCode from 'react-qr-code';
import { useRecoilValue } from 'recoil';
import { NavBar } from './NavBar';
export const GlobalLayout = () => {
  const tab = useRecoilValue(tabAtom);
  return (
    <div className="w-full h-full p-6">
      <p className="text-3xl">Hello world!</p>
      <p className="text-2xl">Selected tab is {tab}</p>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '50%' }}
        value={'http://localhost:3000'}
        viewBox={`0 0 256 256`}
      />
      <NavBar />
    </div>
  );
};
