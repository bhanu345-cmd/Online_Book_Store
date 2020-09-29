import React from 'react';
import Navbar from '../Navbar/Navbar';
import Carousel from '../Carousel/Carousel';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
import './Home.css';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Authors from '../../Authors/Authors.js';
import Services from '../../Others/Services.js';
import Footer from '../../Others/Footer';
import {search} from '../Search/SearchFunctions.js'
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

    addToCartHandler=(id)=>{
        console.log(id);
        console.log(this.props.history);
        this.props.history.push('/shoppingcart');
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

    render(){
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} logout={()=>{this.logoutHandler()}} search={(e)=>this.changeHandler(e)} click={(e)=>this.getSearchResult(e)} userName={this.auth.getUserName()}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                        {this.state.display&&<Carousel />}
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
                        <Books {...this.props} searchResult={this.state.result} message={this.state.message} display={this.state.display} addToCart={this.addToCartHandler}/>
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