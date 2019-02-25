import * as React from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

import logo from './logo.svg';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
    <Button onClick={
      // tslint:disable-next-line: jsx-no-lambda
      () => window.alert("Hello, React-Bootstrap!")
    }>Push!</Button>
  </div>
);

export default App;
