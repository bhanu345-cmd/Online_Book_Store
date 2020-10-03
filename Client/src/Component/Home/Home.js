import React from 'react';
import Navbar from '../Navbar/Navbar';
import LeftNavbar from '../Navbar/LeftNavbar';
import Books from '../Books/Books';
import './Home.css';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Authors from '../Authors/Authors.js';
import Services from '../Others/Services.js';
import Footer from '../Others/Footer';
import {search} from '../UserFunctions/UserFunctions.js'
import Banner from '../Banner/Banner.js';
import Axios from 'axios';
import {getCartItems} from '../UserFunctions/UserFunctions.js';
class Home extends React.Component{
    state={searchItem:"",books:[],display:true,result:[],message:"",displaySearch:true,count:0};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    logoutHandler=()=>{
        this.setState({count:0},()=>{this.auth.logout();})  
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
        Axios.post(`http://localhost:4000/cart/addBook?id=${id}&userName=${this.auth.getUserName()}`).then((res)=>{
            console.log(res.data.message)    
            if(res.data.message===true){
                    this.props.history.push(`/cart`);           
                }else{
                    this.setState({message: `Unable to add to cart please try again later`});
                    alert(this.state.message);
                }
            });
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
        }).catch(err=>{this.setState({message:"404 error"})});
    }

    componentDidMount(){
        Axios.get("http://localhost:4000/book/getBook").then((res)=>{
            if(res.data.message===true){
                this.setState({books:res.data.books});
            }else{ 
                this.setState({message:"No books Found"});
            }
        }).catch(err=>this.setState({message:"404 error"}));

        if(this.auth.getUserName()){
            getCartItems(this.auth.getUserName()).then((res)=>{
                if(res.cartItems){
                    this.setState({count:res.cartItems.length});
                }
            }).catch(err=>{this.setState({message:"404 error"})});
        }
    }

    render(){
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} display={this.state.displaySearch} logout={()=>{this.logoutHandler()}} search={(e)=>this.changeHandler(e)} click={(e)=>this.getSearchResult(e)} userName={this.auth.getUserName()} count={this.state.count}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                        {this.state.display&&<Banner/>}
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
                        <Books {...this.props} books={this.state.books} searchResult={this.state.result} message={this.state.message} display={this.state.display} addToCart={this.addToCartHandler}/>
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