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
        return(
            <Aux>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                   {/* <NavLink className="navbar-brand" to="/#"><strong>Book Store</strong></NavLink> */}
                   {!this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/`}}><strong>Book Store</strong></Link>}
                    {this.auth.isAuthenticated()&&<Link className="navbar-brand" to={{pathname:`/Home/${this.props.match.params.data}`}}><strong>Book Store</strong></Link>}
                        <Search {...this.props}/>
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
                            {/* <li>
                            
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
                            </li> */}
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
                            {/* <li>
                                <Link to={{pathname:`/Home/${this.props.match.params.data}/products`}}>Profile</Link>
                            </li> */}
                            {this.auth.isAuthenticated() && <li className="nav-item"><button className="btn btn-success" onClick={this.props.logout}>LogOut</button></li>}
                        </ul>
                        
                    </div>
                </nav>
            </Aux>
        );
    }
    
}
export default Navbar;