import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Redirect from='/' to='/join' noThrow/>
      <Route path='/join' eaxct component={Join} />
      <Route path='/chat' eaxct component={Chat} />
    </Router>
  )
}

export default App;