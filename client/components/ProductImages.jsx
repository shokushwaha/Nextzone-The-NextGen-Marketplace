import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
    max-width: 100%;
    height: 100px;
  `;
const BigImage = styled.img`
  border-radius: 10px;
`;
const ImageButtons = styled.div`
display:flex;
flex-direction: column;
height:400px;
justfy-content: space-between;
    img{
      border-radius: 10px;
    }
  `;
const ImageButton = styled.div`
    // ${props => props.active ? `
    //   border-color: #ccc;
    // ` : `
    //   border-color: transparent;
    // `}
    object-fit: contain;
    margin-top:19px;
    cursor: pointer;
    border-radius: 5px;
    flex-wrap:wrap;
    object-fit:cover;
    // border: 3px solid gray;
    padding :3px;
    
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
    <div>
      <div className="flex flex-row-reverse gap-6 p-5">
        <BigImageWrapper className="shadow-2xl h-[400px] w-[400px] p-3 rounded-md">
          <BigImage className="object-contain  h-[400px] w-[400px] rounded-md" src={activeImage} />
        </BigImageWrapper>
        <ImageButtons>
          {images.map(image => (
            <ImageButton className="shadow-2xl"
              key={image}
              active={image === activeImage}
              onMouseMove={() => setActiveImage(image)}>
              <Image src={image} alt="" />
            </ImageButton>
          ))}
        </ImageButtons>
      </div>
    </div>
  );
}