import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Instructions from './pages/instructions';
import Play from './pages/play'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/instructions' component={Instructions} />
        <Route path='/play' component={Play} />
      </Switch>
    </Router>
  );
}

export default App;


