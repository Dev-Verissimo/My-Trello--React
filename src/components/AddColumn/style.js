import styled from "styled-components";

export const Modal = styled.div`
    width: 400px;
    height: 400px;

    display: ${props => props.display};

    background-color: #fff;
    position: absolute;
    left: 20px;
`