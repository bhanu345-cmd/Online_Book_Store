import React, { Component } from "react";
import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import AdminNav from '../Admin/AdminNav';
import Services from '../Others/Services';
import Footer from '../Others/Footer';
 class AddAuthor extends Component{
     state={
        AuthorName: '',
        ContactNo: '',
        EmailID: '',
        Address:'',
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
            AuthorName: this.state.AuthorName,
            ContactNo: this.state.ContactNo,
            EmailID: this.state.EmailID,
            Address:this.state.Address
         };
        //  axios({
        //      url:'/api/authors/save',
        //      method:'POST',
        //      data:payload
        //  })
        //  .then(() => {
        //     console.log('Data has been sent to the server');
        //     this.resetUserInputs();
        //     alert("New Author Details added successfuly!! ,To add more press ok");
        //  })
        //  .catch(() => {
        //     console.log('Oops something went wrong');
        //  })
     }
     resetUserInputs=()=>{
         this.setState({
            AuthorName: '',
            ContactNo: '',
            EmailID: '',
            Address:'',
         });
     };
render(){
    console.log('state',this.state);
    return(
        <Aux>
       <AdminNav />
        <div className="row pt-3">
        <div className="col-12 d-flex justify-content-center">
          <div className="jumbotron">
              <h4>Add Author</h4>
              <form  noValidate onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">Author Name:</label>
                <input
                  type="text"
                  className="form-control "
                  name="AuthorName"
                  placeholder="Enter Author Name"
                  value={this.state.AuthorName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">Contact No:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ContactNo"
                  placeholder="Enter Contact Number"
                  value={this.state.ContactNo}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Email Id:</label>
                <input
                  type="email"
                  className="form-control"
                  name="EmailID"
                  placeholder="Enter email Id"
                  value={this.state.EmailID}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  placeholder="Address"
                  value={this.state.Address}
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
export default AddAuthor;