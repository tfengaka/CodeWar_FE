import Button from 'components/Button';
import React from 'react';

const Register = ({ onChangeRegister }) => {
  return (
    <>
      <div className='modal__body'>
        <form>
          <div className='modal__body-control'>
            {/* <label htmlFor='userName'>Họ và tên</label> */}
            <input type='text' id='userName' placeholder='Họ và tên' />
          </div>
          <div className='modal__body-control'>
            {/* <label htmlFor='email'>Email</label> */}
            <input type='email' id='email' placeholder='Email' autoComplete='none' />
          </div>
          <div className='modal__body-control'>
            {/* <label htmlFor='password'>Mật khẩu</label> */}
            <input type='password' id='password' placeholder='Mật khẩu' />
          </div>
          <div className='modal__body-control'>
            {/* <label htmlFor='repassword'>Nhập lại mật khẩu</label> */}
            <input type='password' id='repassword' placeholder='Nhập lại mật khẩu' />
          </div>
          <div className='modal__body-submit'>
            <Button type='submit' size='lg'>
              Đăng kí
            </Button>
          </div>
        </form>
      </div>
      <div className='modal__footer'>
        <div className='modal__footer-register'>
          <div className='modal__footer-link' onClick={() => onChangeRegister(false)}>
            <span>Đã có tài khoản, Đăng nhập!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
