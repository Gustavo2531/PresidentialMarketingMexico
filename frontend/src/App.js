import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import IndexComponent from './components/index';
import CandidatesComponent from './components/candidates';
import SingleCandidateComponent from './components/singleCandidate';
import AboutComponent from './components/about';
import Comparecomponent from './components/compare';
import DebateComponent from './components/debate'

class App extends Component {
      render() {
          return (
              <BrowserRouter>
                  <div className="m-grid m-grid--hor m-grid--root m-page" style={{backgroundColor: "#f2f3f8"}}>
                      <Route exact path = "/" component = {IndexComponent} />
                      <Route exact path = "/about" component = {AboutComponent} />
                      <Route exact path = "/candidatos" component = {CandidatesComponent} />
                      <Route exact path = "/candidato/:id" component = {SingleCandidateComponent}/>
                      <Route exact path = "/comparar" component = {Comparecomponent}/>
                      <Route exact path = "/debate" component = {DebateComponent} />
                  </div>
            </BrowserRouter>
        );
      }
}

export default App;
