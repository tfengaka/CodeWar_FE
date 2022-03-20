import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';

const Modal = ({ onShowModal }) => {
  const [isRegister, setIsRegister] = React.useState(false);
  // const modalRef = React.useRef(null);
  // React.useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       onShowModal(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [onShowModal]);
  return (
    <div className='modal'>
      <div className='modal__container'>
        <div className='modal__header'>
          <h3 className='modal__header__title'>{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</h3>
          <button className='modal__close' onClick={() => onShowModal(false)}>
            X
          </button>
        </div>
        <div className='divider'></div>
        {isRegister ? (
          <Register onChangeRegister={setIsRegister} onChangeModal={onShowModal} />
        ) : (
          <Login onChangeRegister={setIsRegister} onChangeModal={onShowModal} />
        )}
      </div>
    </div>
  );
};

export default Modal;
