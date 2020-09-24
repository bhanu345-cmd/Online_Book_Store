import React from 'react';
import Axios from 'axios';
import './Register.css';
class Register extends React.Component{
    constructor(props){
        super()
        this.state = 
        {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            address: '',
            state: '',
            city: '',
            pincode:'',
            phnNo: '',
            errors : {
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                address: '',
                state: '',
                city: '',
                pincode:'',
                phnNo: '',
            },
            isValid: false,
        };     
       
    }
    handleChange=(event)=>{
        const {id,value} =event.target;
        let errors = this.state.errors;
        switch (id) {
            case 'firstName': 
              errors.firstName = 
                value.length < 3
                  ? 'First Name must be at least 3 characters long!'
                  : '';
                  this.state.isValid=true;
              break;
              case 'lastName': 
              errors.lastName = 
                value.length < 5
                  ? 'Last Name must be at least 5 characters long!'
                  : '';
                  this.state.isValid=true;
              break;
            case 'userName': 
              errors.userName = 
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                  ? ''
                  : 'userName is not valid!';
                  this.state.isValid=true;
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be at least 8 characters long!'
                  : '';
                  this.state.isValid=true;
              break;
            case 'address': 
              errors.address = 
                value.length < 8
                  ? 'address must be at least 8 characters long!'
                  : '';
                  this.state.isValid=true;
              break;
              case 'pincode': 
              errors.pincode = 
                value.length < 6
                  ? 'Pincode must be atleast 6 Numbers long!'
                  : '';
                  this.state.isValid=true;
              break;
            case 'phnNo': 
              errors.phnNo = 
                value.length < 10
                  ? 'Phone Number must be 10 Numbers long!'
                  : '';
                  this.state.isValid=true;
              break;
            default:
              break;
          }
        this.setState(            
            {errors,[id] : value}
        );
        console.log([id] +":"+ value)
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state)
        console.log(this.state.isValid)
        if(this.state.isValid === true){
            alert("Please enter all the fields correctly");
        }
        else{
            alert("Registered Successfully");
            this.props.history.push(`/login`);
        }        
        
    //     Axios.post('http://localhost:8081/api/student',this.state)
    //   .then(response=> response.data)
    //   .catch(()=>{
    //     console.log("Error receiving data")
    //   });
    //   alert('Data entered to db');
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
                    <div className="jumbotron" style={{width:"550px"}}>
                        <h4>SignUp</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName" className="float-left">First Name:</label>
                                <input id="firstName" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="First Name" required/>
                                <div className="float-right error">
                                {errors.firstName.length > 0 && 
                                    <span className='error'>{errors.firstName}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="float-left">Last Name:</label>
                                <input id="lastName" value={this.state.email} type="text" className="form-control" onChange={this.handleChange} placeholder="Last Name" required/>
                                <div className="float-right error">
                                {errors.lastName.length > 0 && 
                                    <span className='error'>{errors.lastName}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName" className="float-left">User Name(Email):</label>
                                <input id="userName" value={this.state.username} type="text" className="form-control" onChange={this.handleChange} placeholder="ex: abcdef@ghijk.xyz" required/>
                                <div className="float-right error">
                                {errors.userName.length > 0 && 
                                    <span className='error'>{errors.userName}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="float-left">Password:</label>
                                <input id="password" value={this.state.password} type="password" className="form-control" onChange={this.handleChange} placeholder="Password" required/>
                                <div className="float-right error">
                                {errors.password.length > 0 && 
                                    <span className='error'>{errors.password}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="float-left">Address:</label>
                                <input id="address" value={this.state.address} type="text" className="form-control" onChange={this.handleChange} placeholder="Address" required/>
                                <div className="float-right error">
                                {errors.address.length > 0 && 
                                    <span className='error'>{errors.address}</span>}</div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="state" className="float-left">State:</label>
                                <select id="state" value= {this.state.state} onChange={this.handleChange} className="form-control">
                                    <option>---Select a State---</option>
                                    <option value = "Telangana">Telangana</option>
                                    <option value = "Andhra Pradesh">Andhra Pradesh</option>
                                    <option value = "Tamil Nadu">Tamil Nadu</option>
                                </select>                                
                            </div>
                            <div className="form-group">
                            <label htmlFor="city" className="float-left">City:</label>
                                <select id="city" value= {this.state.city} onChange={this.handleChange} className="form-control">
                                    <option>---Select a City---</option>
                                    <option value = "Hyderabad">Hyderabad</option>
                                    <option value = "Vizaq">Vizaq</option>
                                    <option value = "Chennai">Chennai</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode" className="float-left">Pincode:</label>
                                <input id="pincode" value={this.state.pincode} type="number" className="form-control" onChange={this.handleChange} placeholder="PinCode" required/>
                                <div className="float-right error">
                                {errors.pincode.length > 0 && 
                                    <span className='error'>{errors.pincode}</span>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phnNo" className="float-left">Phone Number:</label>
                                <input id="phnNo" value={this.state.phnNo} type="number" className="form-control" onChange={this.handleChange} placeholder="Phone Number" required/>
                                <div className="float-right error">
                                {errors.phnNo.length > 0 && 
                                    <span className='error'>{errors.phnNo}</span>}</div>
                            </div>                        
                            <input type="Submit" className="form-control btn-success"/> 
                            <small>By Submitting you agree to our Conditions of Use and Privacy Notice</small>
                        </form>
                    </div>
                </div>                
            </div>
            <h6><small>Already a registered USer?</small></h6>
            <a href="#" className="btn btn-success form-control sign">Login</a>
        </div>
        )
    }
}

export default Register