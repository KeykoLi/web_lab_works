import React, { useState, useEffect } from 'react'

import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'; 


import PlantsData from './plantsData';
import Navbar from './Navbar'

const Catalog = () => {
    const [detail, setDetail] = useState([]);
    const [close, setClose] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const navigate = useNavigate();


    const Search = (event) => {
        setFilteredItems(PlantsData.filter(item => item.title.toLowerCase().includes(event.target.value.toLowerCase())));
    }


    const detailPage = (curElm) => {
        setDetail([curElm]);
        setClose(true)
    }

    const filters = ["Baby", "Post", "Normal"];

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            const updatedFilters = selectedFilters.filter((filter) => filter !== selectedCategory);
            setSelectedFilters(updatedFilters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters]);

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            const filteredData = PlantsData.filter((item) => selectedFilters.includes(item.category));
            setFilteredItems(filteredData);
        } else {
            setFilteredItems([...PlantsData]);
        }
    };


    return (
        <div>
            <Navbar />
            <div className="input-group">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={Search}
                />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="search">
                        <AiOutlineSearch />
                    </i>
                </span>
            </div>

            <div className="buttons-container">
                {filters.map((category, idx) => (
                    <button
                        onClick={() => handleFilterButtonClick(category)}
                        className={`button ${selectedFilters.includes(category) ? "active" : ""}`}
                        key={`filters-${idx}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="items-container">
                {filteredItems.map((item, idx) => (
                    <div key={`items-${idx}`} className="work-section-info">
                        <div className="info-boxes-img-container">
                            <img src={item.image} className="image_catal" />
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.price}</p>
                        <p className="category">{item.category}</p>
                        <button
                            className="secondary-button-item"
                            onClick={() => navigate(`/item/${item.id}`, { state: { detail: item } })}
                        >
                            View More
                        </button>

                    </div>
                ))}
            </div>
        </div>



    );
}

export default Catalog;
