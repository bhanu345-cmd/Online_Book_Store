import React from 'react';
import './LeftNavbar.css';
import {Link} from 'react-router-dom';
import Aux from '../../hoc/Auxiliary.js'
class LeftNavbar extends React.Component{
    render(){
        return(
            <Aux>
            <div className="categories">
            <h1 className="fontstyle text-dark">Categories</h1>
            <nav className="navbar">
                    <ul className="navbar-nav w-100 ">
                        <li className="nav-item text-center">
                        <Link className="nav-link text-dark" to="#">Category 1</Link>
                        </li>
                        <li className="nav-item text-center">
                        <Link className="nav-link text-dark" to="#">Category 2</Link>
                        </li>
                        <li className="nav-item text-center">
                        <Link class="nav-link text-dark" to="#">Category 3</Link>
                        </li>
                    </ul>
            </nav>
            </div>
            <div className="authors mb-2">
            <h1 className="fontstyle text-dark">Authors</h1>
            <nav class="navbar">
                    <ul class="navbar-nav w-100">
                        <li class="nav-item text-center">
                        <Link class="nav-link text-dark" href="#">Autho 1</Link>
                        </li>
                        <li class="nav-item text-center">
                        <Link class="nav-link text-dark" href="#">Author 2</Link>
                        </li>
                        <li class="nav-item text-center">
                        <Link class="nav-link text-dark" href="#">Author 3</Link>
                        </li>
                    </ul>
            </nav>
            </div>
            </Aux>
        );
    }
}
export default LeftNavbar