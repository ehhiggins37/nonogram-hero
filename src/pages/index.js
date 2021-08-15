import React from 'react';
import logo from '../nonogram-hero.png';


export default class Home extends React.Component {
  handleClick() {
    console.log('handle click')
    return
  }
  render(){
  return (
    <div>
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Let's get started.
      </p>
      <button onClick={this.handleClick}>
        Download me here!
      </button>
      </header>
      </div>
    </div>
  );
  }
};
