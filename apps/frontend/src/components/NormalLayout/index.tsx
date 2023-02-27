import { ContentType } from '@src/type';
import { NavBar } from './NavBar';

export const NormalLayout = ({ children }: ContentType) => {
  return (
    <div className="w-full h-full p-4">
      <NavBar />
      <div className="px-8 py-6">{children}</div>
    </div>
  );
};
