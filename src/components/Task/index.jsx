import React from "react";
import { Container } from "./style";

const Task = ({task, id}) => {
    return(
        <Container id={id}>
            <h1>{task.title}</h1>
            <p>{task.id}</p>
        </Container>
    )
}

export default Task