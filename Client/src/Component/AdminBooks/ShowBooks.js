import React from 'react';
import {Link} from 'react-router-dom';
import AdminNav from '../Admin/AdminNav';
import Footer from '../Others/Footer';
import Services from '../Others/Services';
import Aux from '../../hoc/Auxiliary';
import {deleteBookById,getBooks} from '../UserFunctions/UserFunctions';
import './ShowBooks.css';
import Auth from '../../Authentication/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class ViewBooks extends React.Component{
    state={books:[],message:'',count:0,};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    componentDidMount(){
        getBooks().then((res)=>{
            if(res.message===true){
                this.setState({books:res.books});
            }else{
                this.setState({message: res.message})
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    // onClose:() =>window.location.reload()
                  }
                  );
                // alert(res.message);
            }
        }).catch(err=>{if(err) 
            toast.error("404 error !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
            onClose:() =>window.location.reload()
          }
          );
        // alert("404 error")
    });
    }
    updateHandler =(id) =>{
        this.props.history.push('/bookUpdate');
        localStorage.setItem("bookId",id);
    }
    confimationHandler = (id) =>{
        toast(
            <>            
            <p className="text-dark pt-3">Do you want to delete it?</p>
            <div className="pull-right pt-0 mt-0">
            <button className="btn btn-success btn-sm mr-2" onClick={()=>this.deleteHandler(id)}>Yes</button>
            <button className="btn btn-danger btn-sm">No</button>
            </div>
            </>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            // onClose:() =>window.location.reload()
          }
          );
    }
    deleteHandler=(id)=>{
        deleteBookById(id).then((res)=>{
            if(res.message===true){
                toast.info("Deleted Successfully !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    onClose:() =>window.location.reload()
                  }
                  );
            }else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: true,
                    onClose:() =>window.location.reload()
                  }
                  );
            }
        }).catch(err=>{if(err) 
            toast.error("404 error !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                onClose:() =>window.location.reload()
              }
              );
        });
    }
    render(){
        return(
            <Aux>
                <ToastContainer />
                <div className="container-fluid">
                    <AdminNav logoutHandler={this.logoutHandler}/>
                </div>
                <div className="container">
                    <div className="jumbotron w-75  mt-4 mb-4 border-0">
                    <h1 style={{fontSize:"25px"}}>List of Books</h1>
                    <h4 className="text-center">{this.state.message}</h4>
                    <table className="table showCategories">
                    {this.state.books.length>0 &&
                        <Aux> 
                        <thead>
                        <tr>
                        <th scope="col">SNo</th>
                        <th scope="col">BookName</th>
                        <th scope="col">Category</th>
                        <th scope="col">Author</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books.map((book)=>{
                            return(
                                <tr>
                                    <td >{this.state.count=this.state.count+1}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.category}</td>
                                    <td>{book.author}</td>
                                    <td>{book.price}</td>
                                    <td>
                                        <i type="button" className="fa fa-pencil-square-o text-info" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.updateHandler(book._id)}></i>{' '}{' '}
                                        <i type="button" className="fa fa-trash text-danger" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.confimationHandler(book._id)}></i>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </Aux>
                    }
                     </table>
                     </div>       
                </div>
                <div className="container-fluid">
                <hr className="hrtag"/>
                    <Services/>
                    <Footer/>
                </div>
            </Aux>
        );
    }
} 