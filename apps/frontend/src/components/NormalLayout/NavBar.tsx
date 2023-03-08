import { tokenAccessProtected } from '@src/utils';
import { Cookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const cookie = new Cookies();
  const ownerId = cookie.get('owner_id');
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          QR 키오스크
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {tokenAccessProtected() ? (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    cookie.remove('owner_id');
                    cookie.remove('token');
                    navigate('/');
                  }}
                >
                  로그아웃
                </button>
              </li>
              <li>
                <Link to={`/${ownerId}/0/order`}>메뉴판 보기</Link>
              </li>
              <li>
                <Link to="/owner">매장 관리</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
