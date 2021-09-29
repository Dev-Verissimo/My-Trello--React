import React, { useState } from "react";
import Button from "../Button";
import { Modal } from "./style";

const AddCard = (props) => {



    const [inputData, setData] = useState('')

    const handleInputChange = (e) => {
        setData(e.target.value)
    }

    const handleClick = () => {
        props.handleCard(inputData)
    }

    return(
        <Modal display={props.display}>
            <div className="container">
                <label htmlFor="ColunaName">
                    Título da Coluna: 
                </label>
                <input 
                onChange={handleInputChange}
                value={inputData}
                type="text"
                name="ColunaName"
                id="ColunaName" />
                <Button onClick={handleClick}>adicionar</Button>
            </div>
        </Modal>
    )
}

export default AddCard;