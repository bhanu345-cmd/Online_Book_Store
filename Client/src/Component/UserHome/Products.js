import React from 'react';
import Navbar from '../Navbar/Navbar';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
class Products extends React.Component{
    render(){
        return(
            <>
            <Navbar {...this.props} logout={()=>{this.logoutHandler()}}/>
            <p>This is Product Page</p>
            </>
        )
    }
}
export default Products