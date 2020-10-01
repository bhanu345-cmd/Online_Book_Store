import React from 'react';
import Navbar from '../Navbar/Navbar';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
import Footer from '../Others/Footer';
import Services from '../Others/Services';
import Authors from '../Authors/Authors';
import {search} from '../UserFunctions/UserFunctions.js';
import Banner from '../Banner/Banner';
import './Home.css';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Axios from 'axios';
import {getCartItems} from '../UserFunctions/UserFunctions.js';
class Home extends React.Component{
    state={searchItem:"",display:true,result:[],message:""};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    logoutHandler=()=>{
        this.auth.logout();
    }
    resetHandler=()=>{
        this.setState({result:[],message:""});
    }
    changeHandler=(event)=>{
        event.preventDefault();
        this.setState({searchItem:event.target.value});
    }
    getSearchResult=async(event)=>{
        event.preventDefault();
        this.resetHandler();
        await this.setState({display:false});
        search(this.state.searchItem).then((searchResult)=>
                        {
                            if(searchResult.length>0){
                                this.setState({result:searchResult});
                            }else{
                                this.setState({message:`No book found with ${this.state.searchItem} name`});
                            }
        }).catch(err=>{this.setState({message:"Could not find"})});
    }
    componentDidMount(){
        if(this.auth.getUserName()){
            getCartItems(this.auth.getUserName()).then((res)=>{
                this.setState({count:res.cartItems.length});
            });
        }
        else{
            this.setState({count:0});
        }
    }
    render(){
        console.log(this.props);
        
        return(
            <Aux>
                
            {/* <div className=" sticky-top"> */}
                <Navbar {...this.props} logout={()=>{this.logoutHandler()}} search={(e)=>this.changeHandler(e)} click={(e)=>this.getSearchResult(e)} userName={this.auth.getUserName()} count={this.state.count}/>
            {/* </div> */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                    {this.state.display&&<Banner />}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className=" col-lg-2 col-md-3 col-sm-4 bg-white ml-lg-2 ml-md-0">
                        <LeftNavbar />                    
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-7 ">
                        {this.state.display&&<Authors/>}
                        <Books {...this.props} searchResult={this.state.result} message={this.state.message} display={this.state.display} userName={this.auth.getUserName()}/>
                         {/* addToCart={this.addToCartHandler}/> */}
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <Services />
                <Footer /> 
            </div>  
            </Aux>      
            
        );
    }
}
export default Home;