import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,100&display=swap');
 
*{
    margin: 0;
    padding: 0;

    box-sizing: border-box;
}

html, body, #root{
    height: 100%;
    width: fit-content;
}

body{
    font: 14px 'Roboto';
    background: #eae2b7;
    color: white;
    -webkit-font-smoothing: antialiased !important;
}
ul{
    list-style: none;
}
`