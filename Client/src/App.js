import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import UserHome from './Component/UserHome/UserHome';
import Auth from './Authentication/Auth';
class App extends React.Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render(){
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Login} />
        {this.auth.isAuthenticated && <Route path="/userhome/:userName" component={UserHome}/>}
      </Switch>
    </Router>
  );
  }
}

export default App;
