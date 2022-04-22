import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'app/authSlice';

const rootReducer = {
  auth: authReducer,
};

export default configureStore({
  reducer: rootReducer,
});
