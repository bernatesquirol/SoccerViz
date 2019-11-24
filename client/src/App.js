import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Vega } from 'react-vega';
import ClassificationDetail from './plots/ClassificationDetail'

function App() {
  return (
    <div className="App">
      <ClassificationDetail></ClassificationDetail>
    </div>
  );
}

export default App;
