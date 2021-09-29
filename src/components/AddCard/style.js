import styled from "styled-components";

export const Modal = styled.div`
    width: -webkit-fill-available;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;


    background-color: #ffffff63;

    display: ${props => props.display};

    

    .container {
        width: 400px;
        height: 400px;
        background-color: #fff;

        position: relative;
        margin: 10% auto;
    }

    .button{
        width: 70px;
        height: 70px;

        border-radius: 50px;
        border: none;

        background-color: rgb(30, 226, 12);

        font-size: 15px;
        color: white;
}
`