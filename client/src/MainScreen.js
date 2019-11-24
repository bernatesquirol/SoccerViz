import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Vega } from 'react-vega';
import ClassificationMain from './plots/ClassificationMain';

function App() {
  console.log(spec,data)
  return (
    <div className="App">
      <ClassificationMain></ClassificationMain>
    </div>
  );
}

export default App;