import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Home, HomeRoute, Register, Check, Page404, UserRoute, Login, Game, User, ListGame, Profile, ContactUs, AdminRoute, Admin, CreateGame, UpdateGame, AdminGame, Inbox, Respond, AdminUser } from './pages'
import axios from 'axios'
import './App.css'

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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="square"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin" element={<AdminRoute />}>
            <Route index element={<Admin />} />
            <Route path="inbox" element={<Inbox />} />
            <Route exact path="game" element={<AdminGame />} />
            <Route exact path="game/new" element={<CreateGame />} />
            <Route exact path="game/:id" element={<UpdateGame />} />
            <Route exact path="user/:id" element={<AdminUser />} />
            <Route exact path="respond/username=:username&email=:email" element={<Respond />} />
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
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App