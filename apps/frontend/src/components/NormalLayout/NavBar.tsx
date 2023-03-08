import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          QR 키오스크
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/account">계정 관리</Link>
          </li>
          <li>
            <Link to="/owner">매장 관리</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
