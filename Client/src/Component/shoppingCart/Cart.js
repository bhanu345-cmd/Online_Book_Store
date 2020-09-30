import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Navbar from '../Navbar/Navbar';
import carousel1 from '../Images/carousel1.jpg';
import './Cart.css';
import {decrement,increment,deleteBook,getCartItems} from '../UserFunctions/UserFunctions.js';
export default class Cart extends React.Component{
    state={searchItem:"",display:true,result:[],message:"",totalAmount:0};
    constructor(props){
        super(props);
        this.state={
            cartItems:[],
            message:"",
            totalAmount: 0,
            displayCart:false
        };
        this.auth=new Auth(this.props.history);
    }
    componentDidMount(){
        getCartItems(this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                this.setState({cartItems:res.cartItems},()=>{
                    let priceArray=this.state.cartItems.map((cartItem)=>{
                        return cartItem.totalPrice;
                    });
                    let sum=priceArray.reduce((totalValue,currentValue)=>{
                        return totalValue+currentValue;
                    },0);
                    this.setState({totalAmount:sum});
                });
            }else{
                this.setState({message:"Your Cart is empty"});
            }
        });
        
    }
    logoutHandler=()=>{
        this.auth.logout();
    }
    decrementHandler=(id)=>{
        decrement(id,this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                this.setState({message:`decremented Successfully`});
                window.location.reload();
            }else{
                this.setState({message: `Unable to do the action please try again later`},()=>{
                    alert(this.state.message);
                });
                
            }
        }).catch((err=>this.setState({message:'Error in loading the cart'})));

    }
    incrementHandler= (event,id)=>{
        increment(id,this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                this.setState({message:`incremented Successfully`});
                window.location.reload();
            }else{
                this.setState({message: `Unable to do the action please try again later`},()=>{
                    alert(this.state.message);
                });
                
            }
        }).catch((err=>this.setState({message:'Error in loading the cart'})));

    }
    deletecartItem=(id)=>{
       deleteBook(id,this.auth.getUserName()).then((res)=>{    
        if(res.message===true){
                this.setState({message:`increemented Successfully`});
                window.location.reload();
            }else{
                this.setState({message: `Unable to do the action please try again later`});
                alert(this.state.message);
            }
        });
    }
    render(){
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.cartItems.length}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 cart-col1-Card">
                        <h5 className="mt-3">Cart Items</h5>
                        {this.state.cartItems.map((cartItem,index)=>{
                            return(
                                <div className="card flex-row w-75 " > 
                                    <img src={carousel1} className="card-img cartimg" alt="..." height="200px" />
                                    <div class="card-body" key={index}>
                                            <h5 className="card-title"><span>{cartItem.book.bookName}</span></h5>
                                            <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                                            <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr" style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    {cartItem.quantity===1?<button className="btn btn-danger" disabled>-</button> : <button className="input-group-text bg-danger" type="button" onClick={()=>this.decrementHandler(cartItem.book._id)}>-</button>}    
                                                </div>
                                                <input type="text" className="border-0 bg-light text-center"  style={{ width: "30px" }} value={cartItem.quantity} readOnly aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text bg-success" type="button" onClick={(e)=>this.incrementHandler(e,cartItem.book._id)}>+</span>                                
                                                </div>
                                            </div>
                                            
                                                <div className="d-flex align-items-center">
                                                    <p className="card-text pb-0 mt-2">
                                                        Total Amount:<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{cartItem.totalPrice}</span>
                                                    </p> 
                                                    <button className="btn btn-danger btn-sm ml-auto" type="button" onClick={()=>this.deletecartItem(cartItem.book._id)}><i class="fa fa-trash" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}}></i></button> 
                                                </div>
                                    </div>
                                </div> 
                        );
                        })}
                    </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
              <div class="card w-75 mt-5">  
                <div class="card-body">
                    <h5 class="card-title">Cart Details</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Total Cart Items: {this.state.cartItems.length}</li>
                    <li class="list-group-item">Total Cart Amount: {this.state.totalAmount}</li>
                    {/* <li class="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div class="card-body">
                <button className="btn btn-success form-control" type="button">Place Order</button>
                </div>
                </div>
              </div>
              </div> 
              </div>       
            </Aux>
        )
    }

}

