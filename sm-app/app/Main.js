import React, { useEffect, useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8090'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'
import Profile from './components/Profile'
import EditPost from './components/EditPost'
import NotFound from './components/NotFound'
import Search from './components/Search'

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('devzonsappToken')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('devzonsappToken'),
      username: localStorage.getItem('devzonsappUsername'),
      avatar: localStorage.getItem('devzonsappAvatar'),
    },
    isSearchOpen: false,
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true
        draft.user = action.data
        return
      case 'logout':
        draft.loggedIn = false
        return
      case 'flashMessage':
        draft.flashMessages.push(action.value)
        return
      case 'openSearch':
        draft.isSearchOpen = true
        return
      case 'closeSearch':
        draft.isSearchOpen = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('devzonsappToken', state.user.token)
      localStorage.setItem('devzonsappUsername', state.user.username)
      localStorage.setItem('devzonsappAvatar', state.user.avatar)
    } else {
      localStorage.removeItem('devzonsappToken')
      localStorage.removeItem('devzonsappUsername')
      localStorage.removeItem('devzonsappAvatar')
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path='/' exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path='/profile/:username' component={Profile} />
            <Route path='/post/:id' exact component={ViewSinglePost} />
            <Route path='/post/:id/edit' exact component={EditPost} />
            <Route path='/create-post' component={CreatePost} />
            <Route path='/about-us' component={About} />
            <Route path='/terms' component={Terms} />
            <Route component={NotFound} />
          </Switch>
          {state.isSearchOpen ? <Search /> : ''}
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}
