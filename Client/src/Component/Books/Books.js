import React from 'react';
import './Books.css';
import carousel1 from '../Images/carousel1.jpg';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Aux from '../../hoc/Auxiliary.js';
import Auth from '../../Authentication/Auth.js';
export default class Books extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            message:""
        };
        this.auth=new Auth(this.props.history);

    }
    
    componentDidMount(){
        Axios.get("http://localhost:4000/book/getBook").then((res)=>{
            if(res.data.message===true){
                this.setState({books:res.data.books});
            }else{
                this.setState({message:res.data.message});
            }
        });
    }
    addToCartHandler=(id)=>{
        console.log(id);
        Axios.post(`http://localhost:4000/cart/addBook?id=${id}&userName=${this.props.userName}`).then((res)=>{
        console.log(res.data.message)    
        if(res.data.message===true){
                this.props.history.push(`/cart`);               
            }else{
                this.setState({message: `Unable to add to cart please try again later`});
                alert(this.state.message);
            }
        });

    }
    render(){
        console.log(this.auth.isAuthenticated())
        console.log(this.props.userName);
        return(
            <Aux>
            <div className="container cardcontainer">
                <div className="row">
                <div className="col-12 divnames"><h4>Most Popular Books...</h4><hr /></div>
                    {this.props.display? this.state.books.map((book,index)=>{
                      return( 
                        <div className="col-lg-3 col-md-4 col-sm-6" >
                        <div className="card mt-4">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                        <div className="card-body" key={index}>
                        <p className="card-text font-weight-bolder"><span style={{fontSize:'15px'}}>{book.bookName}</span></p>
                        <p className="card-text">Author:<span>{book.author}</span></p>
                        <p className="card-text">Category:<span>{book.category}</span></p>
                        <p className="card-text">Price:{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold price">{book.price}</span></p>
                        <div className="card-footer">
                        {!this.auth.isAuthenticated() && 
                        <>
                            <button className="btn btn-danger btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg">Buy</button>
                            <button className="btn btn-success btn-sm float-right" data-toggle="modal" data-target=".bd-example-modal-lg">Add to Cart</button>
                        </>
                        }
                        {this.auth.isAuthenticated() &&
                        <>
                        <button className="btn btn-danger btn-sm">Buy</button>
                        <button className="btn btn-success btn-sm float-right" onClick={()=>this.addToCartHandler(book._id)}>Add to Cart</button>
                        </>
                        }
                        {/* <a href="#" className="btn btn-danger btn-sm">Buy</a>
                        <a href="#" className="btn btn-success btn-sm float-right" onClick={()=>this.addToCartHandler(book._id)}>Add to Cart</a> */}
                        </div>
                        </div>
                        </div>
                        </div>
                      );
                    }):this.props.searchResult.map((book,index)=>{
                        return( 
                          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7">
                                <div className="card mt-4">
                                    <img src={carousel1} className="card-img-top" alt="..."/>
                                    <div className="card-body" key={index}>
                                        <p className="card-text font-weight-bolder"><span style={{fontSize:'15px'}}>{book.bookName}</span></p>
                                        <p className="card-text">Author:<span>{book.author}</span></p>
                                        <p className="card-text">Category:<span>{book.category}</span></p>
                                        <p className="card-text">Price:{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold">{book.price}</span></p>
                                        <div className="card-footer">
                                        {!this.auth.isAuthenticated() &&
                                        <>
                                            <button className="btn btn-danger btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg">Buy</button>
                                            <button className="btn btn-success btn-sm float-right" data-toggle="modal" data-target=".bd-example-modal-lg">Add to Cart</button>
                                        </>
                                        }
                                        {this.auth.isAuthenticated() &&
                                        <>
                                        <button className="btn btn-danger btn-sm">Buy</button>
                                        <button className="btn btn-success btn-sm float-right" onClick={()=>this.addToCartHandler(book._id)}>Add to Cart</button>
                                        </>
                                        }
                                        </div>
                                    </div>
                                </div>
                          </div>
                        )})}
                        {this.props.message&&<div className="col-lg-12">
                        <h1>{this.props.message}</h1> </div>}                 
                    <div className="col-12 divnames"><hr /><h4>Books by Category</h4><hr /></div>
                    <div className="col-12 divnames"><hr /><h4>Books by Author</h4><hr /></div>
                </div>
            </div>
            </Aux>
        );
    }
}
