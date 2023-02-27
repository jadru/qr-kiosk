import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          QR 키오스크
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>로그아웃</a>
          </li>
          <li>
            <a>계정 관리</a>
          </li>
          <li>
            <a>매장 관리</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
