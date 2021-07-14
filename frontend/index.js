import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Navigation';
import './main.scss';

const element = <>
  <Navigation />
</>

ReactDOM.render(
  element,
  document.getElementById('root')
)
