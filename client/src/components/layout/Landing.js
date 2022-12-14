import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from './bg';
import Button from 'react-bootstrap/Button';
// import Navbar from './Navbar';

import '../../index.css';


import styled from "styled-components";




const Landing = () => {
  return (
    <>
      <BackgroundImage />
      <div className="body flex column a-center j-center ">
        <div className="text flex column text-white ">
          <h1 className="text-white">Unlimited movies, TV shows and more.</h1>
          <h3 className="text-white">Watch anywhere. Cancel anytime.</h3>
          
          <h5 className="text-white">
            
            Ready to watch? 
          </h5>
          
        </div>
        </div>
        


          <button className="btn btn-lg btn-block" ><Link to='/register'>Get Started</Link></button>
          <Button variant="danger">Danger</Button>{' '}


          {/* <button className="ml-6">Log In</button> */}
        
        
      
      
      

    
</>

  );
};

// const Container = styled.div`
//   position: relative;
//   .content {
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     height: 110vh;
//     width: 80vw;
//     display: grid;
//     grid-template-rows: 15vh 85vh;
//     .body {
//       gap: 1rem;
//       .text {
//         gap: 1rem;
//         text-align: center;
//         font-size: 2rem;
//         h1 {
//           padding: 0 25rem;
//           font-size:50px;
//           color:white;
//         }
//         h3,h5{
//           color:white;
//         }
//       }
      
        
//         button {
//           padding: 0.5rem 1rem;
//           background-color: #e50914;
//           border: none;
//           cursor: pointer;
//           color: white;
//           font-weight: bolder;
//           font-size: 90%;
//           margin-left:700px;
//           height:4rem;
//           width:15rem;
          
//         }
      
      
//     }
//   }
// `;

export default Landing;

