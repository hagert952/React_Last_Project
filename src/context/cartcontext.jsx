import axios from "axios";
import { createContext, useEffect, useState ,} from "react";

export let CartContext=createContext();
export default function CartContextProvider(props){
 const [getcount,SetGetCount]=useState(0);
useEffect(()=>{getLoggedUserCart()},[])
let headers ={token:localStorage.getItem("userToken")};
const [cartId,setcartId]=useState(0);
 function deleteCartItem(productId){
 return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)
}
 function deletewhishlist(wishlistid){
 return   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishlistid}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)
}
 function clearcart(){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`

        ,{headers}
    ) 
    .then((res)=>{
    res
     
    }).catch((res)=>{err;
    })
  
  }
function getLoggedUserCart(){
  return   axios .get(`https://ecommerce.routemisr.com/api/v1/cart`,
{headers }

    ).then((res)=>{
        console.log(res.data.data._id);
        setcartId(res.data.data._id)
        return res}).catch((res)=>res)
}
function getLoggedUserwishlist(){
  return   axios .get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
{headers }

    ).then((res)=>res).catch((res)=>res)
}
function getLoggedUserCarts(){
  return   axios .get(`https://ecommerce.routemisr.com/api/v1/cart`,
{headers }

    ).then((res)=>SetGetCount(res.data.numOfCartItems)
    ).catch((res)=>res)
}
function updateCartProductQuantity(productId ,newCount){
  return   axios .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {count:newCount},
{headers }

    ).then(res=>res).catch((res)=>res)
}



 function addProductToCard(productId){
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,

        {productId:productId},{headers

           
        }
    ).then((res)=>res

// console.log(res);


    )

    .catch((error)=>error
    )
}
 function addProductTowishlist(productId){
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,

        {productId:productId},{headers

           
        }
    ).then((res)=>res

// console.log(res);


    )

    .catch((error)=>error
    )
}
function checkout(cardId,url,formData){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`
,{shippingAddress:formData}
,{headers}
).then((res)=>res).catch((err)=>err)

}
    return (
    <CartContext.Provider value={{addProductToCard,getLoggedUserCart,getLoggedUserCarts,deletewhishlist
,deleteCartItem,clearcart,getcount,SetGetCount
    ,checkout ,cartId,addProductTowishlist   ,updateCartProductQuantity,getLoggedUserwishlist
    }}>
    
        {props.children}
    </CartContext.Provider>)
}