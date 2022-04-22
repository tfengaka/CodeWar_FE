<<<<<<< Updated upstream
import Button from 'components/Button';
import Modal from 'features/auth/client/Modal';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import banner from '../assets/banner.png';
const routing = [
  { path: '/problem', display: 'Luyện Tập', icon: 'bx bxs-grid' },
  { path: '/contest', display: 'Thi Đấu', icon: 'bx bxs-trophy' },
  { path: '/rank', display: 'Xếp hạng', icon: 'bx bxs-bar-chart-alt-2' },
  { path: '/upload', display: 'Bài nộp', icon: 'bx bxs-cloud-upload' },
];
export default function Navigation() {
  const { pathname } = useLocation();
  const activeNav = routing.findIndex((e) => pathname.includes(e.path));
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = useAuth();
  return (
    <>
      <div className='header'>
        <div className='container'>
          <div className='header__menu'>
            <div className='header__menu__banner'>
              <Link to='/'>
                <img src={banner} alt='' />
              </Link>
            </div>
            {routing.map((route, index) => (
              <Link
                to={route.path}
                key={index}
                className={`header__menu__item ${index === activeNav ? 'active' : ''}`}
              >
                <i className={route.icon}></i>
                <span>{route.display}</span>
              </Link>
            ))}
          </div>

          <div className='header__account'>
            {/* use auth is true to show account info or show button loggin  */}
            {auth.user ? (
              <>
                <div
                  className={`header__account__info ${showDropdown && 'active'}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>{auth.user.fullName}</span>
                  <i className='bx bxs-down-arrow'></i>
                </div>
                <div className={`header__account__dropdown ${showDropdown && 'active'}`}>
                  <div className='header__account__dropdown_item'>
                    <span>Hồ Sơ</span>
                  </div>
                  <div className='header__account__dropdown_item' onClick={() => auth.signOut()}>
                    <span>Đăng xuất</span>
                  </div>
                </div>
              </>
            ) : (
              <Button backgroundColor='main' onClick={() => setShowModal(true)}>
                {auth.loading ? <div className='loading'></div> : 'Đăng Nhập'}
              </Button>
            )}
          </div>
        </div>
      </div>
      {showModal && <Modal onShowModal={setShowModal} />}
    </>
  );
}
=======
import Button from 'components/Button';
import Modal from 'features/auth/client/Modal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import banner from '../assets/banner.png';
const routing = [
  { path: '/problem', display: 'Luyện Tập', icon: 'bx bxs-grid' },
  { path: '/contest', display: 'Thi Đấu', icon: 'bx bxs-trophy' },
  { path: '/rank', display: 'Xếp hạng', icon: 'bx bxs-bar-chart-alt-2' },
  { path: '/upload', display: 'Bài nộp', icon: 'bx bxs-cloud-upload' },
];
export default function Navigation() {
  const { pathname } = useLocation();
  const activeNav = routing.findIndex((e) => e.path === pathname);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user.info);
  return (
    <>
      <div className='header'>
        <div className='container'>
          <div className='header__menu'>
            <div className='header__menu__banner'>
              <Link to='/'>
                <img src={banner} alt='' />
              </Link>
            </div>
            {routing.map((route, index) => (
              <Link
                to={route.path}
                key={index}
                className={`header__menu__item ${index === activeNav ? 'active' : ''}`}
              >
                <i className={route.icon}></i>
                <span>{route.display}</span>
              </Link>
            ))}
          </div>

          <div className='header__account'>
            {/* use auth is true to show account info or show button loggin  */}
            {user ? (
              <div className='header__account__info'>
                <span>{user.fullName}</span>
                <i className='bx bxs-down-arrow'></i>
              </div>
            ) : (
              <Button backgroundColor='main' onClick={() => setShowModal(true)}>
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </div>
      {showModal && <Modal onShowModal={setShowModal} />}
    </>
  );
}
>>>>>>> Stashed changes
