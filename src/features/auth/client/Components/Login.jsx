import Button from 'components/Button';
import React from 'react';

const Login = ({ onChangeRegister }) => {
  return (
    <>
      <div className='modal__body'>
        <form>
          <div className='modal__body-control'>
            {/* <label htmlFor='email'>Email</label> */}
            <input type='email' id='email' placeholder='Email' autoComplete='none' />
          </div>
          <div className='modal__body-control'>
            {/* <label htmlFor='password'>Mật khẩu</label> */}
            <input type='password' id='password' placeholder='Mật khẩu' />
          </div>
          <div className='modal__body-submit'>
            <Button type='submit' size='lg'>
              Đăng Nhập
            </Button>
          </div>
        </form>
      </div>
      <div className='modal__footer'>
        <div className='modal__footer-login'>
          <div className='modal__footer-link' onClick={() => onChangeRegister(true)}>
            <span>Chưa có tài khoản, Đăng ký!</span>
          </div>
          <div className='modal__footer-link'>
            <span>Quên mật khẩu?</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
