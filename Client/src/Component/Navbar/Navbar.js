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
                    {this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/Home/${this.props.userName}`}}><strong>Book Store</strong></Link>}
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
                            {/* <li>
                            <a className="nav-link text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o"></i></a>
                            <div className="dropdown-menu pull-right">
                            <a className="dropdown-item" href="#">Hi!! {this.props.match.params.data}</a>
                            <p className="dropdown-item">Welcome</p>
                            </div>
                            </li> */}
                            </>
                            }
                            <li className="nav-item">
                               {this.auth.isAuthenticated() && <Link className="nav-link text-dark" to={{pathname:`/cart`}}><i className="fa fa-shopping-cart"></i></Link>}
                               {!this.auth.isAuthenticated() && 
                               <>
                               <a className="nav-link text-dark" href="#" data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-shopping-cart"></i></a>
                               {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm"><i className="fa fa-shopping-cart"></i></button> */}
                                <div class="modal fade bd-example-modal-lg" data-backdrop="false" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">You are not LoggedIn</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                                    <div class="modal-footer">
                                    <Link className="nav-link text-white btn btn-success" to="/login">LogIn</Link>
                                    </div>
                                    </div>
                                </div>
                                </div>
                               </>
                               }
                                {/* <a className="nav-link text-dark" href="/cart"><i className="fa fa-shopping-cart"></i></a> */}
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