import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
    max-width: 100%;
    height: 100px;
  `;
const BigImage = styled.img`
  width: 20 0px;
  height: 150px;
  margin: 0px auto;
  border-radius: 10px;
 
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
    img{

      border-radius: 10px;
    }
  `;
const ImageButton = styled.div`
    ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
    `}
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
    flex-wrap:wrap;
    object-fit:cover;
    
  @media screen and (max-width: 550px) {
   
   display  :flex ;
   flex-direction: column;
   justify-content: center;
   height:80px;
   flex-wrap:wrap;
     }
  `;
const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(image => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}>
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}