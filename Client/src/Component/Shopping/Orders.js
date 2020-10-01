import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Axios from 'axios';
import {search} from '../Search/SearchFunctions.js';
import Navbar from '../Navbar/Navbar';
import carousel1 from '../Images/carousel1.jpg';
import './Cart.css';
class Orders extends React.Component{
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
    
    render(){
        const {errors} = this.state;    
        return(
            <Aux>
            <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.cartItems.length}/>
                {/* <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-7">
                    <h5 className="ml-3">Cart Items</h5>
                {this.state.cartItems.map((cartItem,index)=>{
                    // this.state.totalAmount= this.state.totalAmount+cartItem.totalPrice;
                    return(
                        <div className="card mb-3 ml-5 cart-col1-Card" > 
                        <div className="row no-gutters">
                        <div class="col-md-4 cartimg">
                            <img src={carousel1} className="card-img cartimg" alt="..." height="290" />
                        </div>
                        <div class="col-md-8 col-lg-8 col-sm-8">
                            <div class="card-body"  key={index}>
                            <p className="card-text font-weight-bolder"><span style={{fontSize:'15px'}}>{cartItem.book.bookName}</span></p>
                            <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                            <p className="card-text">Category:<span>{cartItem.book.category}</span></p>
                            <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                            </div>
                        </div>
                        </div>
                </div> 
                );
                })}
              </div>
              </div>         */}
              <h1>This is my cart</h1>
            </Aux>
        )
    }

}
export default Orders;
