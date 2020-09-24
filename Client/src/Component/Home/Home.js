import React from 'react';
import Navbar from '../Navbar/Navbar';
import Carousel from '../Carousel/Carousel';
import LeftNavbar from '../Navbar/LeftNavbar';
class Home extends React.Component{
    render(){
        return(
            <>
            <Navbar />
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2">
                    <LeftNavbar />                    
                </div>
                <div className="col w-100">
                    <Carousel />
                </div>
            </div>            
            </>
        );
    }
}
export default Home;