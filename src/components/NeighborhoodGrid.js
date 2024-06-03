import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NeighborhoodView from './NeighborhoodView';

function NeighborhoodGrid() {
    const [gridOrSingle, setGridOrSingle] = useState("grid");
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [previousNeighborhoods, setPreviousNeighborhoods] = useState([]);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        getNeighborhoods();
        const intervalId = setInterval(getNeighborhoods, 1250);
        return () => clearInterval(intervalId);
        
      }, []); // Empty dependency array ensures this runs once on mount

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
    
    function goToHood(nh){
        setGridOrSingle(nh);
        setStats(null);
        axios.get('http://localhost:8080/neighborhoodDetails?name=' + nh)
        .then(response => {
            setStats(response.data);
        })
        .catch(error => {
            console.log(error);
        });
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
            <NeighborhoodView stats={stats} name={gridOrSingle} goBack={() => setGridOrSingle("grid")}/>
        );
};

export default NeighborhoodGrid;
    
