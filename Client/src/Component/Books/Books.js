import React from 'react';
import './Books.css';
import carousel1 from '../Images/carousel1.jpg';
import Axios from 'axios';
import Auth from '../../Authentication/Auth.js';
export default class Books extends React.Component{
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
    }
    render(){
        return(
                <div className="row">
                    {this.props.display? this.props.books.map((book,index)=>{
                      return( 
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7 booksCard cardcontainer" key={book._id}>
                            <div className="card mt-4 ">
                            <a data-toggle="collapse" href="#collapse-example" aria-expanded="true" aria-controls="collapse-example" id="heading-example" class="d-block">
                                <img src={carousel1} className="card-img-top" alt="..."/></a>
                                <div className="card-body" key={index}>
                                    <h5 className="card-title">{book.bookName}</h5>
                                    <div id="collapse-example" className="collapse mb-3" aria-labelledby="heading-example">
                                    <p className="card-text">This is the book of your choice</p>
                                    </div>
                                    <p className="card-text authorName">Author:<span>{book.author}</span></p>
                                    <p className="card-text">Category:<span>{book.category}</span></p>
                                    <p className="card-text">Price:{' '}<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{book.price}</span></p>
                                    <div className="card-footer">
                                       {!this.auth.isAuthenticated()?
                                       <>
                                       <button  className="btn btn-danger btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg" >Buy</button>
                                       <button className="btn btn-success btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg">Add to Cart</button>    
                                       </>:<>
                                       <button  className="btn btn-danger btn-sm" onClick={()=>this.props.addToCart(book._id)}>Buy</button>
                                       <button className="btn btn-success btn-sm" onClick={()=>this.props.addToCart(book._id)}>Add to Cart</button>    
                                       </>}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                      );
                    }): this.props.searchResult.map((book,index)=>{
                        return( 
                          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7 booksCard cardcontainer">
                                <div className="card mt-4">
                                    <img src={carousel1} className="card-img-top" alt="..."/>
                                    <div className="card-body" key={index}>
                                        <h5 className="card-title">{book.bookName}</h5>
                                        <p className="card-text authorName">Author:<span>{book.author}</span></p>
                                        <p className="card-text">Category:<span>{book.category}</span></p>
                                        <p className="card-text">Price:{' '}<i className="fa fa-inr"style={{fontSize:"12px"}}></i><span className="text-primary font-weight-bold">{book.price}</span></p>
                                        <div className="card-footer">
                                        {!this.auth.isAuthenticated()?
                                       <>
                                       <button  className="btn btn-danger btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg" >Buy</button>
                                        <button className="btn btn-success btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg">Add to Cart</button>    
                                       </>:<>
                                       <button  className="btn btn-danger btn-sm" onClick={()=>this.props.addToCart(book._id)}>Buy</button>
                                       <button className="btn btn-success btn-sm" onClick={()=>this.props.addToCart(book._id)}>Add to Cart</button>    
                                       </>} 
                                        </div>
                                    </div>
                                </div>
                          </div>
                        )})}
                        {this.props.message &&<div className="col-lg-12">
                        <h5 className="mt-4">{this.props.message }</h5>
                        </div>}
                    </div>
        
        );
    }
}