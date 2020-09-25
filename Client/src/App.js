import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import UserHome from './Component/UserHome/UserHome';
import Home from './Component/Home/Home';
function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}  />
        <Route path="/register" exact component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/userhome/:data" component={UserHome} />
      </Switch>
    </Router>
  );
}

export default App;
