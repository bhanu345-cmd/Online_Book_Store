import React from 'react';
import AdminNav from './AdminNav';
import Banner from '../Banner/Banner';
import Services from '../Others/Services';
import Footer from '../Others/Footer';
class Admin extends React.Component{
    render(){
        return(
            <>
            <div className="container-relative">
            <AdminNav />
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