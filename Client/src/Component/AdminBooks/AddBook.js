import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './AddBook.css';
import AdminNav from '../Admin/AdminNav';
import Services from '../Others/Services';
import Footer from '../Others/Footer';
import {addBook,getCategories,getAuthors} from '../UserFunctions/UserFunctions';
import Auth from '../../Authentication/Auth';
import { ToastContainer, toast } from 'react-toastify';
class AddBook extends React.Component{
    state={
        BookTitle: '',
        AuthorName: '',
        Category: '',
        Price: '',
        PublishedDate:'',
        description:'',
        message:'',
        bookimg:'',
        categories:[],
        authors:[]
     };
     constructor(props){
      super(props);
      this.auth=new Auth(this.props.history);
    }
    logoutHandler=()=>{
      this.auth.adminLogout();
    }
     handleChange=(e)=>{
        const {name,value}=e.target;
        this.setState({
            [name]:value
        },()=>{console.log(this.state)});
     }
     handleChangeFile=(e)=>{
       this.setState({
         bookimg: e.target.files[0]
       });
     }
     submit=(event)=>{
         event.preventDefault();
         const formData= new FormData();
         formData.append('bookName',this.state.BookTitle);
         formData.append('author',this.state.AuthorName);
         formData.append('category',this.state.Category);
         formData.append('price',this.state.Price);
         formData.append('date',this.state.PublishedDate);
         formData.append('description',this.state.description);
         formData.append('bookimg',this.state.bookimg);
        //  const payload={
        //     bookName: this.state.BookTitle,
        //     author: this.state.AuthorName,
        //     category: this.state.Category,
        //     price: this.state.Price,
        //     date:this.state.PublishedDate,
        //     imageURL:this.state.ImageURL,
        //     description:this.state.description,
        //     bookimg: this.state.bookimg
        //     //ReleaseDate:this.state.ReleaseDate
        //  };
        //  const config={
        //    headers:{
        //      'content-type': 'multipart/form-data'
        //    }
        //  }
         this.resetUserInputs();
        addBook(formData).then((res)=>{
            if(res.message===true){
              this.setState({message:"Added"});
              toast.info(this.state.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
                // onClose:() =>window.location.reload()
              });
              window.location.reload()
            }else{
              this.setState({message:res.message});
            }
        }).catch(err=>{this.setState({message:err.messsage})})
     }
     resetUserInputs=()=>{
         this.setState({
            BookTitle: '',
            AuthorName: '',
            Category: '',
            Price: '',
            PublishedDate:'',
            description:''
         });
     };
     componentDidMount(){
          getCategories().then((res)=>{
            if(res.message===true){
                this.setState({categories:res.categories});
            }else{
                alert(res.message);
            }
          }).catch(err=>{if(err) alert(err.message)});
        getAuthors().then((res)=>{
          if(res.message===true){
              this.setState({authors:res.authors});
          }else{
              alert(res.message);
          }
          }).catch(err=>{if(err) alert("404 error")});
     }
render(){
    console.log('state',this.state);
    return(
       <Aux>
         <ToastContainer />
        <div className="container-fluid">
            <AdminNav logoutHandler={this.logoutHandler}/>
        </div>
        <div className="container">
        <div className="row pt-3">
        <div className="col-12 d-flex justify-content-center">
          <div className="jumbotron text-center">
              <h4>Add Book</h4>
              <form  onSubmit={this.submit}>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="name">BookTitle:</label>
                <input
                  type="text"
                  className="form-control "
                  name="BookTitle"
                  placeholder="Enter Book Title"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
              <label for="AuthorName" className="float-sm-left">Author:</label>
                <select className="custom-select" id="AuthorName" name="AuthorName" required onChange={this.handleChange}>
                  <option>Select an author</option>
                  {this.state.authors.map((author)=>{
                    return <option value={author.name}>{author.name}</option>
                  })}
                </select>
              </div>
              <div className="form-group">
              <label for="Category" className="float-sm-left">Category:</label>
              <select className="custom-select" id="Category" name="Category" required onChange={this.handleChange}>
                  <option>Select an category</option>
                  {this.state.categories.map((category)=>{
                    return <option value={category.name}>{category.name}</option>
                  })}
                </select>
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Price:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Price"
                  placeholder="Price"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">PublishedDate:</label>
                <input
                  type="date"
                  className="form-control"
                  name="PublishedDate"
                  placeholder="PublishedDate"
                  value={this.state.PublishedDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ImageURL"
                  placeholder="URL"
                  onChange={this.handleChange}
                  required
                />
              </div> */}
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="bookimg"
                  placeholder="URL"
                  onChange={this.handleChangeFile}
                  required
                />
              </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="description"
                  onChange={this.handleChange}
                  rows="3"
                  required
                />
              </div>
              <button
                type="submit"
                className="form-control btn-success"
              >
                Add
              </button>
                <h5 className="mt-2" style={{fontSize:"16px",color:'red'}}>{this.state.message}</h5>
            </form>
          </div>
        </div>
        </div> 
        </div>
        <div className="container-fluid">
                <hr className="hrtag"/>
                    <Services/>
                    <Footer/>
                </div> 
        </Aux>
    )
  }
}
export default AddBook