import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Navbar from '../Navbar/Navbar';
import {orders} from '../UserFunctions/UserFunctions';
import {Link} from 'react-router-dom';
import './Orders.css';
import Services from '../Others/Services.js';
import Footer from '../Others/Footer';
import {getCartItems} from '../UserFunctions/UserFunctions.js';
export default class Orders extends React.Component{
    state={displayCart:false,result:[],message:"",count: 0};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    componentDidMount(){
        orders(this.auth.getUserName()).then((res)=>{
            if(res.message===true){
                let orders=[];
                res.orders.map((order)=>{
                    order.orderedItems.map((orderedItem)=>{
                        orders.push(orderedItem);
                        return 0;
                    });
                    return 0;
                });
                this.setState({result:orders});
            }else{
                this.setState({message:"Place orders to view order list"});
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
    logoutHandler=()=>{
        this.auth.logout();
    }
    resetHandler=()=>{
        this.setState({result:[],message:""});
    }
    
    render(){ 
        console.log(this.state.result)   
        return(
            <Aux>
            <div className="container">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.count}/>
            </div>
            <div className="container-fluid">
                <div className="mt-5">
                <h3 className="text-dark"><span >My Orders</span></h3>
                                {this.state.result.map((cartItem,index)=>{
                                    
                                    return(
                                    <>
                                    <div className="row mt-3 font-custom-style" style={{border: "1px #ddd solid"}}>
                                        <div className="col-12">
                                            <div className="row  row-header-color">
                                                <div className="col">
                                                    <ul className="list-group list-group-horizontal">
                                                        <li className="list-group-item"><div className="row">ORDER PLACED</div>
                                                            <div className="row">Date</div>
                                                        </li>
                                                    <li className="list-group-item">
                                                        <div className="row">TOTAL</div>
                                                        <div className="row">{cartItem.totalPrice}</div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row">SHIP TO </div>
                                                        <div className="row"><span className="userName-color">{this.auth.getUserName()}</span></div>
                                                    </li>
                                                    </ul>
                                                </div>
                                            </div> 
                                        </div>
                                        <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 p-3">
                                                <h1 style={{fontSize:"20px"}}>Order Placed</h1>
                                                    <div className="row">
                                                    <div className="col-12">
                                                        <p className="m-0 para-style">Package will be handed directly to the customer.</p>
                                                    </div>
                                                    </div>
                                            
                                                    <div className="row">
                                                    <div className="col-12">
                                                        <p className="m-0 para-style">Signed by:{this.auth.getUserName()}</p>
                                                    </div>
                                                    </div>
                                                
                                                <div className="row m-3 bookDetails">
                                                    <div className="col-lg-7 col-md-7 col-sm-7">
                                                        <div className="d-flex justify-content-start">
                                                            <img src={`http://localhost:4000/${cartItem.book.bookimg}`} alt="..." height="100px" width="100px" className="border-secondary m-0"/>
                                                            <div className="ml-3 bookDetails">
                                                                <h5>{cartItem.book.bookName}</h5>
                                                                <p>Author: <span className="author-color">{cartItem.book.author}</span></p>
                                                                <p>Category: {cartItem.book.category}</p>
                                                                <p>Price: <i className="fa fa-inr" style={{fontSize:"12px"}}></i><span className="price-color">{cartItem.book.price}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 col-md-5 col-sm-5">
                                                        <div className="row">
                                                            <span className="btn-color"><Link to="#" role="button" className="m-3">Write Product Review</Link></span>
                                                        </div>
                                                        <div className="row">
                                                            <span className="btn-color"><Link to="#" role="button" className="m-3">Rate Product</Link></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </div>    
                                           
                                    </div>   
                                    </>
                                );
                            })}
                    </div>
                </div>
                <div className="container-fluid">
<hr className="hrtag"/>
                <Services />
                <Footer /> 
</div>    
            </Aux>
        )
    }

}