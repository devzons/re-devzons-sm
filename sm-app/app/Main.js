import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('devzonsappToken')))

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path='/' exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
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
