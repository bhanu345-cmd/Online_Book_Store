import React from 'react';
import Navbar from '../Navbar/Navbar';
import Carousel from '../Carousel/Carousel';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
class Home extends React.Component{
    render(){
        return(
            <>
            <Navbar />
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2">
                    <LeftNavbar />                    
                </div>
                <div className="col-lg-10 col-md-10 col-sm-10 w-100">
                    <Carousel />
                    <Books />
                </div>
            </div>            
            </>
        );
    }
}
export default Home;