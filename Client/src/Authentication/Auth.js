import Axios from 'axios';
export default class auth{

    constructor(history){
        this.history=history
    }


    registration=({firstName,lastName,userName,password,phnNo,
        address,state,city,pincode})=>{
        const data={
            firstName:firstName,
            lastName:lastName,
            userName:userName,
            password:password,
            phnNo:phnNo,
            address:address,
            state:state,
            city:city,
            pincode:pincode
        };
        return Axios.post('http://localhost:4000/user/reg',data)
            .then((res)=>{ 
                if(res.data.message===true){
                    alert('Data entered to db');
                    return {message:res.data.message};
                }else{
                    return {message:res.data.message};
                }    
            })
            .catch((err)=>{
              console.log(err);
            });
    }

    
     login=({userName,password})=>{
        const data={userName:userName,password:password};
        return Axios.post('http://localhost:4000/user/login',data)
            .then((res)=> {
            if(res.data.message === true)
            {
                this.setSession(res.data.accessToken);
                return {message:res.data.message};
                
            }
            else{
                return {message:res.data.message};
            }
            })
            .catch((err)=>{
                return err;
            });
            
    }
         
    setSession = token => {
        localStorage.setItem("access_token", token);
    };

    isAuthenticated() {
        let storeItem = localStorage.getItem("access_token");
        return storeItem && storeItem.length > 0;
    }

    logout=()=>{
        localStorage.removeItem("access_token");
        return this.history.replace('/');
    }

}
