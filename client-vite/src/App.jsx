import React, { Suspense, createElement, forwardRef, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import './App.css';
import { Loading } from './components';

axios.defaults.withCredentials = true;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0061c2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#5c6bc0',
    }
  }
});

function lazyWithPreload(factory) {
  const ReactLazyComponent = lazy(factory);
  let PreloadedComponent;
  let factoryPromise;

  const Component = forwardRef(function LazyWithPreload(props, ref) {
      // Once one of these is chosen, we must ensure that it continues to be
      // used for all subsequent renders, otherwise it can cause the
      // underlying component to be unmounted and remounted.
      const ComponentToRender = useRef(
          PreloadedComponent ?? ReactLazyComponent
      );
      return createElement(
          ComponentToRender.current,
          ref ? { ...props, ref } : props
      );
  });

  Component.preload = () => {
      if (!factoryPromise) {
          factoryPromise = factory().then((module) => {
              PreloadedComponent = module.default;
              return PreloadedComponent;
          });
      }

      return factoryPromise;
  };

  return Component;
}

// Lazy loading the components
const Home = lazy(() => import('./pages/home'));
const HomeRoute = lazy(() => import('./pages/homeRoute'));
const Register = lazy(() => import('./pages/register'));
const Check = lazy(() => import('./pages/check'));
const Page404 = lazy(() => import('./pages/page404'));
const UserRoute = lazy(() => import('./pages/userRoute'));
const Login = lazy(() => import('./pages/login'));
const Game = lazyWithPreload(() => import('./pages/game'));
const User = lazy(() => import('./pages/user'));
const ListGame = lazy(() => import('./pages/list-game'));
const Profile = lazy(() => import('./pages/profile'));
const ContactUs = lazy(() => import('./pages/contact-us'));
const AdminRoute = lazy(() => import('./pages/adminRoute'));
const Admin = lazy(() => import('./pages/admin'));
const CreateGame = lazy(() => import('./pages/create-game'));
const UpdateGame = lazy(() => import('./pages/update-game'));
const AdminGame = lazy(() => import('./pages/admin-game'));
const Inbox = lazy(() => import('./pages/inbox'));
const Respond = lazy(() => import('./pages/respond'));
const AdminUser = lazy(() => import('./pages/admin-user'));

function App() {
  useEffect(()=>{
    Game.preload()
  },[])
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='background'>
        <div className="square"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/admin" element={<AdminRoute />}>
              <Route index element={<Admin />} />
              <Route path="inbox" element={<Inbox />} />
              <Route exact path="game" element={<AdminGame />} />
              <Route exact path="game/new" element={<CreateGame />} />
              <Route exact path="game/:id" element={<UpdateGame />} />
              <Route exact path="user/:id" element={<AdminUser />} />
              <Route path="respond/:username/:email" element={<Respond />} />
            </Route>
            <Route exact path="/" element={<HomeRoute />}>
              <Route index element={<Home />} />
              <Route path="login" exact element={<Login />} />
              <Route exact path="register" element={<Register />} />
              <Route exact path="register/email=:email" element={<Register />} />
              <Route exact path="check" element={<Check />} />
              <Route exact path='contact' element={<ContactUs />} />
            </Route>
            <Route exact path="/user" element={<UserRoute />}>
              <Route index element={<User />} />
              <Route exact path="game/:id" element={<Game />} />
              <Route exact path="game" element={<ListGame />} />
              <Route exact path="profile" element={<Profile />} />
            </Route>
            <Route exact path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;