import React from "react";

import Task from "../Task";
import { Container } from "./style";
import Card from "../Card";

const Tasks = ({tasks,card, onClick}) => {
    return(
        <Container>
            {tasks.map((task) =>(
                   <Task onClick={onClick} id={task.id} task={task}>
                        {card.map((cards) =>(
                            <Card card={cards}/>
                        ))}
                   </Task>
            ) )}
        </Container>
    )
}

export default Tasks