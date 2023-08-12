import styled from "styled-components"

const StyledInput = styled.input`
width: 100%;
padding: 4px;
margin-bottom: 4px;
border: 2px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
`;
export default function Input(props) {
    return (
        <StyledInput {...props} />
    )
}
