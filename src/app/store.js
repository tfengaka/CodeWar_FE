import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';

const rootReducer = {
  auth: authReducer,
};

export default configureStore({
  reducer: rootReducer,
});
