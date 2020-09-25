import React from 'react';
import './Books.css';
import carousel1 from '../Images/carousel1.jpg';
import Axios from 'axios';
class Books extends React.Component{
    state={
        books:[],
        message:""
    };
    componentDidMount(){
        Axios.get("http://localhost:4000/book/getBook").then((res)=>{
            if(res.data.message===true){
                console.log(res.data);
                this.setState({books:res.data.books});
            }else{
                this.setState({message:res.data.message});
            }
        });
    }
    render(){
        console.log(this.state);
        return(
            <>
            <div className="container">
                <div className="row">
                    <div className="col-12"><h3>All Books</h3><hr /></div>
                    {this.state.books.map((book,index)=>{
                      return(
                          
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card bookcard">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                        <div className="card-body" key={index}>
                        <h5 className="card-text font-weight-bold">{book.bookName}</h5>
                        <p className="card-text text-secondary">{book.author}</p>
                        <p className="card-text small text-secondary">{book.category}</p>
                        <p className="card-text">{book.publishedDate}</p>
                      <p className="card-text">Price:{` `}<i class="fa fa-inr" aria-hidden="true"></i><span className="text-dark font-weight-bold pl-0">{book.price}</span></p>
                        <a href="#" class="btn btn-danger btn-sm">Buy</a>
                        <a href="#" class="btn btn-success btn-sm float-right">Add to Cart</a>
                        </div>
                        </div>
                        </div>
                      );
                    })}
                    
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
            </>
        );
    }
}
export default Books;