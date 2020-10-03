import React, { Component } from "react";
import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import AdminNav from '../Admin/AdminNav';
import Services from '../Others/Services';
import Footer from '../Others/Footer';
 class AddCategory extends Component{
     state={
        Category: '',
        errors: {}
     };
     handleChange=({target})=>{
        const {name,value}=target;
        this.setState({
            [name]:value
        });
     }
     submit=(event)=>{
         event.preventDefault();
         const payload={
            Category: this.state.Category,
         };
        //  axios({
        //      url:'/api/categories/save',
        //      method:'POST',
        //      data:payload
        //  })
        //  .then(() => {
        //     console.log('Data has been sent to the server');
        //     this.resetUserInputs();
        //     alert("New Book Details added successfuly!! ,To add more press ok");
        //  })
        //  .catch(() => {
        //     console.log('Oops something went wrong');
        //  })
     }
     resetUserInputs=()=>{
         this.setState({
            Category: '',
        });
     };
render(){
    console.log('sate',this.state);
    return(
        <Aux>
       <AdminNav />
        <div className="row pt-3">
        <div className="col-12 d-flex justify-content-center">
          <div className="jumbotron">
              <h4>Add Category</h4>
              <form  noValidate onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Category</label>
                <input
                  type="email"
                  className="form-control"
                  name="Category"
                  placeholder="Enter Category"
                  value={this.state.Category}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="form-control btn-success"
              >
                Add
              </button>
            </form>
          </div>
         
        </div>
          <div class="col-sm"></div>
        </div>
        </Aux>
    )
  }
}
export default AddCategory;