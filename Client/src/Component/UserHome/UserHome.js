import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Auth from '../../Authentication/Auth';
import Carousel from '../Carousel/Carousel';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
class UserHome extends React.Component{
    constructor(props) {
        super(props);
        this.auth = new Auth(this.props.history);
        
    }
    render(){
        console.log(this.props.match.params.data)
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
            <div className="container pt-3">
                <div className="jumbotron">
                    <p>Weklcome to your home {this.props.match.params.data}</p>
                    {/* <Link className="text-dark"className="btn btn-success btn-sm" to="/login">LogOut</Link> */}
                </div>
            </div>
            </>
        );
    }
}

export default UserHome