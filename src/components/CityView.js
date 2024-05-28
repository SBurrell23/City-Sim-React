//import React, { useState } from 'react';
//import axios from 'axios';
import NeighborhoodGrid from "./NeighborhoodGrid";
import MostRecentCitizen from "./MostRecentCitizen";

function CityView() {

    return (
        <div className="container" style={{width:"100%"}}>
            <h2 className="mb-4 mt-4">City View</h2>
            <NeighborhoodGrid />
            <MostRecentCitizen />
        </div>
    );

};

export default CityView;
    
