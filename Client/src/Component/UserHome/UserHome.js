import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../../Authentication/Auth.js'
class UserHome extends React.Component{
    // handleClick=()=>{
    //     this.props.history.push('/login');
    // }
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
            <div className="container pt-3">
                <div className="jumbotron">
                    <p>Weklcome to your home {this.props.match.params.userName}</p>
                    <Link className="text-dark"className="btn btn-success btn-sm" to="/login" onClick={this.logoutHandler}>LogOut</Link>
                </div>
            </div>
            </>
        );
    }
}

export default UserHome