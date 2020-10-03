import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './AddBook.css';
import AdminNav from '../Admin/AdminNav';
import Services from '../Others/Services';
import Footer from '../Others/Footer';

class AddBook extends React.Component{
    state={
        BookTitle: '',
        AuthorName: '',
        Category: '',
        Price: '',
        //ReleaseDate:'',
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
            BookTitle: this.state.BookTitle,
            AuthorName: this.state.AuthorName,
            Category: this.state.Category,
            Price: this.state.Price,
            //ReleaseDate:this.state.ReleaseDate
         };
        //  axios({
        //      url:'/api/books/save',
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
            BookTitle: '',
            AuthorName: '',
            Category: '',
            Price: '',
            //ReleaseDate:'',
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
              <h4>Add Book</h4>
              <form  noValidate onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">BookTitle:</label>
                <input
                  type="text"
                  className="form-control "
                  name="BookTitle"
                  placeholder="Enter Book Title"
                  value={this.state.BookTitle}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">Author Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="AuthorName"
                  placeholder="Enter  Author Name"
                  value={this.state.AuthorName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Category:</label>
                <input
                  type="email"
                  className="form-control"
                  name="Category"
                  placeholder="Enter Category"
                  value={this.state.Category}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Price:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Price"
                  placeholder="Price"
                  value={this.state.Price}
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
export default AddBook