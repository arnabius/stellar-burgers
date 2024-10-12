import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/userActions';
import { getIngredientsThunk } from '../../services/ingredientsActions';
import {
  getIngredients,
  getIngredientsLoading
} from '../../slices/ingredientsSlice';
import { Preloader } from '@ui';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getIngredients);

  const onModalClose = () => {
    navigate(-1);
  };

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredientsThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <>
        {loading ? (
          <Preloader />
        ) : ingredients.length > 0 ? (
          <Routes location={backgroundLocation || location}>
            <Route path='*' element={<NotFound404 />} />
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />

            <Route
              path='/login'
              element={<OnlyUnAuth component={<Login />} />}
            />
            <Route
              path='/register'
              element={<OnlyUnAuth component={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={<OnlyUnAuth component={<ForgotPassword />} />}
            />
            <Route
              path='/reset-password'
              element={<OnlyUnAuth component={<ResetPassword />} />}
            />
            <Route
              path='/profile'
              element={<OnlyAuth component={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<OnlyAuth component={<ProfileOrders />} />}
            />

            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={onModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={onModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <OnlyAuth
                  component={
                    <Modal title={''} onClose={onModalClose}>
                      <OrderInfo />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        ) : (
          <p>Нет ингредиентов</p>
        )}

        {ingredients.length > 0 && backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={onModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={onModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <OnlyAuth
                  component={
                    <Modal title={''} onClose={onModalClose}>
                      <OrderInfo />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
      </>
    </div>
  );
};

export default App;
