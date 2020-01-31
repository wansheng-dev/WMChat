import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/join' exact component={Join} />
      <Route path='/chat' exact component={Chat} />
    </Router>
  )
}

export default App;