import React,{useHistory} from 'react';
import './Navbar.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
class Navbar extends React.Component{
    render(){
        return(
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <a className="navbar-brand" href="/home"><strong>Book Store</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#aboutUs">AboutUs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#services">Services</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/login">LogIn</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/register">SignUp</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#"><i className="fa fa-shopping-cart"></i></a>
                            </li>
                        </ul>
                        {/* <ul className="navbar-nav ">
                            {props.userName ?
                            <>
                            <li className="nav-item dropdown">
                            <a className="nav-link text-dark" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o"></i></a>
                            <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Hi!! {props.userName.toUpperCase()}</a></div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#"><i className="fa fa-shopping-cart"></i></a>
                            </li>
                            <li className="nav-item">
                            
                            <button className="nav-link text-dark"className="btn btn-success btn-sm" onClick={props.handleClick}>LogOut</button> */}
                            {/* <a className="nav-link text-dark" href="/LoginForm" className="btn btn-success btn-sm">LogOut</a> */}
                            {/* </li> */}
                            {/* </> :
                            <>
                            <li className="nav-item">
                            <a className="nav-link text-dark" href="/login">LogIn</a>
                            </li>
                            <li className="nav-item">
                             <a className="nav-link text-dark" href="#">SignUp</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#"><i className="fa fa-shopping-cart"></i><span class="badge badge-pill badge-info">0</span></a>
                            </li>
                            </>
                            }
                        </ul> */}
                    </div>
                </nav>
            </>
        );
    }
    
}
export default Navbar