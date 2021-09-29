import React from "react";

import Button from "../Button"
import Card from "../Card"
import { Container } from "./style";

const Task = ({task, id, children, onClick}) => {
    return(
        <Container id={id}>
            <h1>{task.title}</h1>
            <p>{task.id}</p>

            {children}
            
            <Button onClick={onClick}>+</Button>
        </Container>
    )
}

export default Task