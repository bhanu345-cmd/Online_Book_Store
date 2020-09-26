import React from 'react';
import Navbar from '../Navbar/Navbar';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
import Footer from '../Others/Footer';
import Services from '../Others/Services';
import Authors from '../Authors/Authors';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
class BooksOnSearch extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    logoutHandler=()=>{
        this.auth.logout();
    }
    render(){
        return(
            <>
            <Navbar {...this.props} logout={()=>{this.logoutHandler()}}/>
            <div className="row">
                <div className=" col-lg-2 col-md-2 col-sm-2 bg-white ml-2">
                    <LeftNavbar />                    
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 ml-2 books">
                    <Books />
                </div>
            </div>
            <hr className="hrhome"/>
            <Services />
            <hr className="hrhome"/>
            <Footer />    
            </>
        )
    }
}
export default BooksOnSearch;