import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './AddBook.css';
import AdminNav from '../Admin/AdminNav';
import Services from '../Others/Services';
import Footer from '../Others/Footer';
import {getCategories,getAuthors,getBookById} from '../UserFunctions/UserFunctions';
import Auth from '../../Authentication/Auth';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
class BookUpdate extends React.Component{
    state={
        BookTitle: '',
        AuthorName: '',
        Category: '',
        Price: '',
        PublishedDate:'',
        ImageURL:'',
        description:'',
        message:'',
        categories:[],
        authors:[],
        bookID: localStorage.getItem("bookId")
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
     submit=(event)=>{
         event.preventDefault();
         const payload={
            _id: this.state.bookID,
            bookName: this.state.BookTitle,
            author: this.state.AuthorName,
            category: this.state.Category,
            price: this.state.Price,
            date:this.state.PublishedDate,
            imageURL:this.state.ImageURL,
            description:this.state.description
         };
         this.resetUserInputs();
            Axios.put(`http://localhost:4000/book/updateBook`,payload).then((res)=>{
            if(res.data.success){
              this.setState({message:res.data.message});
              toast.info(this.state.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                onClose:() =>this.props.history.push('/showBooks')
              }
              );
            }else{
                this.setState({message:res.data.message});
                toast.info(this.state.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                  }
                  );
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
            ImageURL:'',
            description:''
         });
     };
     componentDidMount(){
         console.log(this.state.bookID);
         getBookById(this.state.bookID).then((res)=>{
             console.log(res.message);
             console.log(res)
             console.log(res.book[0].publishedDate);
             if(res.message===true){
                 let date= res.book[0].publishedDate;
                 this.setState({
                    BookTitle: res.book[0].bookName,
                    AuthorName: res.book[0].author,
                    Category: res.book[0].category,
                    Price: res.book[0].price,
                    PublishedDate:date.slice(0,10),
                    ImageURL:res.book[0].imageURL,
                    description:res.book[0].description,
                 })
             }else{
                this.setState({message: res.message})}
         })
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
          <div className="jumbotron text-center" style={{width:"550px"}}>
              <h4>Update Book Details</h4>
              <form  onSubmit={this.submit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label className="float-sm-left" htmlFor="name">BookTitle:</label>
                            <input
                            type="text"
                            className="form-control "
                            name="BookTitle"
                            placeholder="Enter Book Title"
                            value={this.state.BookTitle}
                            onChange={this.handleChange}
                            required
                            />
                        </div> 
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label for="AuthorName" className="float-sm-left">Author:</label>
                            <select className="custom-select" id="AuthorName" name="AuthorName" value={this.state.AuthorName} required onChange={this.handleChange} disabled="true">
                            <option>Select an author</option>
                            {this.state.authors.map((author)=>{
                                return <option value={author.name}>{author.name}</option>
                            })}
                            </select>
                        </div>
                    </div>
                </div>                
                <div className="row">                
                    <div className="col-6">
                        <div className="form-group">
                            <label for="Category" className="float-sm-left">Category:</label>
                            <select className="custom-select" id="Category" name="Category" value={this.state.Category} required onChange={this.handleChange} disabled="true">
                                <option>Select an category</option>
                                {this.state.categories.map((category)=>{
                                    return <option value={category.name}>{category.name}</option>
                                })}
                            </select>
                        </div>
                    </div>                
                    <div className="col-6">
                        <div className="form-group">
                            <label className="float-sm-left" htmlFor="text">Price:</label>
                            <input
                            type="text"
                            className="form-control"
                            name="Price"
                            placeholder="Price"
                            value={this.state.Price}
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label className="float-sm-left" htmlFor="text">PublishedDate:</label>
                            <input
                            type="date"
                            className="form-control"
                            name="PublishedDate"
                            value={this.state.PublishedDate}
                            placeholder="PublishedDate"
                            readOnly="true"
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label className="float-sm-left" htmlFor="text">Image URL:</label>
                            <input
                            type="text"
                            className="form-control"
                            name="ImageURL"
                            placeholder="URL"
                            value={this.state.ImageURL}
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                    </div>
                </div>
              <div className="form-group">
                <label className="float-sm-left" htmlFor="text">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                  rows="3"
                  required
                />
              </div>
              <button
                type="submit"
                className="form-control btn-success"
              >
                Update
              </button>
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
 export default BookUpdate;