import React, { Component } from 'react';
import Route from 'react-router-dom';

import './Main.css';

class Main extends Component {


 componentDidMount(){

 }

 render(){
   return (
      <div className='main-container'>
        {/* <Route path='/' exact component={ index } /> */}
        <Route path='/topics' exact component={ Topics } />
      </div>
   );
 }

}

export default Main;
