import React from 'react';
import {Route, BrowserRouter as Router, Switch ,Redirect} from 'react-router-dom';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Auth from './Authentication/Auth.js';
import BooksOnSearch from './Component/Search/BooksOnSearch';
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
      <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> 
        <Route path="/Home/:data/booksonsearch" component={BooksOnSearch} />
        {this.auth.isAuthenticated() ? <Route path="/Home/:data" component={Home}/> : <Redirect to='/'/>}
      </Switch>
    </Router>
  );
  }
}

export default App;