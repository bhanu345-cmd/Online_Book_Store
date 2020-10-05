import React from 'react';
import { ToastContainer,toast } from 'react-toastify';
import Aux from '../../hoc/Auxiliary.js';

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchText: ""
        }
        this.auth= this.props.auth;
        
    }
    handleSearchChange = (event)=>{
        const {id,value} = event.target;
        console.log({[id]: value});
        this.setState({[id]: value})
    }
    handleSearchSubmit =(event) =>{
        event.preventDefault();
        toast.info("You searched for " +this.state.searchText, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            // onClose:() =>window.location.reload()
          }
          );
        // alert("You searched for " +this.state.searchText);
        this.auth.isAuthenticated() ?
        this.props.history.push(`/Home/${this.props.match.params.data}/booksonsearch`):
        this.props.history.push(`/Home/booksonsearch`)
    }
    render(){
        console.log(this.auth.isAuthenticated())
        return(
             <Aux>
                 <ToastContainer />
                <div className="col-lg-8 col-md-8 col-sm-8">
                    <form className="form-inline justify-content-center" onSubmit={this.handleSearchSubmit}>
                        <input className="form-control mr-sm-2 w-50" type="text" placeholder="Search" aria-label="Search" id="searchText" onChange={this.handleSearchChange}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
                    </form>
                </div>
            </Aux>
        )
    }
}
export default Search;