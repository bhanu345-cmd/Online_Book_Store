import React from 'react';
import {Route, BrowserRouter as Router, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Auth from './Authentication/Auth.js';
class App extends React.Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render(){
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        {this.auth.isAuthenticated()?<Route path="/Home/:data" component={Home}/> : <Redirect to='/'/>}
        <Route path="/register" exact component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
  }
}

export default App;
