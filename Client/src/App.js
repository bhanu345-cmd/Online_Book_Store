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
  componentWillMount(){
    this.authValue=this.auth.isAuthenticated();
  }
  render(){
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} /> 
        <Route path="/" exact component={Home}/>
        {this.authValue ? <Route path="/Home/:data" component={Home}/> : <Redirect to='/'/>}
      </Switch>
    </Router>
  );
  }
}

export default App;