import React from 'react';
import {Route, BrowserRouter as Router,Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Cart from './Component/Shopping/Cart';
import Orders from './Component/Shopping/Orders';
import Auth from './Authentication/Auth.js';
import Admin from './Component/Admin/Admin';
import AddBook from './Component/AdminBooks/AddBook';
import AddAuthor from './Component/AdminAuthor/AddAuthor';
import AddCategory from './Component/AdminCategory/AddCategory';
import ShowBooks from './Component/AdminBooks/ShowBooks';
import ShowAuthors from './Component/AdminAuthor/ShowAuthor';
import ShowCategories from './Component/AdminCategory/ShowCategory';
import EditProfile from './Component/Profile/EditProfile';
import BookUpdate from './Component/AdminBooks/BookUpdate';
import BookDescription from './Component/Books/BooksDescription';
import NotFound from './Component/NotFound';
class App extends React.Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render(){
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/" exact component={Home}/>
        <Route path="/admin" render={(props)=>this.auth.isAdminAuthenticated()?<Admin {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/Home" render={(props)=>this.auth.isAuthenticated()?<Home {...props}/>:<Redirect to='/'/>}/>
        <Route path="/cart" render={(props)=>this.auth.isAuthenticated()?<Cart {...props} userName={this.auth.getUserName()}/>:<Redirect to='/login'/>}/>
        <Route path="/orders" render={(props)=>this.auth.isAuthenticated()?<Orders {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/editDetails" render={(props)=>this.auth.isAuthenticated() && <EditProfile {...props} userName={this.auth.getUserName()}/>}/>
        <Route path="/addAuthor" render={(props)=>this.auth.isAdminAuthenticated()?<AddAuthor {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addCategory" render={(props)=>this.auth.isAdminAuthenticated()?<AddCategory {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addBook" render={(props)=>this.auth.isAdminAuthenticated()?<AddBook {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showCategories" render={(props)=>this.auth.isAdminAuthenticated()?<ShowCategories {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showAuthors" render={(props)=>this.auth.isAdminAuthenticated()?<ShowAuthors {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showBooks" render={(props)=>this.auth.isAdminAuthenticated()?<ShowBooks {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/bookUpdate" render={(props)=>this.auth.isAdminAuthenticated()?<BookUpdate {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/bookDescription" component={BookDescription}/>
        <Route component={NotFound} />
      </Switch>
    </Router>
    
  );
  }
}
export default App;