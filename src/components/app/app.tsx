import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import {
  AppHeader,
  ProtectedRoute,
  OrderInfo,
  Modal,
  IngredientDetails,
  OrderStatus
} from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients, getFeeds } from '@slices';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингридиента' onClose={() => navigate('/')}>
              <IngredientDetails />{' '}
            </Modal>
          }
        />
        <Route path='/feed' element={<Feed />}>
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
