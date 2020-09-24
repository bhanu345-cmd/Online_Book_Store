import React, {useState} from 'react';
import Axios from 'axios';
import './Login.css'
class Login extends React.Component{
    constructor(props){
        super()
        this.state={
        email: "",
        password: "" ,
        errors:{
            email: '',
            password: '',
        }
        }
    }
    handleChange = (event) =>{       
        const {id, value} = event.target;
        let errors = this.state.errors;
        switch (id) {            
            case 'email': 
              errors.email = 
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                  ? ''
                  : 'UserName is not valid!';
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be at least 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
        this.setState(            
            {errors,[id] : value}
        );
        console.log([id] +":"+ value)        
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        console.log(this.state)
        alert("Logged in successfully");
        this.props.history.push(`/userhome/${this.state.email}`);
    //     Axios.post(`http://localhost:8081/api/student/${state.firstName}/${state.lastName}`,state)
    //   .then((response)=> {
    //     if(response.data.success === true)
    //     {
    //         props.history.push(`/userhome/${state.firstName}`)
    //         // alert("Valid User!! WELCOME")
    //     }
    //     else{
    //         console.log(response)
    //         alert("Invalid User!!")
    //     }
         
    //   })
    //   .catch(()=>{
    //     console.log("Error receiving data")
    //   });
    }
    render(){
        const {errors} = this.state;    
    return(
        <div className="container text-center">
            <div className="projName text-center">
                <a href="#"><strong>Book Store</strong></a>
            </div>
            <div className="row ">
                <div className="col-12 d-flex justify-content-center">
                    <div className="jumbotron">
                        <h4>Login</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="float-left">User Name(email):</label>
                                <input id="email" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="ex:abcdef@ghi.xyz" required/>
                                <div className="float-right error">
                                {errors.email.length > 0 && 
                                    <span className='error'>{errors.email}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="float-left">Password:</label>
                                <input id="password" value={this.state.password} type="password" className="form-control" onChange={this.handleChange} placeholder="Password" required/>  
                                <div className="float-right error">
                                {errors.password.length > 0 && 
                                    <span className='error'>{errors.password}</span>}</div>
                            </div>                        
                            <input type="Submit" className="form-control btn-success"/> 
                            <small>By Submitting you agree to our Conditions of Use and Privacy Notice</small>
                        </form>
                    </div>
                </div>                
            </div>
            <h6><small>New to Book Store?</small></h6>
            <a href="#" className="btn btn-success form-control sign">SignUp</a>
        </div>
    );
}

}

export default Login;