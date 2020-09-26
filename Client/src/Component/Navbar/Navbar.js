import React,{useHistory} from 'react';
import './Navbar.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,NavLink} from 'react-router-dom';
import Search from '../Search/Search';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    
    render(){
        console.log(this.auth.isAuthenticated());
        return(
            <Aux>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                   {/* <NavLink className="navbar-brand" to="/#"><strong>Book Store</strong></NavLink> */}
                   {!this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/`}}><strong>Book Store</strong></Link>}
                    {this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/Home/${this.props.match.params.data}`}}><strong>Book Store</strong></Link>}
                        <Search {...this.props} auth={this.auth}/> 
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {!this.auth.isAuthenticated() && <li className="nav-item">
                                <Link className="nav-link text-dark" to="/login">LogIn</Link>
                            </li>}
                            {!this.auth.isAuthenticated()&&<li className="nav-item">
                                <a className="nav-link text-dark" href="/register">SignUp</a>
                            </li>}
                            {this.auth.isAuthenticated()&& this.props.match.params.data &&
                            <>                            
                            <li>
                            <a className="nav-link text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o"></i></a>
                            <div className="dropdown-menu pull-right">
                            <a className="dropdown-item" href="#">Hi!! {this.props.match.params.data}</a>
                            <p className="dropdown-item">Welcome</p>
                            </div>
                            </li>
                            </>
                            }
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#"><i className="fa fa-shopping-cart"></i></a>
                            </li>
                            {this.auth.isAuthenticated() && <li className="nav-item"><button className="btn btn-success" onClick={this.props.logout}>LogOut</button></li>}
                        </ul>
                        
                    </div>
                </nav>
            </Aux>
        );
    }
    
}
export default Navbar;