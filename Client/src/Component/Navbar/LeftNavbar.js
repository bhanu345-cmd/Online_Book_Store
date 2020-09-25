import React from 'react';
import './LeftNavbar.css';
class LeftNavbar extends React.Component{
    render(){
        return(
            <>
            <div className="categories pb-2">
            <nav className="navbar bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Category 1</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Category 2</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Category 3</a>
                        </li>
                    </ul>
            </nav>
            </div>
            <div className="authors pb-2">
            <nav className="navbar bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Autho 1</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Author 2</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Author 3</a>
                        </li>
                    </ul>
            </nav>
            </div>
            </>
        );
    }
}
export default LeftNavbar