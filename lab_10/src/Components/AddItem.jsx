import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decreaseCart, increaseCart } from "./cartSlice";
import { useNavigate, useLocation } from 'react-router-dom';

const AddItem = () => {
    const navigate = useNavigate();
    const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
    const cartItems = useSelector((state) => state.cart.cartItem);
    const dispatch = useDispatch()

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    }

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleIncreaseCart = (product) => {
        dispatch(increaseCart(product));
    };

    // Перевірте, чи cartTotalAmount є числом перед викликом toFixed
    const totalAmount = cartItems.length === 1 ? "Total Amount: 0.00$" :
        typeof cartTotalAmount === 'number' ? cartTotalAmount.toFixed(2) : "0.00";

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((x) => (
                        <div className='detail_info' key={x.id}>
                            <div className='img-box'>
                                <img src={x.image} id="image_item_cart" />
                            </div>
                            <div className='item_detail'>
                                <h2 className='item_page_title'>{x.title}</h2>
                                <p className='item_page_price'>Price: {x.price}</p>
                                <p className='item_page_des'>{x.des}</p>
                                <p className='item_page_des'>{x.category}</p>
                                <p>Quantity: {x.cartQuantity}</p>

                                <div className='item_page_btn'>
                                    <button className='secondary-button-item-go-back'
                                        onClick={() => handleRemoveFromCart(x)}>Remove</button>
                                </div>

                                <div className="cart-product-quantity">
                                    <button className='click_b_in' onClick={() => handleDecreaseCart(x)}>
                                        -
                                    </button>
                                    <div className="count">{x.cartQuantity}</div>
                                    <button className='click_b_in' onClick={() => handleIncreaseCart(x)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty</p>
            )}
            <div className='TotalAmout'>
                {totalAmount}
            </div>
        </div>
    )
}

export default AddItem