import Link from "next/link";
import styled from "styled-components";
import css from "styled-jsx/css";
const StyledLink = styled(Link)`
border: none;
padding: 8px 10px;
border-radius: 4px;
cursor: pointer;
display: inline-flex;
    align-items: center;
    justify-content: center;
  svg{
    margin-right: 10px;
  }
${props => props.white && props.outlined && css`
    color: #fff;
    border:2px solid white;

    `}
    
    
    ${props => props.primary && css`
    background-color: skyblue;
     color: #000;
    
`}

:hover{
  background-color:#fff;
  color:black;
}
`;

export default function ButtonLink(props) {
    return (
        <div>
            <StyledLink {...props} />
        </div>
    )
}
