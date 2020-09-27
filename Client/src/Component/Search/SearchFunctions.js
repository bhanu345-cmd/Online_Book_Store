import Axios from 'axios';
export const search=(item)=>{
   return Axios.get(`http://localhost:4000/book/search/${item}`).then((itemList)=>{
            return itemList.data;
    }).catch((err)=>{return {message:err}});
}