import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';


const ItemPage = () => {
    const [detail, setDetail] = useState([]);
    const location = useLocation();
    const itemDetail = location.state?.detail;

    const navigate = useNavigate();

    useEffect(() => {
        if (itemDetail) {
            setDetail([itemDetail]);
        }
    }, [itemDetail]);

    return (
        <div>

            <Navbar/>

            {detail.map((x) => (
                <div className='detail_info' key={x.title}>
                    <div className='img-box'>
                        <img src={x.image} alt='' id="img-box" />
                    </div>
                    <div className='item_detail'>
                        <h2 className='item_page_title'>{x.title}</h2>
                        <p className='item_page_price'>Price: {x.price}</p>
                        <p className='item_page_des'>{x.des}</p>
                        <p className='item_page_category'>{x.category}</p>
                        <div className='item_page_btn'>
                            <button className='secondary-button-item'>Add To Cart</button>
                            <button className='secondary-button-item-go-back' onClick={() => navigate(`/catalog`)}>Go Back</button>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    );
};

export default ItemPage;
