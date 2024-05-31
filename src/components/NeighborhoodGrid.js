import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NeighborhoodGrid() {
    const [gridOrSingle, setGridOrSingle] = useState("grid");
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

    function goToHood(nh){
        setGridOrSingle(nh);
    }

    if (gridOrSingle === "grid")
        return (
            <div className='row'>
            {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="col-3 mb-2">
                    <div onClick={() => goToHood(neighborhood.neighborhood)} className={`card nhCard ${neighborhood.count > previousNeighborhoods[index]?.count ? 'flash' : ''}`}>
                        <div className="card-body">
                            <h5 className="card-title">{neighborhood.neighborhood}</h5>
                            <p className="card-text">Population: {neighborhood.count}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        );
    else //gridOrSingle is the name of the neighboorhood
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        {gridOrSingle}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <button className="btn btn-primary" onClick={() => setGridOrSingle("grid")}>Back</button>
                    </div>
                </div>
            </div>
        );
};

export default NeighborhoodGrid;
    
