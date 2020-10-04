import React from 'react';
import {Route, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Auth from './Authentication/Auth.js';
import Cart from './Component/shoppingCart/Cart.js';
import Orders from './Component/shoppingCart/Order.js';
import Admin from './Component/Admin/Admin.js';
import AddAuthor from './Component/AdminAuthor/AddAuthor.js';
import AddCategory from './Component/AdminCategory/AddCategory.js';
import AddBook from './Component/AdminBooks/AddBook.js';
import ShowAuthors from './Component/AdminAuthor/ShowAuthor';
import ShowCategories from './Component/AdminCategory/showCategory';
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
        <Route path="/admin" component={Admin} />
        <Route path="/Home" render={(props)=>this.auth.isAuthenticated()?<Home {...props}/>:<Redirect to='/'/>}/>
        <Route path="/shoppingCart" render={(props)=>this.auth.isAuthenticated()?<Cart {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/orders" render={(props)=>this.auth.isAuthenticated()?<Orders {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addAuthor" render={(props)=>this.auth.isAdminAuthenticated()?<AddAuthor {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addCategory" render={(props)=>this.auth.isAdminAuthenticated()?<AddCategory {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addBook" render={(props)=>this.auth.isAdminAuthenticated()?<AddBook {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showCategories" render={(props)=>this.auth.isAdminAuthenticated()?<ShowCategories {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showAuthors" render={(props)=>this.auth.isAdminAuthenticated()?<ShowAuthors {...props}/>:<Redirect to='/login'/>}/>
      </Switch>
    </div>
  );
  }
}


