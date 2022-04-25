import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Navigation';
import './main.scss';
import PetList from './Components/PetList'

const Home = () => {

  return <>
    <Navigation />
    <PetList/>
  </>
};

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
