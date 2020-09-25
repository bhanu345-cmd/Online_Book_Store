import React,{useHistory} from 'react';
import './Navbar.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Auth from '../../Authentication/Auth.js';
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    render(){
        console.log(this.props);
        return(
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top topnav">
                    {!this.auth.isAuthenticated() && <a className="navbar-brand" href="/"><strong>Book Store</strong></a>}
                    {this.auth.isAuthenticated() && <a className="navbar-brand" href="#"><strong>Book Store</strong></a>}
                    <div className="nav navbar-nav navbar-right w-auto col-lg-8 col-md-8 col-sm-6 search">
                    <div class="input-group input-group-sm mb-2">
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        <div class="input-group-append">
                            <button class="btn btn-info" type="button">
                                <i class="fa fa-search fa-lg"></i>
                            </button>
                        </div>            
                    </div>
                    </div>
                    {/* <a className="navbar-brand" href="/home"><strong>Book Store</strong></a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                {/* <a className="nav-link text-dark" href="#">Home</a> */}
                                
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#aboutUs">AboutUs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#services">Services</a>
                            </li> */}
                        </ul>
                        <ul className="navbar-nav">
                            {!this.auth.isAuthenticated() && <li className="nav-item">
                                <Link className="nav-link text-dark" to="/login">LogIn</Link>
                            </li>}
                            {!this.auth.isAuthenticated()&&<li className="nav-item">
                                <a className="nav-link text-dark" href="/register">SignUp</a>
                            </li>}
                            {this.auth.isAuthenticated()&& this.props.match.params.data && 
                            // <li>Welcome {this.props.match.params.data}</li>
                            <li className="nav-item dropdown">
                            <a className="nav-link text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o"></i></a>
                            <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Hi!! {this.props.match.params.data}</a></div>
                            </li>
                            }
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#"><i className="fa fa-shopping-cart"></i></a>
                            </li>
                            {this.auth.isAuthenticated() && <li className="nav-item"><button className="btn btn-success" onClick={this.props.logout}>LogOut</button></li>}
                        </ul>
                        
                    </div>
                </nav>
            </>
        );
    }
    
}
export default Navbar