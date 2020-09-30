import React from 'react';
import './Books.css';
import carousel1 from '../Images/carousel1.jpg';
import Axios from 'axios';
export default class Books extends React.Component{
    state={
        books:[],
        message:""
    };
    componentDidMount(){
        Axios.get("http://localhost:4000/book/getBook").then((res)=>{
            if(res.data.message===true){
                this.setState({books:res.data.books});
            }else{
                this.setState({message:res.data.message});
            }
        });
    }
    render(){
        return(
                <div className="row">
                    {this.props.display? this.state.books.map((book,index)=>{
                      return( 
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7 booksCard" key={book._id}>
                            <div className="card mt-4">
                                <img src={carousel1} className="card-img-top" alt="..."/>
                                <div className="card-body" key={index}>
                                    <h5 className="card-title">{book.bookName}</h5>
                                    <p className="card-text">Author:<span>{book.author}</span></p>
                                    <p className="card-text">Category:<span>{book.category}</span></p>
                                    <p className="card-text">Price:$<span className="text-primary font-weight-bold">{book.price}</span></p>
                                    <div className="card-footer">
                                            <button  className="btn btn-danger btn-sm" onClick={()=>this.props.addToCart(book._id)}>Buy</button>
                                            <button className="btn btn-success btn-sm" onClick={()=>this.props.addToCart(book._id)}>Add to Cart</button>    
                                    </div>
                                </div>
                            </div>
                        </div>
                      );
                    }): this.props.searchResult.map((book,index)=>{
                        return( 
                          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-7 booksCard">
                                <div className="card mt-4">
                                    <img src={carousel1} className="card-img-top" alt="..."/>
                                    <div className="card-body" key={index}>
                                        <h5 className="card-title">{book.bookName}</h5>
                                        <p className="card-text">Author:<span>{book.author}</span></p>
                                        <p className="card-text">Category:<span>{book.category}</span></p>
                                        <p className="card-text">Price:$<span className="text-primary font-weight-bold">{book.price}</span></p>
                                        <div className="card-footer">
                                                <button className="btn btn-danger btn-sm" onClick={()=>this.props.addToCart(book._id)}>Buy</button>
                                                <button  className="btn btn-success btn-sm" onClick={()=>this.props.addToCart(book._id)}>Add to Cart</button>    
                                        </div>
                                    </div>
                                </div>
                          </div>
                        )})}
                        {this.props.message&&<div className="col-lg-12">
                        <h1>{this.props.message}</h1>
                        </div>}
                    
                    </div>
        
        );
    }
}
