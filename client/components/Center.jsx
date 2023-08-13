import styled from 'styled-components'

const StyledDiv = styled.div`
width:1200px;
margin:0px auto;
padding: 0px 20px;
`;

export default function Center({ children }) {
    return (
        <StyledDiv>{children}</StyledDiv>
    )
}
