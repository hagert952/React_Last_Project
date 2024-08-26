import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartcontext';
import toast from 'react-hot-toast';
export default function RecentProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingw, setLoadingw] = useState(false);

  let { addProductToCard, getLoggedUserCarts, addProductTowishlist, getLoggedUserwishlist, getcount, SetGetCount } = useContext(CartContext);

  async function getWishlist() {
    let response = await getLoggedUserwishlist();
    if (response.data.status === "success") {
      setWishlists(response.data.data);
    }
  }

  async function addToWishlist(id) {
    setLoadingw(true);
    let response = await addProductTowishlist(id);
    if (response.data.status === "success") {
      setLoadingw(false);
      await getWishlist();
      toast(response.data.message, {
        icon: <i className="fa-solid fa-check fa-xl text-9xl"></i>,
        position: 'top-right',
        style: {
          background: 'green',
          color: 'white',
          fontSize: '8px',
          width: "30%"
        },
      });
    } else {
      setLoadingw(false);
      toast(response.data.message);
    }
  }

  async function addToCart(id) {
    setLoading(true);
    let response = await addProductToCard(id);
    if (response.data.status === "success") {
      setLoading(false);
      await getLoggedUserCarts();
      getProducts();
      toast(response.data.message, {
        icon: <i className="fa-solid fa-check fa-xl text-9xl"></i>,
        position: 'top-right',
        style: {
          background: 'green',
          color: 'white',
          fontSize: '8px',
          width: "30%"
        },
      });
    } else {
      toast(response.data.message);
    }
  }

  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          placeholder="Search..."
          className="w-full max-w-2xl p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {filteredProducts.length > 0 && !loadingw && !loading ? (
        <div className="flex flex-wrap ">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full sm:w-1/4 md:w-1/4 lg:w-1/4 px-1 mb-1">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300">
                <div className="product p-2">
                  <Link to={`/productdetails/${product.id}`}>
                    <img src={product.imageCover} className="w-full" alt={product.title} />
                    <h3 className="text-emerald-700 text-start text-[12px]">{product.category.name}</h3>
                    <h3 className=" font-semibold text-start text-[12px]">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <div className="flex justify-between p-2 text-[12px]">
                      <span >{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-[12px] text-yellow-400"></i>
                        {product.ratingsAverage}
                      </span>
                   </div>
                  </Link>
                  <div className="flex justify-center items-center">
                    <button onClick={() => addToCart(product.id)} className="btn">Add To Cart</button>
                    <i
                      onClick={() => addToWishlist(product.id)}
                      className={`mx-2 fa-solid fa-heart fa-xl ${wishlists.some(w => w._id === product.id) ? 'text-red-600' : ''}`}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-overlay">
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      )}
    </>
  );
}
