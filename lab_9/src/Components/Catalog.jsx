import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { ClipLoader, FadeLoader } from 'react-spinners';
import Navbar from './Navbar';
import { debounce } from 'lodash';
import { getAllPlants } from '../api';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

const Catalog = () => {
    const [plants, setPlants] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllPlants();
    }, []);

    const getAllPlants = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/plant');

            const plantsData = response.data;
            console.log(plantsData);
            setPlants(plantsData);
        } catch (error) {
            console.error('Error fetching plant data:', error);
        } finally {
            setLoading(false);
        }
    };

    const Search = debounce((event) => {
        setFilteredItems(plants.filter(item => item.title.toLowerCase().includes(event.target.value.toLowerCase())));
    }, 300);

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
            const filteredData = plants.filter((item) => selectedFilters.includes(item.category));
            setFilteredItems(filteredData);
        } else {
            setFilteredItems([...plants]);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="input-group">
                <input
                    className="form-control"
                    placeholder="Search..."
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

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <p>Loading...</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
                        <ClipLoader color='#3a6159' loading={loading} size={150} speedMultiplier={2} />
                        <FadeLoader color="#36d7b7" speedMultiplier={2} />
                    </div>
                </div>
            ) : (
                <div className="items-container">
                    {filteredItems.map((item, idx) => (
                        <div key={`items-${idx}`} className="work-section-info">
                            <div className="info-boxes-img-container">
                                <img src={item.image} className="image_catal" alt="plant" />
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
            )}
        </div>
    );
}

export default Catalog;