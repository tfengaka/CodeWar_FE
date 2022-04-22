<<<<<<< Updated upstream
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const schemaValidation = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});

const Login = ({ onChangeRegister, onChangeModal }) => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: 'onChange',
  });
  return (
    <>
      <div className='modal__body'>
        <form onSubmit={handleSubmit(auth.signIn)} autoComplete='off'>
          <div className='modal__body-control'>
            <input {...register('email')} type='text' id='email' placeholder='Email' />
            {errors?.email && (
              <div style={{ color: 'red', fontSize: '13px', padding: ' 3px 6px' }}>
                {errors.email?.message}
              </div>
            )}
          </div>
          <div className='modal__body-control'>
            <input {...register('password')} type='password' id='password' placeholder='Mật khẩu' />
            {errors?.password && (
              <div style={{ color: 'red', fontSize: '13px', padding: ' 3px 6px' }}>
                {errors.password?.message}
              </div>
            )}
          </div>
          <div className='modal__body-submit'>
            <Button size='lg'>
              {auth.loading ? <div className='loading'></div> : 'Đăng nhập'}
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
=======
import { useLazyQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFailure, loginStart, loginSuccess } from 'app/authSlice';
import Button from 'components/Button';
import { SIGN_IN } from 'graphql/Mutation';
import { queyUser } from 'graphql/Queries';
import jwt_decode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const schemaValidation = Yup.object({
  userEmail: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});

const Login = ({ onChangeRegister, onChangeModal }) => {
  const dispatch = useDispatch();
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: async (data) => {
      const newToken = data.login.access_token;
      const oldToken = localStorage.getItem('token');
      if (oldToken && oldToken === newToken) {
        localStorage.removeItem('token');
      }
      localStorage.setItem('token', newToken);
      await queyProfile({
        variables: {
          userID: jwt_decode(newToken).sub,
        },
      });
      onChangeModal(false);
    },
    onError: (error) => {
      dispatch(loginFailure());
      console.error(error);
    },
  });
  const [queyProfile] = useLazyQuery(queyUser, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(loginSuccess(data.account[0]));
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const handleLogin = async (values) => {
    dispatch(loginStart());
    await signIn({
      variables: {
        email: values.userEmail,
        password: values.password,
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: 'onChange',
  });
  return (
    <>
      <div className='modal__body'>
        <form onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
          <div className='modal__body-control'>
            {/* <label htmlFor='email'>Email</label> */}
            <input {...register('userEmail')} type='text' id='userEmail' placeholder='Email' />
            {errors?.userEmail && (
              <div style={{ color: 'red', fontSize: '13px', padding: ' 3px 6px' }}>
                {errors.userEmail?.message}
              </div>
            )}
          </div>
          <div className='modal__body-control'>
            {/* <label htmlFor='password'>Mật khẩu</label> */}
            <input {...register('password')} type='password' id='password' placeholder='Mật khẩu' />
            {errors?.password && (
              <div style={{ color: 'red', fontSize: '13px', padding: ' 3px 6px' }}>
                {errors.password?.message}
              </div>
            )}
          </div>
          <div className='modal__body-submit'>
            <Button size='lg'>
              {isSubmitting ? <div className='loading'></div> : 'Đăng nhập'}
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
>>>>>>> Stashed changes
