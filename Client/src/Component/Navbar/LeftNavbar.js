import React from 'react';
import './LeftNavbar.css';
class LeftNavbar extends React.Component{
    render(){
        return(
            <>
            <div className="categories">
            <nav className="navbar bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Link 1</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Link 2</a>
                        </li>
                        <li className="nav-item">
                        <a class="nav-link" href="#">Link 3</a>
                        </li>
                    </ul>
            </nav>
            </div>
            <div className="container authors">
            <nav class="navbar bg-light">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" href="#">Link 1</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Link 2</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Link 3</a>
                        </li>
                    </ul>
            </nav>
            </div>
            </>
        );
    }
}
export default LeftNavbar