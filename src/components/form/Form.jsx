import React, {useState} from 'react';


const Form = ({addNewItem, noteList}) => {
    const [inputText, setInputText] = useState('')

    const checkInput = () => {
        if (inputText === '') {
            return
        }
        addNewItem(inputText)
        setInputText("");
    };

    return (
        <li>
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="enter your text"
                type="text"
            />
            <button onClick={() => checkInput()}>Add</button>
        </li>
    );
};

export default Form;