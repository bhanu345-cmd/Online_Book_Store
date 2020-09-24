import React, {useState} from 'react';
import Axios from 'axios';
import './Login.css'
class Login extends React.Component{
    constructor(props){
        super()
        this.state={
        userName: "",
        password: "" ,
        errors:{
            email: '',
            password: '',
        },
        isValid: false,
        message:''
        }
    }
    handleChange = (event) =>{       
        const {id, value} = event.target;
        let errors = this.state.errors;
        switch (id) {            
            case 'userName': 
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
    }
    handleSubmit = async(event)=>{
        event.preventDefault();
        const {userName,password}=this.state;
        const data={
            userName:userName,
            password:password
        };

        for(const key in this.state.errors){
            if(this.state.errors[key]){
                await this.setState({isValid:true});
            }
        }
        console.log(this.state.isValid);
        if(this.state.isValid === true){
            alert("Enter fields correctly");
        }
        else{
            Axios.post('http://localhost:4000/user/login',data)
            .then((res)=> {
            if(res.data.message === true)
            {
                this.props.history.push(`/userhome/${this.state.userName}`)
             // alert("Valid User!! WELCOME")
            }
            else{
                this.setState({message:res.data.message});
            }
            })
            .catch(()=>{
            console.log("Error receiving data")
            });
            
        }
         
    }
    render(){
        const {errors,message} = this.state;    
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
                                <label htmlFor="userName" className="float-left">User Name(email):</label>
                                <input id="userName" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="ex:abcdef@ghi.xyz" required/>
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
                            <div>
                                {this.state.message && <span className='error'>{message}</span>}
                            </div>
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