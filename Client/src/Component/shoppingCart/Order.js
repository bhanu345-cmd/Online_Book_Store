import React from 'react';
import Auth from '../../Authentication/Auth.js';
import Aux from '../../hoc/Auxiliary.js';
import Navbar from '../Navbar/Navbar';
import './Cart.css';
import {orders} from '../UserFunctions/UserFunctions';
import carousel1 from '../Images/carousel1.jpg';
export default class Orders extends React.Component{
    state={displayCart:false,result:[],message:""};
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

    }
    render(){    
        return(
            <Aux>
            <div className="container-fluid">
                <Navbar {...this.props} userName={this.auth.getUserName()} display={this.state.displayCart} logout={()=>{this.logoutHandler()}}/>
            </div>
            <div className="container">
             <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 cart-col1-Card">
                    <h5 className="mt-3">Ordered Items</h5>
                    {this.state.result.map((cartItem,index)=>{
                    return(
                        <div className="card flex-row w-50 mt-3" key={index}> 
                        <img src={carousel1} className="card-img cartimg" alt="..." height="200px" />
                        <div className="card-body">
                                <h5 className="card-title"><span>{cartItem.book.bookName}</span></h5>
                                <p className="card-text">Author:<span>{cartItem.book.author}</span></p>
                                <p className="card-text">Price(per copy):{' '}<i className="fa fa-inr" style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold price">{cartItem.book.price}</span></p>
                                <p className="card-text pb-0 mt-2">
                                    Total Amount:<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{cartItem.totalPrice}</span>
                                </p> 
                                        
                        </div>
                    </div> 
);
                })}
              </div>
              </div>
              </div>        
            </Aux>
        )
    }

}

