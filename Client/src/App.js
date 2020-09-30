import React from 'react';
import {Route, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Auth from './Authentication/Auth.js';
import Cart from './Component/shoppingCart/Cart.js';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render(){
  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register"  component={Register} />
        <Route path="/" exact component={Home}/>
        <Route path="/Home" render={(props)=>this.auth.isAuthenticated()?<Home {...props}/>:<Redirect to='/'/>}/>
        <Route path="/shoppingCart" render={(props)=>this.auth.isAuthenticated()?<Cart {...props}/>:<Redirect to='/login'/>}/>
      </Switch>
    </div>
  );
  }
}


