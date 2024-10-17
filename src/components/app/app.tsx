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
import { Routes, Route, useMatch, useLocation } from 'react-router-dom';
import {
  AppHeader,
  ProtectedRoute,
  OrderInfo,
  Modal,
  IngredientDetails
} from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '@slices';
import { useNavigate, useParams } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detaliHeader}`}>
                Детали ингридиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_digits-default ${styles.detaliHeader}`}
                >
                  #{orderNumber && orderNumber.padStart(6, '0')}
                </p>
                <OrderInfo />
              </div>
            }
          />
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
                <div className={styles.detailPageWrap}>
                  <p
                    className={`text text_type_digits-default ${styles.detaliHeader}`}
                  >
                    #{orderNumber && orderNumber.padStart(6, '0')}
                  </p>
                  <OrderInfo />
                </div>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => navigate('/feed')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => navigate('/profile/orders')}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
