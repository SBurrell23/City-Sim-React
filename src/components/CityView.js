import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

function CityView() {
    const [neighborhoods, setNeighborhoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/neighborhoodStats')
            .then(response => {
                setNeighborhoods(response.data); 
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2>City View</h2>
            <Row>
                {neighborhoods.map((neighborhood, index) => (
                    <Col key={index} xs={6} md={3}>
                        <div className="neighborhood-card">
                            <h3>{neighborhood.neighborhood}</h3>
                            <p>Population: {neighborhood.count}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CityView;
    
