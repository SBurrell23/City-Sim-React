import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MostRecentCitizen() {
    const [person, setNewestCitizen] = useState([]);

    useEffect(() => {

        const getNeighborhoods = async () => {
            axios.get('http://localhost:8080/newestCitizen')
            .then(response => {
                setNewestCitizen(response.data);
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
        <div className="mt-2">
            {person.id !== undefined ? (
                <div className ="row">
                    <div className="col-4">
                        <h4 className="mb-4">Newest Person</h4>
                        <table className="table table-sm table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th>Attribute</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{ person.id }</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td>{ person.firstName }</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{ person.lastName }</td>
                            </tr>
                            <tr>
                                <td>Job</td>
                                <td>{ person.job }</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{ person.age }</td>
                            </tr>
                            <tr>
                                <td>Favorite Food</td>
                                <td>{ person.favoriteFood }</td>
                            </tr>
                            <tr>
                                <td>Favorite Hobby</td>
                                <td>{ person.favoriteHobby }</td>
                            </tr>
                            <tr>
                                <td>Neighborhood</td>
                                <td>{ person.neighborhood }</td>
                            </tr>
                            <tr>
                                <td>Born</td>
                                <td>{ person.born }</td>
                            </tr>
                            <tr>
                                <td>Personality</td>
                                <td>{ person.personality }</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{ person.country }</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-4"> 
                        <h4 className="mb-4">Parent A Details</h4>
                        <table className="table table-sm table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th>Attribute</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{ person.parentA.id }</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td>{ person.parentA.firstName }</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{ person.parentA.lastName }</td>
                            </tr>
                            <tr>
                                <td>Job</td>
                                <td>{ person.parentA.job }</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{ person.parentA.age }</td>
                            </tr>
                            <tr>
                                <td>Favorite Food</td>
                                <td>{ person.parentA.favoriteFood }</td>
                            </tr>
                            <tr>
                                <td>Favorite Hobby</td>
                                <td>{ person.parentA.favoriteHobby }</td>
                            </tr>
                            <tr>
                                <td>Neighborhood</td>
                                <td>{ person.parentA.neighborhood }</td>
                            </tr>
                            <tr>
                                <td>Born</td>
                                <td>{ person.parentA.born }</td>
                            </tr>
                            <tr>
                                <td>Personality</td>
                                <td>{ person.parentA.personality }</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{ person.parentA.country }</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-4">
                        <h4 className="mb-4">Parent B Details</h4>
                        <table className="table table-sm table-bordered">
                            <thead className="thead-dark">
                            <tr>
                            <th>Attribute</th>
                            <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>ID</td>
                            <td>{ person.parentB.id }</td>
                            </tr>
                            <tr>
                            <td>First Name</td>
                            <td>{ person.parentB.firstName }</td>
                            </tr>
                            <tr>
                            <td>Last Name</td>
                            <td>{ person.parentB.lastName }</td>
                            </tr>
                            <tr>
                            <td>Job</td>
                            <td>{ person.parentB.job }</td>
                            </tr>
                            <tr>
                            <td>Age</td>
                            <td>{ person.parentB.age }</td>
                            </tr>
                            <tr>
                            <td>Favorite Food</td>
                            <td>{ person.parentB.favoriteFood }</td>
                            </tr>
                            <tr>
                            <td>Favorite Hobby</td>
                            <td>{ person.parentB.favoriteHobby }</td>
                            </tr>
                            <tr>
                            <td>Neighborhood</td>
                            <td>{ person.parentB.neighborhood }</td>
                            </tr>
                            <tr>
                            <td>Born</td>
                            <td>{ person.parentB.born }</td>
                            </tr>
                            <tr>
                            <td>Personality</td>
                            <td>{ person.parentB.personality }</td>
                            </tr>
                            <tr>
                            <td>Country</td>
                            <td>{ person.parentB.country }</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : ( 
                <div>Fetching Data...</div> //Else we display Loading...
            )}
        </div>
    );
};

export default MostRecentCitizen;
    
