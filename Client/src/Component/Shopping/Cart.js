import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Axios from 'axios';
import {search} from '../Search/SearchFunctions.js';
import Navbar from '../Navbar/Navbar';
import carousel1 from '../Images/carousel1.jpg';
import './Cart.css';
class Cart extends React.Component{
    state={searchItem:"",display:true,result:[],message:""};
    constructor(props){
        super(props);
        this.state={
            cartItems:[],
            message:"",
            totalAmount: 0
        };
        this.auth=new Auth(this.props.history);
    }
    componentDidMount(){
        Axios.get(`http://localhost:4000/cart/getCartItems?userName=${this.props.userName}`).then((res)=>{
            if(res.data.message===true){
                this.setState({cartItems:res.data.cartItems});
            }else{
                this.setState({message:res.data.message});
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
    decrementHandler=(id)=>{
        console.log(id);
        Axios.post(`http://localhost:4000/cart/dec?id=${id}&userName=${this.props.userName}`).then((res)=>{
        console.log(res.data.message)    
        if(res.data.message===true){
                this.setState({message:`decremented Successfully`});
                window.location.reload();
            }else{
                this.setState({message: `Unable to do the action please try again later`});
                alert(this.state.message);
            }
        });

    }
    incrementHandler= (id)=>{
        console.log(id);
        Axios.post(`http://localhost:4000/cart/inc?id=${id}&userName=${this.props.userName}`).then((res)=>{
        console.log(res.data.message)    
        if(res.data.message===true){
                this.setState({message:`increemented Successfully`});
                window.location.reload();
            }else{
                this.setState({message: `Unable to do the action please try again later`});
                alert(this.state.message);
            }
        });
    }
    deletecartItem=(id)=>{
        console.log(id);
        Axios.post(`http://localhost:4000/cart/deleteBook?id=${id}&userName=${this.props.userName}`).then((res)=>{
        console.log(res.data.message)    
        if(res.data.message===true){
                this.setState({message:`increemented Successfully`});
                window.location.reload();
            }else{
                this.setState({message: `Unable to do the action please try again later`});
                alert(this.state.message);
            }
        });
    }
    render(){
        console.log(this.auth.isAuthenticated())
        return(
            <Aux>
            <Navbar {...this.props} logout={()=>{this.logoutHandler()}} search={(e)=>this.changeHandler(e)} click={(e)=>this.getSearchResult(e)}/>
                <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8">
                    <h5 className="ml-3">Cart Items</h5>
                {this.state.cartItems.map((cartItem,index)=>{
                    this.state.totalAmount= this.state.totalAmount+cartItem.totalPrice;
                    return(
                        <div className="card m-3 w-100" > 
                        <div className="row no-gutters">
                        <div class="col-md-4 cartimg">
                            <img src={carousel1} className="card-img cartimg" alt="..." height="290" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body"  key={index}>
                            <p className="card-text font-weight-bolder"><span style={{fontSize:'15px'}}>{cartItem.book.bookName}</span></p>
                            <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                            <p className="card-text">Category:<span>{cartItem.book.category}</span></p>
                            <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                            <p className="card-text quantity">
                            <div class="input-group">
                            <div class="input-group-append ">
                                <button className="btn btn-danger" type="button" onClick={()=>this.decrementHandler(cartItem.book._id)}>-</button>    
                            </div>
                            <input type="text" className="form-control" value={cartItem.quantity} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div class="input-group-append">
                                <button className="btn btn-success" type="button" onClick={()=>this.incrementHandler(cartItem.book._id)}>+</button>                                
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
              <div className="col-lg-4 col-md-4 col-sm-4">
              <div class="card w-75 m-5">  
                <div class="card-body">
                    <h5 class="card-title">Card Details</h5>
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
            </Aux>
        )
    }

}
export default Cart;