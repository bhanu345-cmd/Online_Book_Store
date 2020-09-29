import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    render(){
        console.log(this.props);
        return(
            <Aux>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <div className="container-fluid">
                    {!this.auth.isAuthenticated() && <Link className="navbar-brand" to='/'><strong>Bookstore</strong></Link>}
                    {this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:"/Home/"+this.props.userName}}><strong>Book Store</strong></Link>}
                    <div className="col-lg-9 col-md-6 col-sm-6">
                        <form className="form-inline justify-content-center">
                            <input className="form-control mr-sm-2 w-50"type="text" placeholder="Search" aria-label="Search" onChange={this.props.search}/>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.click}>Search</button>
                        </form>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {!this.auth.isAuthenticated() && <li className="nav-item">
                                <Link className="nav-link text-dark" to="/login">LogIn</Link>
                            </li>}
                            {!this.auth.isAuthenticated()&&<li className="nav-item">
                                <Link className="nav-link text-dark" to="/register">SignUp</Link>
                            </li>}
                            {this.auth.isAuthenticated()&& this.props.userName && <li><a className="nav-link text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o"></i></a>
                            <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Hi!! {this.props.userName}</a></div></li>}
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#"><i className="fa fa-shopping-cart"></i></a>
                            </li>
                            {this.auth.isAuthenticated() && <li className="nav-item"><button className="btn btn-success" onClick={this.props.logout}>LogOut</button></li>}
                        </ul>
                        
                    </div>
                    </div>
                </nav>
            </Aux>
        );
    }
    
}
export default Navbar;