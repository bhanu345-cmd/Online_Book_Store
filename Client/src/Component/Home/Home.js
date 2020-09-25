import React from 'react';
import Navbar from '../Navbar/Navbar';
import Carousel from '../Carousel/Carousel';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
import Footer from '../Others/Footer';
import Services from '../Others/Services';
import './Home.css';
import Auth from '../../Authentication/Auth.js';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    logoutHandler=()=>{
        this.auth.logout();
    }
    render(){
        return(
            <div className="container-relative">
            <Navbar {...this.props} logout={()=>{this.logoutHandler()}}/>
            <div className="row">
                <div className="col-12">
                <Carousel />
                </div>
                <div className="leftNavbar col-2 ">
                    <LeftNavbar />                    
                </div>
                <div className="col-lg-10 col-md-10 col-sm-10 w-100">                    
                    <Books />
                </div>
            </div>
            <hr className="hrhome"/>
            <Services />
            <hr className="hrhome"/>
            <Footer />          
            </div>
        );
    }
}
export default Home;