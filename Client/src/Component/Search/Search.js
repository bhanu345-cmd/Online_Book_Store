import React from 'react';
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
        alert("You searched for " +this.state.searchText);
        this.auth.isAuthenticated() ?
        this.props.history.push(`/Home/${this.props.match.params.data}/booksonsearch`):
        this.props.history.push(`/Home/booksonsearch`)
    }
    render(){
        console.log(this.auth.isAuthenticated())
        return(
             <Aux>
                <div className="col-lg-8 col-md-7 col-sm-3">
                    <form className="form-inline justify-content-center" onSubmit={this.handleSearchSubmit}>
                        <input className="form-control mr-sm-2 w-50" type="text" placeholder="Search" aria-label="Search" id="searchText" onChange={this.handleSearchChange}/>
                        <button className="btn btn-outline-success  my-2 my-sm-0" type="submit" >Search</button>
                    </form>
                </div>
            </Aux>
        )
    }
}
export default Search;
