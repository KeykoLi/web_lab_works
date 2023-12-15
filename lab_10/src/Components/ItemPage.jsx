import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { addToCart } from "./cartSlice";


const ItemPage = () => {
    const [detail, setDetail] = useState([]);
    const location = useLocation();
    const itemDetail = location.state?.detail;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (itemDetail) {
            setDetail([itemDetail]);
        }
    }, [itemDetail]);

    useEffect(() => {
        if (!itemDetail) {
            navigate('/catalog');
        }
    }, [itemDetail, navigate]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        // navigate("/additem");
    };


        return (
            <div>
            
                {detail.map((x) => (
                    <div className='detail_info' key={x.title}>
                        <div className='img-box'>
                            <img src={x.image} alt='' id='img-box' />
                        </div>
                        <div className='item_detail'>
                            <h2 className='item_page_title'>{x.title}</h2>
                            <p className='item_page_price'>Price: {x.price}</p>
                            <p className='item_page_des'>{x.des}</p>
                            <p className='item_page_category'>{x.category}</p>
                            <div className='item_page_btn'>
                            <button className='secondary-button-item' onClick={() => handleAddToCart(x)}>Add To Cart</button>
                            <button className='secondary-button-item-go-back' onClick={() => navigate(`/catalog`)}>Go Back</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );

    
    };
export default ItemPage