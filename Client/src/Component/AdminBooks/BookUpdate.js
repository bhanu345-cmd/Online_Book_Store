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
        description:'',
        bookimg:'',
        message:'',
        error:'',
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
     handleChangeFile=(e)=>{
        console.log(e.target.files[0].name)
        let filetype=e.target.files[0].name.split('.').pop();
        let error=this.state.error;
        console.log("File Type:" +filetype+",bookimg "+this.state.bookimg);
        if(filetype==='jpg'||filetype==='png'||filetype==='jpeg'||filetype==='jfif'){
          console.log("inside if")
          this.setState({error:'',
           bookimg: e.target.files[0]
         });
          
        }
        else{
         console.log("inside else")
         error="No file received or Invalid file type(NOTE:jpg,jpeg,png,jfif are accepted)"
          this.setState({error:error,
           bookimg: e.target.files[0]
         });
 
        }
      }
     submit=(event)=>{
         event.preventDefault();
         if(this.state.error===''){
         const formData= new FormData();
         formData.append('_id',this.state.bookID);
         formData.append('bookName',this.state.BookTitle);
         formData.append('author',this.state.AuthorName);
         formData.append('category',this.state.Category);
         formData.append('price',this.state.Price);
         formData.append('date',this.state.PublishedDate);
         formData.append('description',this.state.description);
         formData.append('bookimg',this.state.bookimg);
        //  const payload={
        //     _id: this.state.bookID,
        //     bookName: this.state.BookTitle,
        //     author: this.state.AuthorName,
        //     category: this.state.Category,
        //     price: this.state.Price,
        //     date:this.state.PublishedDate,
        //     imageURL:this.state.ImageURL,
        //     description:this.state.description
        //  };
         this.resetUserInputs();
            Axios.put(`http://localhost:4000/book/updateBook`,formData).then((res)=>{
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
     else{
        this.setState({message:"Enter all feilds correctly"});
        toast.error("Enter all feilds correctly", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          }
          );
       }
    }
     resetUserInputs=()=>{
         this.setState({
            BookTitle: '',
            AuthorName: '',
            Category: '',
            Price: '',
            PublishedDate:'',
            description:'',
            bookimg: ''
         });
     };
     componentDidMount(){
         console.log(this.state.bookID);
         getBookById(this.state.bookID).then((res)=>{
             console.log(res.message);
             console.log(res.book[0].bookimg)
             console.log(res.book[0].publishedDate);
             if(res.message===true){
                 let date= res.book[0].publishedDate;
                 this.setState({
                    BookTitle: res.book[0].bookName,
                    AuthorName: res.book[0].author,
                    Category: res.book[0].category,
                    Price: res.book[0].price,
                    PublishedDate:date.slice(0,10),
                    description:res.book[0].description,
                    bookimg:`http://localhost:4000/${res.book[0].bookimg}`
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
                            <label htmlFor="AuthorName" className="float-sm-left">Author:</label>
                            <select className="custom-select" id="AuthorName" name="AuthorName" value={this.state.AuthorName} required onChange={this.handleChange} disabled={true}>
                            <option>Select an author</option>
                            {this.state.authors.map((author,index)=>{
                                return <option key={index} value={author.name}>{author.name}</option>
                            })}
                            </select>
                        </div>
                    </div>
                </div>                
                <div className="row">                
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="Category" className="float-sm-left">Category:</label>
                            <select className="custom-select" id="Category" name="Category" value={this.state.Category} required onChange={this.handleChange} disabled={true}>
                                <option>Select an category</option>
                                {this.state.categories.map((category,index)=>{
                                    return <option key={index} value={category.name}>{category.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label className="float-sm-left" htmlFor="text">PublishedDate:</label>
                            <input
                            type="date"
                            className="form-control"
                            name="PublishedDate"
                            value={this.state.PublishedDate}
                            placeholder="PublishedDate"
                            readOnly={true}
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                    </div>                
                    
                </div>
                <div className="row">
                <div className="col">
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
                    <div className="col-2">
                    <img  height="50px" width="50px" src={this.state.bookimg} className="mt-4" alt="..."/>
                    </div>
                    <div className="col-10">
                    <div className="form-group">                
                <label className="float-sm-left" htmlFor="text">Upload Image:</label>
                <input
                  type="file"
                  className="form-control"
                  name="bookimg"
                  placeholder="URL"
                  onChange={this.handleChangeFile}
                  required
                />
                <div className="float-right error">
                                {this.state.error.length > 0 && 
                                    <span className='error'>{this.state.error}</span>}</div>
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