import { ContentType } from '@src/type';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar';

export const NormalLayout = ({ children, className }: ContentType) => {
  return (
    <div className={`w-screen h-screen ${className}`}>
      <NavBar />
      <div className="px-8 py-6">{children}</div>
    </div>
  );
};
