import React from 'react';
import './AdminNav.css';
import Aux from '../../hoc/Auxiliary.js';
import {Link } from 'react-router-dom';
class AdminNav extends React.Component{
    render(){
        return(
            <Aux>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" >
                   <div className="container-fluid">
                    <Link className="navbar-brand" to={{pathname:`/admin`}}><strong>Book Store</strong></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto adminNav">
                            <li className="nav-item dropdown">
                            <p className="nav-link text-dark" id="navbarBook" role="button" data-toggle="dropdown">
                            <span><i class="fa fa-book" aria-hidden="true"></i>Books</span>
                            </p>
                            <div className="dropdown-menu" aria-labelledby="navbarBook">
                                <Link className="nav-link text-dark" to="/addbook">Add Book</Link>
                                <hr />
                                <Link className="nav-link text-dark" to="">Show Books</Link>
                            </div>
                            </li>
                            <li className="nav-item dropdown">
                            <p className="nav-link text-dark" id="navbarAuthor" role="button" data-toggle="dropdown">
                            <span><i class="fa fa-user" aria-hidden="true"></i>Author</span>
                            </p>
                            <div className="dropdown-menu" aria-labelledby="navbarAuthor">
                                <Link className="nav-link text-dark" to="/addauthor">Add Author</Link>
                                <hr />
                                <Link className="nav-link text-dark" to="">Show Authors</Link>
                            </div>
                            </li>
                            <li className="nav-item dropdown">
                            <p className="nav-link text-dark" id="navbarCat" role="button" data-toggle="dropdown">
                            <span><i class="fa fa-list" aria-hidden="true"></i>Category</span>
                            </p>
                            <div className="dropdown-menu" aria-labelledby="navbarCat">
                                <Link className="nav-link text-dark" to="/addcategory">Add Category</Link>
                                <hr />
                                <Link className="nav-link text-dark" to="">Show Categories</Link>
                            </div>
                            </li>
                        </ul>
                        </div>  
                    </div>
                </nav>  
            </Aux>
        );
    }
}
export default AdminNav