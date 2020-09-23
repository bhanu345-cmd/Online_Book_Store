import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './Component/Login/Login';
import UserHome from './Component/UserHome/UserHome';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/userhome/:email" component={UserHome}/>
      </Switch>
    </Router>
  );
}

export default App;
