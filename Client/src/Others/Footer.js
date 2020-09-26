import React from 'react';
import './Footer.css';
import Aux from '../hoc/Auxiliary.js';
export default class Footer extends React.Component{
    render(){
    return(
        <Aux>
        <div className="row border p-4">
            <div className="col-lg-8 col-md-8 col-sm-8" id="aboutUs">
                <div className="footer_about">
                    <div className="footer_logo">
                        <strong><a href="#">Book Store</a></strong>
                    </div>
                    <p>
                    Reading books is the favourite pastime of many people. If you’re bitten by the book-bug too, then there is a massive collection of books for you to read. From bestsellers to new 
                    & future releases, the choices are exhaustive when you shop online at India's Largest Bookstore.
                    </p>
                    <div className="footer__payment ">
                    <a href="#"><i className="fa fa-cc-mastercard" aria-hidden="true"></i></a>
                    <a href="#"><i className="fa fa-cc-visa" aria-hidden="true"></i></a>
                    <a href="#"><i className="fa fa-credit-card" aria-hidden="true"></i></a>
                    <a href="#"><i className="fa fa-cc-paypal" aria-hidden="true"></i></a>
                </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 pt-5 ml-0">
                <div className="footer__social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-youtube-play"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-pinterest"></i></a>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <hr className="hrtag"/>
                <p className="text-muted text-center"><small>Copyright © 2020 All rights reserved</small></p>

            </div>
        </div>
        </Aux>
    );
    }
}

