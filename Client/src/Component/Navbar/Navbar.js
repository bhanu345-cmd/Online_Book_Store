import React,{useHistory} from 'react';
import './Navbar.css';
import {Link,NavLink} from 'react-router-dom';
import Profile from './Profile';
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
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" >
                   <div className="container-fluid">
                   {!this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/`}}><strong>Book Store</strong></Link>}
                    {this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/Home`}}><strong>Book Store</strong></Link>}
                    <div className="col-lg-8 col-md-6 col-sm-6">
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
                            {this.auth.isAuthenticated()&& this.props.userName &&
                            <>
                            <li>
                            <Profile {...this.props} auth={this.auth}/>
                            </li>
                            </>
                            }  
                            <li className="nav-item">
                               {this.auth.isAuthenticated() && <Link className="nav-link text-dark" to={{pathname:`/cart`}}><i className="fa fa-shopping-cart"></i><span class="badge cartBadge">4</span></Link>}
                               {!this.auth.isAuthenticated() && <><a className="nav-link text-dark" data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-shopping-cart"></i><span class="badge cartBadge">4</span></a>
                               <div className="modal fade bd-example-modal-lg" data-backdrop="false" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">You are not LoggedIn</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <h6>You need to login to</h6>
                                        <ul>
                                        <li>Check your Cart</li>
                                        <li>Add a book to Cart or Buy a book</li>
                                        </ul>
                                    </div>
                                    <div className="modal-footer">
                                    <Link className="nav-link text-white btn btn-success" to="/login">LogIn</Link>
                                    </div>
                                    </div>
                                </div>
                                </div>
                               </>}
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