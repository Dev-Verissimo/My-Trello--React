import React from "react";
import { Container } from "./style";


const Card = (props) => {
    return(
        <Container>
           <div>
                <h1>
                    {props.card.title}
                </h1>
           </div>
        </Container>
    )
}

export default Card