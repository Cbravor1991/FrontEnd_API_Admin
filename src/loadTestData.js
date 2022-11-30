#! /usr/bin/env node

import DataProperties from ".data/dataProperties";
import DataPublications from ".data/dataPublications";


function LoadTextData() {

  for (let i=0; i<DataProperties.lenght; i++){
  
     axios.post('/createProperty',
                JSON.stringify(DataProperties[i]),
                {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                     }
                })
    
  }

  for (let j=0; j<DataPublications.lenght; j++){
  
    axios.post('/createPublication',
                JSON.stringify(DataPublications[i]),
                {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                     }
                })
    
  }

} export default LoadTextData
