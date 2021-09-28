import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 15px;
    height: 100vh;

    display: flex;
    flex: 0 0 320px;
    gap: 50px;


   

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 38px;

        h2{
            font-weight: 500;
            font-size: 16px;
            padding: 0 10px;
        }

        button{
            width: 38px;
            height: 38px;
            border-radius: 18px;
            background-color: #3b5b;
            border: 0;
            cursor: pointer;
        }
    }

    ul{
        margin-top: 30px;
    }
`;
