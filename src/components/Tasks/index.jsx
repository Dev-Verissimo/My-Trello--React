import React from "react";
import Task from "../Task";
import { Container } from "./style";

const Tasks = ({tasks}) => {
    return(
        <Container>
                {tasks.map((task) =>(
                   <Task id={task.id} task={task} />
                ) )}
        </Container>
    )
}

export default Tasks