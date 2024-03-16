import React, { useEffect, lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAPI } from './API/userApiCall';

import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

import './App.css';
import NotFound from './pages/NotFound/NotFound';
import Loading from './components/Loading/Loading';


// Import components lazily
const Home = lazy(() => import('./pages/Home/Home'));
const NewPost = lazy(() => import('./pages/NewPost/NewPost'));
const Search = lazy(() => import('./pages/Search/Search'));
const Account = lazy(() => import('./pages/Account/Account'));
const UpdateProfile = lazy(()=> import('./pages/UpdateProfile/UpdateProfile'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword/UpdatePassword'));
const UserProfile = lazy(()=> import("./pages/UserProfile/UserProfile"));

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(state => state.userInfo.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Login />;
};

const AppLayout = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.userInfo);

  useEffect(() => {
      dispatch(loadUserAPI());
  }, [dispatch]);

  return (
    <>
      {isAuthenticated && <Header />}
      <ProtectedRoutes />
      {/* <Footer /> */}
    </>
  );
};

const LazyLoadedComponent = ({ component: Component }) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);



export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <LazyLoadedComponent component={Home} /> },
      { path: '/newpost', element: <LazyLoadedComponent component={NewPost} /> },
      { path: '/search', element: <LazyLoadedComponent component={Search} /> },
      { path: '/account', element: <LazyLoadedComponent component={Account} /> },
      { path: '/update/profile', element: <LazyLoadedComponent component={UpdateProfile} /> },
      { path: '/update/password', element: <LazyLoadedComponent component={UpdatePassword} /> },
      { path: '/user/:id', element: <LazyLoadedComponent component={UserProfile} />}
    ]
  },
  { path: "/register", element:  <Register />},
  { path: "/forgot/password", element :<ForgotPassword/>},
  { path: "/password/reset/:token", element : <ResetPassword />},
  { path: "/*", element:<NotFound/>}
]);

export default AppRouter;
