import clientConnection from './client';
import userByEmail from './queries';
import { useState } from 'react';


const client = clientConnection();

function Query(props) {
  const [queryResult, setQueryResult] = useState();
  client.query(userByEmail(props.email, props.password)).then((result) => {
    setQueryResult (result.data.userByEmail);
    
    
    

  });
   return queryResult
  
  
}

export default Query;
