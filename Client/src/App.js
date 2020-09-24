import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import UserHome from './Component/UserHome/UserHome';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/userhome/:userName" component={UserHome}/>
      </Switch>
    </Router>
  );
}

export default App;
