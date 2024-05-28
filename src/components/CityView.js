import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CityView() {
    const [neighborhoods, setNeighborhoods] = useState([]);

    useEffect(() => {
        getNeighborhoods();
        const interval = setInterval(() => {
            getNeighborhoods();
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, []);

    function getNeighborhoods() {
        axios.get('http://localhost:8080/neighborhoodStats')
            .then(response => {
                setNeighborhoods(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    

    return (
        <div className="container" style={{width:"100%"}}>
            <h2>City View</h2>
            <div className='row'>
                {neighborhoods.map((neighborhood, index) => (
                    <div key={index} className="col-3 mb-2">
                        <div className={`card nhCard ${neighborhood.changed ? 'flash' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title">{neighborhood.neighborhood}</h5>
                                <p className="card-text">Population: {neighborhood.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityView;
    
