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
import ShowAuthors from './Component/AdminAuthor/ShowAuthor';
import ShowCategories from './Component/AdminCategory/ShowCategory';
import EditProfile from './Component/Profile/EditProfile';
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
        <Route path="/admin" component={Admin} />
        <Route path="/Home" render={(props)=>this.auth.isAuthenticated()?<Home {...props}/>:<Redirect to='/'/>}/>
        <Route path="/cart" render={(props)=>this.auth.isAuthenticated() && <Cart {...props} userName={this.auth.getUserName()}/>}/>
        <Route path="/orders" render={(props)=>this.auth.isAuthenticated()&&<Orders {...props}/>}/>
        {/* <Route path="/addAuthor" component={AddAuthor} />
        <Route path="/addCategory" component={AddCategory} />
        <Route path="/addBook" component={AddBook} />
        <Route path="/showCategories" component={ShowCategories} />
        <Route path="/showAuthors" component={ShowAuthors} /> {...this.props} auth={this.auth}*/}
        <Route path="/editDetails" render={(props)=>this.auth.isAuthenticated() && <EditProfile {...props} userName={this.auth.getUserName()}/>}/>
        <Route path="/addAuthor" render={(props)=>this.auth.isAdminAuthenticated()?<AddAuthor {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addCategory" render={(props)=>this.auth.isAdminAuthenticated()?<AddCategory {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/addBook" render={(props)=>this.auth.isAdminAuthenticated()?<AddBook {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showCategories" render={(props)=>this.auth.isAdminAuthenticated()?<ShowCategories {...props}/>:<Redirect to='/login'/>}/>
        <Route path="/showAuthors" render={(props)=>this.auth.isAdminAuthenticated()?<ShowAuthors {...props}/>:<Redirect to='/login'/>}/>
      </Switch>
    </Router>
    
  );
  }
}

export default App;