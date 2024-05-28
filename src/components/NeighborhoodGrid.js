import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NeighborhoodGrid() {
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [previousNeighborhoods, setPreviousNeighborhoods] = useState([]);

    useEffect(() => {

        const getNeighborhoods = async () => {
            axios.get('http://localhost:8080/neighborhoodStats')
            .then(response => {
                setNeighborhoods(prevNeighborhoods => {
                    setPreviousNeighborhoods(prevNeighborhoods); // Set the previous neighborhoods
                    return response.data;
                });
            })
            .catch(error => {
                console.log(error);
            });
        };
    
        getNeighborhoods();
        const intervalId = setInterval(getNeighborhoods, 1250);
        return () => clearInterval(intervalId);
        
      }, []); // Empty dependency array ensures this runs once on mount


    return (
        <div className='row'>
        {neighborhoods.map((neighborhood, index) => (
            <div key={index} className="col-3 mb-2">
                <div className={`card nhCard ${neighborhood.count > previousNeighborhoods[index]?.count ? 'flash' : ''}`}>
                    <div className="card-body">
                        <h5 className="card-title">{neighborhood.neighborhood}</h5>
                        <p className="card-text">Population: {neighborhood.count}</p>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
};

export default NeighborhoodGrid;
    
