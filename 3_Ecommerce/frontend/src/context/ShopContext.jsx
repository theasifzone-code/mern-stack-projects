import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// create context 
export const ShopContext = createContext();

// create context provider
const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
     const navigate = useNavigate();
     // add to cart function
    const addToCart = async (itemId,size) => {
        if(!size){
            toast.error('Select Product Size', {theme: "colored"});
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    // get cart count function
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
               try {
                if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }
               } catch (error) {
                 toast.error(error.message, {theme: "colored"});
               }
            }
        }
        return totalCount;
    }
    
    // update cart quantity
    const updateQuantity = (itemId,size,quantity) => {
            let cartData = structuredClone(cartItems);
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
    }

    // get cart amount
    const getCartAmount = ()=>{
         let totalAmount = 0;
         for(const items in cartItems){
            let itemInfo = products.find((item) => item._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    toast.error(error.message, {theme: "colored"});
                }
            }
         }
         return totalAmount;
    }

    // context value
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;