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
export const placeOrder=(orderItems)=>{
    return Axios.post(`http://localhost:4000/order/placeOrder`,orderItems).then((res)=>{
         return res.data;  
     }).catch((err)=>{return {message:err}});
 }
 export const orders=(userName)=>{
    return Axios.get(`http://localhost:4000/order/orderedItems?userName=${userName}`).then((res)=>{
         return res.data;  
     }).catch((err)=>{return {message:err}});
}
export const getCategories=()=>{
    return Axios.get('http://localhost:4000/book/getCategories').then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getAuthors=()=>{
    return Axios.get('http://localhost:4000/book/getAuthors').then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getBookByCategory=(category)=>{
    return Axios.get(`http://localhost:4000/book/getBookByCategory/${category}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getBookByAuthor=(author)=>{
    return Axios.get(`http://localhost:4000/book/getBookByAuthor/${author}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteCategory=(id)=>{
    return Axios.post(`http://localhost:4000/book/deleteCategory/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const deleteAuthor=(id)=>{
    return Axios.post(`http://localhost:4000/book/deleteAuthor/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
