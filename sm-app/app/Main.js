import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8090'

import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('devzonsappToken')))

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path='/' exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path='/create-post' exact component={CreatePost} />
        <Route path='/about-us' exact component={About} />
        <Route path='/terms' exact component={Terms} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Main />, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}
