import React from 'react';
import Navbar from '../Navbar/Navbar';
import Carousel from '../Carousel/Carousel';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
import Auth from '../../Authentication/Auth';
class Home extends React.Component{
    constructor(props) {
        super(props);
        this.auth = new Auth(this.props.history);
    }
    render(){
        return(
            <>
            <Navbar auth={this.auth}/>
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