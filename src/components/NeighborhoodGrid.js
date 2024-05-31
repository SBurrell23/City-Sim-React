import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <div>
                <div className="card hoodCard">
                    <div className="card-header">
                        {gridOrSingle}
                    </div>
                    <div className="card-body">
                        { stats && 
                        <div>
                            <div className="row">
                                <div className="col-3">
                                    <h5 className="card-title">Demographics</h5>
                                    <p className="card-text">Max Age: {stats.stats.max_age}</p>
                                    <p className="card-text">Average Age: {stats.stats.avg_age}</p>
                                    <p className="card-text">% of Total Population: {stats.stats.percent_of_total_population}%</p>
                                    <p className="card-text">Total Citizens: {stats.stats.total_people}</p>
                                </div>
                                <div className="col-2">
                                    <h5 className="card-title">Popular Names</h5>
                                    {
                                        stats.commonNames.map((person, index) => (
                                            <p key={index} className="card-text">
                                                ({person.num_appearances}) {person.firstName}
                                            </p>
                                        ))

                                    }
                                </div>
                                <div className="col-2">
                                    <h5 className="card-title">Oldest Citizens</h5>
                                    {
                                        stats.oldestCitizens.map((person, index) => (
                                            <p key={index} className="card-text">
                                                ({person.age}) {person.firstName} {person.lastName}
                                            </p>
                                        ))

                                    }
                                </div>
                                <div className="col-5">
                                    <h5 className="card-title">Most Recent Birth</h5>
                                    {
                                        stats.mostRecentBirth.map((person, index) => (
                                            <p key={index} className="card-text">
                                                <table className="table table-bordered table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Attribute</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{person.id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>First Name</td>
                                                            <td>{person.firstName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Last Name</td>
                                                            <td>{person.lastName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Job</td>
                                                            <td>{person.job}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Age</td>
                                                            <td>{person.age}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Favorite Food</td>
                                                            <td>{person.favoriteFood}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Favorite Hobby</td>
                                                            <td>{person.favoriteHobby}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Neighborhood</td>
                                                            <td>{person.neighborhood}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Born</td>
                                                            <td>{person.born}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Country</td>
                                                            <td>{person.country}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Personality</td>
                                                            <td>{person.personality}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Parent A</td>
                                                            <td>{person.parentA}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Parent B</td>
                                                            <td>{person.parentB}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </p>
                                        ))

                                    }
                                </div>
                            </div>
                            <button className="btn btn-primary mt-3" onClick={() => setGridOrSingle("grid")}>Back</button>
                        </div>
                        }
                        
                    </div>
                </div>
            </div>
        );
};

export default NeighborhoodGrid;
    
