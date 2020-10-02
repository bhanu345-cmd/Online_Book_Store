import React from 'react';
import {Route, BrowserRouter as Router,Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Cart from './Component/Shopping/Cart';
import Orders from './Component/Shopping/Orders';
import Auth from './Authentication/Auth.js';
import Admin from './Component/Admin/Admin';
class App extends React.Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  // componentWillMount(){
  //   this.authValue=this.auth.isAuthenticated();
  // }
  render(){
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home}/>
        <Route path="/Home" render={(props)=>this.auth.isAuthenticated()?<Home {...props}/>:<Redirect to='/'/>}/>
        <Route path="/cart" render={(props)=>this.auth.isAuthenticated()?<Cart {...props} userName={this.auth.getUserName()}/>:<Redirect to='/login'/>}/>
        <Route path="/orders" render={(props)=>this.auth.isAuthenticated()?<Orders {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
    
  );
  }
}

export default App;