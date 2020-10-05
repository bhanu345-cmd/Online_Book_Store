import React from 'react';
import AdminNav from './AdminNav';
import Banner from '../Banner/Banner';
import Services from '../Others/Services';
import Footer from '../Others/Footer';
import Auth from '../../Authentication/Auth';
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    render(){
        return(
            <>
            <div className="container-relative">
            <AdminNav logoutHandler={this.logoutHandler} />
            </div>
            <marquee><h2>This is Admin Home</h2></marquee>
            <Banner />
            <div className="container-fluid">
                <Services />
                <Footer /> 
            </div>
            </>
        )
    }

}
export default Admin