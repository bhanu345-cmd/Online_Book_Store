import React from 'react';
import './Books.css';
import carousel1 from '../Images/carousel1.jpg';
class Books extends React.Component{
    render(){
        return(
            <>
            <div className="container">
                <div className="row">
                    {/* 
                    {state.posts.map((post,index)=>{
                      return(
                          
                        <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                        <div className="card-body" key={index}>
                        <p className="card-text">{post.name}</p>
                        <p className="card-text">{post.author}</p>
                        <p className="card-text">{post.category}</p>
                        <p className="card-text">{post.publishedDate}</p>
                        <p className="card-text">{post.price}</p>
                        </div>
                        </div>
                        </div>
                      )
                    })}
                    */}
                    {/* Can remove from here */}
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
                        <div className="card">
                            <img src={carousel1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">Book Name</p>
                                <p className="card-text">Aurthor</p>
                                <p className="card-text">Category</p>
                                <p className="card-text">Published Date</p>
                                <p className="card-text">Price</p>
                                <a href="#" className="btn btn-primary">Buy</a>
                                <a href="#" className="btn btn-primary float-right">Add to Cart</a>
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
                                <a href="#" className="btn btn-primary">Buy</a>
                                <a href="#" className="btn btn-primary float-right">Add to Cart</a>
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
                                <a href="#" className="btn btn-primary">Buy</a>
                                <a href="#" className="btn btn-primary float-right">Add to Cart</a>
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
                                <a href="#" className="btn btn-primary">Buy</a>
                                <a href="#" className="btn btn-primary float-right">Add to Cart</a>
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
                                <a href="#" className="btn btn-primary">Buy</a>
                                <a href="#" className="btn btn-primary float-right">Add to Cart</a>
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