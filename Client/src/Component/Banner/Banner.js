import React from 'react';
import everybook from '../Images/EveryBook.jpg';
import sofaBook from '../Images/SofaAndBook.jpg';
import chetan from '../Images/ChetanBhagat.jpg';
import jkrowling from '../Images/JkRowling.jpg';
import pauloCoelho from '../Images/PauloCoelho.jpg';
import bookGenres from '../Images/book-genres.jpg';
import science from '../Images/science.jpg';
import webd from '../Images/web-development.jpg';
import './Banner.css';
class Banner extends React.Component{
    render(){
        return(
            <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 p-1 w-100">
                    <div className="card bannercard">
                        <img className="card-img-top cover " src={sofaBook} alt="Card_image_cap" height="200" w-100/>            
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 c0l-sm-6 p-1 w-100">
                    <div className="card bannercard">
                        <img className="card-img-top cover " src={everybook} alt="Card_image_cap" height="200"/>            
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover authorimg" src={chetan} alt="Card_image_cap" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover authorimg" src={jkrowling} alt="Card_image_cap" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover authorimg" src={pauloCoelho} alt="Card_image_cap" height="200"/>            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover authorimg" src={bookGenres} alt="Card_image_cap" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover authorimg" src={webd} alt="Card_image_cap" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover authorimg" src={science} alt="Card_image_cap" height="200"/>            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />            
            </>
        )
    }
}
export default Banner