import React from 'react';
import {getCategories} from '../UserFunctions/UserFunctions';
import AdminNav from '../Admin/AdminNav';
import Footer from '../Others/Footer';
import Services from '../Others/Services';
import Aux from '../../hoc/Auxiliary';
import {deleteCategory} from '../UserFunctions/UserFunctions';
import './ShowCategory.css';
import Auth from '../../Authentication/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class ShowCategories extends React.Component{
    state={categories:[],message:''};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    componentDidMount(){
        getCategories().then((res)=>{
            if(res.message===true){
                this.setState({categories:res.categories});
            }else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false,
                    onClose:() =>window.location.reload()
                  }
                  );
                // alert(res.message);
            }
        }).catch(err=>{if(err) 
            toast.error("404 error !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
                onClose:() =>window.location.reload()
              }
              );
            // alert("404 error")
        });
    }
    deleteHandler=(id)=>{
        deleteCategory(id).then((res)=>{
            if(res.message===true){
                toast.info("Deleted Successfully !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false,
                    onClose:() =>window.location.reload()
                  }
                  );
            }else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false,
                    onClose:() =>window.location.reload()
                  }
                  );
            //    alert(res.message);
            }
        }).catch(err=>{if(err) 
            toast.error("404 error !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
                onClose:() =>window.location.reload()
              }
              );
            // alert("404 error")
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
                    <h1 style={{fontSize:"25px"}}>List of Categories</h1>
                    <table className="table showCategories">
                    {this.state.categories.length>0 &&
                        <Aux> 
                        <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.categories.map((category)=>{
                            return(
                                <tr>
                                    <td >{category._id}</td>
                                    <td>{category.name}</td>
                                    <td><i type="button" className="fa fa-trash text-danger" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.deleteHandler(category._id)}></i> </td>
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