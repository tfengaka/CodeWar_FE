import Button from 'components/Button';
import React from 'react';

function LoginPage() {
  return (
    <div className="login">
      <div className="container">
        <div className="login__title">
          <h3>Đăng Nhập</h3>
        </div>
        <div className="divider"></div>
        <div className="login__body">
          <form className="login__form">
            <div className="login__form-control">
              <input type="text" placeholder="UserName" />
            </div>
            <div className="login__form-control">
              <input type="password" placeholder="Password" />
            </div>
            <div className="login__form-submit">
              <Button size="lg">Đăng Nhập</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
