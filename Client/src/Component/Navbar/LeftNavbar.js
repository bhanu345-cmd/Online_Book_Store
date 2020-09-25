import React from 'react';
import './LeftNavbar.css';
class LeftNavbar extends React.Component{
    render(){
        return(
            <div className="leftNav">
            <div className="categories pb-2">
            <nav className="navbar bg-light">
            <h6 className="listName mb-0"><u>Categories</u></h6>
                    <ul className="navbar-nav pt-0 mt-0">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Mythology</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Horror</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Romance</a>
                        </li>
                    </ul>
            </nav>
            </div>
            <div className="authors pb-2">
            <nav className="navbar bg-light">
            <h6 className="listName mb-0"><u>Authors</u></h6>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Chaithan bagath singh</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Vyasamaharshi</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Valmiki</a>
                        </li>
                    </ul>
            </nav>
            </div>
            </div>
        );
    }
}
export default LeftNavbar