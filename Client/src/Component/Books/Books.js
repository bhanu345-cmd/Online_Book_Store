import React from 'react';
import './Books.css';
import carousel1 from '../Images/carousel1.jpg';
import Axios from 'axios';
import Aux from '../../hoc/Auxiliary.js';
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
        console.log(this.state);
        return(
            <Aux>
            <div className="container cardcontainer">
                <div className="row">
                <div className="col-12 divnames"><h4>Most Popular Books...</h4><hr /></div>
                    {this.state.books.map((book,index)=>{
                      return( 
                        <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="card mt-4">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                        <div className="card-body" key={index}>
                        <p className="card-text font-weight-bolder"><span style={{fontSize:'15px'}}>{book.bookName}</span></p>
                        <p className="card-text">Author:<span>{book.author}</span></p>
                        <p className="card-text">Category:<span>{book.category}</span></p>
                        <p className="card-text">Price:{' '}<i className="fa fa-inr"></i><span className="text-primary font-weight-bold price">{book.price}</span></p>
                        <div className="card-footer">
                        <a href="#" class="btn btn-danger btn-sm">Buy</a>
                        <a href="#" class="btn btn-success btn-sm float-right">Add to Cart</a>
                        </div>
                        </div>
                        </div>
                        </div>
                      );
                    })}
                    
                    <div className="col-12 divnames"><hr /><h4>Books by Category</h4><hr /></div>
                    <div className="col-12 divnames"><hr /><h4>Books by Author</h4><hr /></div>
                    {/*<div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">Book Name</p>
                                <p className="card-text">Aurthor</p>
                                <p className="card-text">Category</p>
                                <p className="card-text">Published Date</p>
                                <p className="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="#" class="btn btn-primary float-right">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">Book Name</p>
                                <p className="card-text">Aurthor</p>
                                <p className="card-text">Category</p>
                                <p className="card-text">Published Date</p>
                                <p className="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="#" class="btn btn-primary float-right">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">Book Name</p>
                                <p className="card-text">Aurthor</p>
                                <p className="card-text">Category</p>
                                <p className="card-text">Published Date</p>
                                <p className="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="#" class="btn btn-primary float-right">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">Book Name</p>
                                <p className="card-text">Aurthor</p>
                                <p className="card-text">Category</p>
                                <p className="card-text">Published Date</p>
                                <p className="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="#" class="btn btn-primary float-right">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">Book Name</p>
                                <p className="card-text">Aurthor</p>
                                <p className="card-text">Category</p>
                                <p className="card-text">Published Date</p>
                                <p className="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="#" class="btn btn-primary float-right">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                    {/* can remove till here */}
                </div>
            </div>
            </Aux>
        );
    }
}