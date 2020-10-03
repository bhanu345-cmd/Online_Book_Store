import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Navbar from '../Navbar/Navbar';
import Services from '../Others/Services.js';
import Footer from '../Others/Footer';
import './Orders.css';
import {orders,getCartItems} from '../UserFunctions/UserFunctions';
import carousel1 from '../Images/carousel1.jpg';
// import {getCartItems} from '../UserFunctions/UserFunctions.js';
export default class Orders extends React.Component{
    state={displayCart:false,result:[],message:"",count:0};
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
    componentDidMount(){
        orders(this.auth.getUserName()).then((res)=>{
            if(res.message==true){
                this.setState({result:res.orders});
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
    render(){    
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}} count={this.state.count}/>
            </div>
            <div className="container-fluid">
             <div className="row tablerow">
                <div className="col">
                    <table className="table-striped orderTable">
                        <thead className="text-center">
                            <th>
                            <h5 className="card-title text-dark"><span >My Orders</span></h5>
                            </th>
                            <th className="collapselink">
                            <a href="#" data-toggle="collapse" data-target="#bookdetails" aria-expanded="true" aria-controls="bookdetails">
                                <h4 className="text-dark"><span >Show Details</span></h4>
                            </a>
                            </th>
                        </thead>
                        <hr className="orderHr"/>
                        <tbody>
                            {this.state.result.map((cartItem,index)=>{
                                return(<>
                                    <tr key={index} style={{paddingLeft:"20px"}}>
                                        <td className="imgTd">
                                            <img src={carousel1} className="img-thumbnail orderimg" alt="..." height="200px" />
                                        </td>
                                        <td className="detalisBook">
                                            <h5 className="card-title text-dark"><span >{cartItem.book.bookName}</span></h5>
                                            <div id="bookdetails" className="collapse">
                                                <p className="card-text"><span className="text-muted small">-by {cartItem.book.author}</span></p>
                                                {/* <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr" style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p> */}
                                                <p className="card-text">Quantity:<span>{cartItem.quantity}</span></p>
                                                <p className="card-text pb-0 mt-2">
                                                    Cost :<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{cartItem.totalPrice}</span>
                                                </p> 
                                            </div>
                                        </td>
                                    </tr>
                                    <hr className="orderHr"/></>
                                );
                            })}
                        </tbody>
                    </table>
{/*                     
                    {this.state.result.map((cartItem,index)=>{
                    return(
                        <div className="card flex-row w-50 mt-3" key={index}> 
                        <img src={carousel1} className="card-img cartimg" alt="..." height="200px" />
                        <div className="card-body">
                                <h5 className="card-title text-dark"><span >{cartItem.book.bookName}</span></h5>
                                <div id="bookdetails">
                                <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                                <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr" style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                                <p className="card-text">Quantity:<span>{cartItem.quantity}</span></p>
                                <p className="card-text pb-0 mt-2">
                                    Total Amount:<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{cartItem.totalPrice}</span>
                                </p> 
                                </div>   
                        </div>
                    </div> 
);
                })} */}
              </div>
              </div>
              </div>
            <Services /> <Footer />
            </Aux>
        )
    }

}