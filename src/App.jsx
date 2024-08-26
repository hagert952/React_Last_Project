import { useState } from 'react';

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Layout from './Components/Layout/Layout';
import Notfound from './Components/Notfound/Notfound';
import Wishlist from './Components/Wishlist/Wishlist';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import Code from './Components/Code/Code';
import Resetpassword from './Components/Resetpassword/Resetpassword';
import UserContextProvider from './context/usercontext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './context/cartcontext';
import  { Toaster } from 'react-hot-toast';
import SubCategories from './Components/subCategories/subCategories';
import Checkout from './Components/Checkout/Checkout';
import Allorders from './Components/Allorders/Allorders';


let x=createBrowserRouter([

{
  path:"",element:<Layout/>

,children:[

  {index :true,element:<ProtectedRoute><Home/></ProtectedRoute>   },
  {path :"Home",element:<ProtectedRoute><Home/></ProtectedRoute>  },
  {path :"cart",element:<ProtectedRoute><Cart/></ProtectedRoute> },
  {path :"brands",element:<ProtectedRoute><Brands/></ProtectedRoute> },
  {path :"/brands/:_id",element:<ProtectedRoute><Brands/></ProtectedRoute> },
 {path:"/productdetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path :"register",element:<Register/> },
  {path :"login",element:<Login/> },
  {path :"/categories/:category/:_id",element:<ProtectedRoute><Categories /> </ProtectedRoute>},
  {path :"/checkout",element:<ProtectedRoute><Checkout /> </ProtectedRoute>},
  {path :"/categories",element:<ProtectedRoute><Categories /> </ProtectedRoute>},
  {path :"products",element:<ProtectedRoute><Products /> </ProtectedRoute>},
  {path :"wish list",element:<ProtectedRoute><Wishlist /></ProtectedRoute> },
  {path:"/code",element:<ProtectedRoute><Code/></ProtectedRoute>},
  {path :"/forgetpassword",element:<Forgetpassword/> },
  {path :"/resetpassword",element:<ProtectedRoute><Resetpassword /> </ProtectedRoute>},
  {path :"/subcategories",element:<ProtectedRoute><SubCategories /> </ProtectedRoute>},
  {path :"/allorders",element:<ProtectedRoute><Home/> </ProtectedRoute>},
  {path :"*",element:<Notfound /> }
]

}
  
])

function App() {
  const [count, setCount] = useState(0)

  return<>
<UserContextProvider>
  
  <CartContextProvider>
  <RouterProvider router={x}></RouterProvider>
  <Toaster/>

  </CartContextProvider>
  </UserContextProvider></>
}

export default App
