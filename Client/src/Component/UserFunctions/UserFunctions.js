import Axios from 'axios';
export const search=(item)=>{
   return Axios.get(`http://localhost:4000/book/search/${item}`).then((itemList)=>{
            return itemList.data;
    }).catch((err)=>{return {message:err}});
}

export const getCartItems=(userName)=>{
   return Axios.get(`http://localhost:4000/cart/getCartItems?userName=${userName}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err}});
}
export const decrement=(id,userName)=>{
    return Axios.post(`http://localhost:4000/cart/dec?id=${id}&userName=${userName}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err}});
}

export const increment=(id,userName)=>{
    return Axios.post(`http://localhost:4000/cart/inc?id=${id}&userName=${userName}`).then((res)=>{  
        return res.data;
    }).catch((err)=>{return {message:err}});
}

export const deleteBook=(id,userName)=>{
   return Axios.post(`http://localhost:4000/cart/deleteBook?id=${id}&userName=${userName}`).then((res)=>{
        return res.data;  
    }).catch((err)=>{return {message:err}});
}