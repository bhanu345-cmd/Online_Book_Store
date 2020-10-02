import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Axios from 'axios';
import {search} from '../Search/SearchFunctions.js';
import Navbar from '../Navbar/Navbar';
import carousel1 from '../BookImages/sample.jpg';
import './Cart.css';
import {decrement,increment,deleteBook,getCartItems} from '../UserFunctions/UserFunctions.js';
class Cart extends React.Component{
    state={searchItem:"",display:true,result:[],message:""};
    constructor(props){
        super(props);
        this.state={
            cartItems:[],
            message:"",
            totalAmount: 0,
            errors:{
                cardNumber: "",
                cvv: ""
            }
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
                        console.log(currentValue);
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
    resetHandler=()=>{
        this.setState({result:[],message:""});
    }
    changeHandler=(event)=>{
        event.preventDefault();
        this.setState({searchItem:event.target.value});
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
                    this.setState({message:`Deleted Successfully`});
                    window.location.reload();
                }else{
                    this.setState({message: `Unable to do the action please try again later`});
                    alert(this.state.message);
                }
            });
    }
    handleChange=(event)=>{
        const {id,value}= event.target;
        let errors = this.state.errors;
        switch(id){
            case 'cardNumber':
                errors.cardNumber=
                value.length < 16
                  ? 'Card Number should be of 16 digits length!'
                  : '';
                 
              break;
            case 'cvv':
                errors.cvv=
                value.length < 3
                ? 'CVV should be of 3 digits length!'
                :'';
        }this.setState(            
            {errors}
        );        

    }
    handlePayment=(event)=>{
        event.preventDefault();        
        this.props.history.push('/orders');
    }
    render(){
        const {errors} = this.state;    
        return(
            <Aux>
            <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.cartItems.length}/>
                <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-7">
                    <h5 className="ml-3">Cart Items</h5>
                {this.state.cartItems.map((cartItem,index)=>{
                    // this.state.totalAmount= this.state.totalAmount+cartItem.totalPrice;
                    return(
                        <div className="card mb-3 ml-5 cart-col1-Card" > 
                        <div className="row no-gutters">
                        <div class="col-md-4 col-lg-4 col-sm-4 cartimg mr-0">
                            <img src={carousel1} className="card-img cartimg pl-3" alt="..." height="290" />
                        </div>
                        <div class="col-md-8 col-lg-8 col-sm-8 ml-0">
                            <div class="card-body"  key={index}>
                            <p className="card-text font-weight-bolder"><span style={{fontSize:'15px'}}>{cartItem.book.bookName}</span></p>
                            <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                            <p className="card-text">Category:<span>{cartItem.book.category}</span></p>
                            <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                            <p className="card-text quantity">
                            <div class="input-group">
                            <div class="input-group-append ">
                                {cartItem.quantity===1?
                                <button className="btn btn-danger" disabled>-</button> : 
                                <button className="btn btn-danger" type="button" onClick={()=>this.decrementHandler(cartItem.book._id)}>-</button>
                                }   
                            </div>
                            <input type="text" className="form-control" value={cartItem.quantity} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div class="input-group-append">
                                <button className="btn btn-success" type="button" onClick={(e)=>this.incrementHandler(e,cartItem.book._id)}>+</button>                                
                            </div>
                            </div>
                            </p>
                            <p className="card-text pb-0">
                            Total Amount:{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold price">{cartItem.totalPrice}</span>
                            <button className="btn btn-danger pull-right" type="button" onClick={()=>this.deletecartItem(cartItem.book._id)}><i class="fa fa-trash" aria-hidden="true"></i></button>  </p>  
                            </div>
                        </div>
                        </div>
                </div> 
                );
                })}
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5">
              <div class="card w-75 ml-0 m-5">  
                <div class="card-body">
                    <h5 class="card-title">Cart Details</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Total Cart Items: {this.state.cartItems.length}</li>
                    <li class="list-group-item">Total Cart Amount: {this.state.totalAmount}</li>
                    {/* <li class="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div class="card-body">
                <button className="btn btn-success form-control" type="button" data-toggle="modal" data-target="#modalLoginForm" data-backdrop="false">Place Order</button>
                <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">Payment Details</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handlePayment}>
                    <div className="modal-body mx-3">
                        <div className="row mb-2">
                        <div className="input-group paymentinp">
                            <input type="text" id="cardNumber" className="form-control validate" placeholder="xxxx xxxx xxxx xxxx" required onChange={this.handleChange}/>
                            <div className="input-group-append">
                                <span className="input-group-text bg-light"><i className="fa fa-credit-card fa-lg"></i></span>
                            </div>
                            </div>
                            <div className="float-right error">
                                {errors.cardNumber.length > 0 && 
                                    <span className='error'>{errors.cardNumber}</span>}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-8 pt-0 pr-1 pb-0 pl-0 ">
                            <input type="date" id="expiryDate" class="form-control validate" placeholder="mm/dd/yyyy" required/>
                            </div>
                            <div className="col-md-4 p-0">
                            <input type="password" id="cvv" class="form-control validate" placeholder="CVV" required onChange={this.handleChange}/>
                            </div>
                            <div className="float-right error">
                                {errors.cvv.length > 0 && 
                                    <span className='error'>{errors.cvv}</span>}
                            </div>                            
                        </div>
                        <div className="row mb-2">
                        <input type="text" id="cardHolderName" class="form-control validate" placeholder="Card Holder Name" required/>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">Pay</button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
                </div>
                </div>
              </div>
              </div>        
            </Aux>
        )
    }

}
export default Cart;
