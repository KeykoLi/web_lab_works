import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItem: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItem[itemIndex].cartQuantity += 1;
                toast.info(`Increase ${state.cartItem[itemIndex].title} product quantity`, {
                    position: "bottom-left",
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItem.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left",
                });
            }
            state.cartTotalAmount += action.payload.price;
        },
        removeFromCart(state, action) {
            const nextCartItem = state.cartItem.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );

            return {
                ...state,
                cartItem: nextCartItem,
            };
            state.cartTotalAmount -= action.payload.price * action.payload.cartQuantity;
        },

        decreaseCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
        
            if (itemIndex >= 0) {
                if (state.cartItem[itemIndex].cartQuantity > 1) {
                    state.cartItem[itemIndex].cartQuantity -= 1;
        
                    toast.info(`Decrease ${action.payload.title} cart quantity`, {
                        position: "bottom-left",
                    });
                } else {
                    toast.warning(`Quantity can't be decreased further for ${action.payload.title}`, {
                        position: "bottom-left",
                    });
                }
            }
            state.cartTotalAmount -= action.payload.price;
        },

        increaseCart(state, action) {
            const itemIndex = state.cartItem.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
        
            if (itemIndex >= 0) {
                if (state.cartItem[itemIndex].cartQuantity > 0) {
                    state.cartItem[itemIndex].cartQuantity += 1;
        
                    toast.info(`Increase ${action.payload.title} cart quantity`, {
                        position: "bottom-left",
                    });
                } else {
                    toast.warning(`Quantity can't be increased further for ${action.payload.title}`, {
                        position: "bottom-left",
                    });
                }
            }
            state.cartTotalAmount += action.payload.price;
        },
        


    },
});

export const { addToCart, removeFromCart, decreaseCart, increaseCart } = cartSlice.actions;
export default cartSlice.reducer;
