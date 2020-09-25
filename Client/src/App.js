import React from 'react';
import {Route, BrowserRouter as Router, Switch,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import UserHome from './Component/UserHome/UserHome';
import Home from './Component/Home/Home';
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
      <Route path="/" exact component={Home}  />
        <Route path="/register" exact component={Register} />
        <Route path="/login" component={Login} />
        {this.auth.isAuthenticated() ? <Route path="/userhome/:userName" component={UserHome}/> :
        <Redirect to="/" />
        }
      </Switch>
    </Router>
  );
  }
}
export default App;
