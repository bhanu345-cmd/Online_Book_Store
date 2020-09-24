import React from 'react';
import {Link} from 'react-router-dom';
class UserHome extends React.Component{
    // handleClick=()=>{
    //     this.props.history.push('/login');
    // }
    render(){
        return(
            <>
            <div className="container pt-3">
                <div className="jumbotron">
                    <p>Weklcome to your home {this.props.match.params.email}</p>
                    <Link className="text-dark"className="btn btn-success btn-sm" to="/login">LogOut</Link>
                </div>
            </div>
            </>
        );
    }
}

export default UserHome