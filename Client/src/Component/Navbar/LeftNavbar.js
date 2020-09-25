import React from 'react';
import './LeftNavbar.css';
class LeftNavbar extends React.Component{
    render(){
        return(
            <>
            <div className="categories ">
            <nav className="navbar bg-light">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item text-center">
                        <a className="nav-link" href="#">Category 1</a>
                        </li>
                        <li className="nav-item text-center">
                        <a className="nav-link" href="#">Category 2</a>
                        </li>
                        <li className="nav-item text-center">
                        <a class="nav-link" href="#">Category 3</a>
                        </li>
                    </ul>
            </nav>
            </div>
            <div className="authors mb-2">
            <nav class="navbar bg-light">
                    <ul class="navbar-nav w-100">
                        <li class="nav-item text-center">
                        <a class="nav-link" href="#">Autho 1</a>
                        </li>
                        <li class="nav-item text-center">
                        <a class="nav-link" href="#">Author 2</a>
                        </li>
                        <li class="nav-item text-center">
                        <a class="nav-link" href="#">Author 3</a>
                        </li>
                    </ul>
            </nav>
            </div>
            </>
        );
    }
}
export default LeftNavbar