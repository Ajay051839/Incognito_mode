import React from "react";
import styled from "styled-components";
import background from "./movie.jpg";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
}
const Container=styled.div`

height:90vh;
width:100vw;
img{
    my-10;
    margin-top:70px;
    height:100vh;
    width:100vw;
    opacity:0.9;

}
`;

