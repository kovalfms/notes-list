import React, {useEffect, useState} from 'react';
import {v4 as uniqId} from "uuid"
import ListItem from "../ListItem/ListItem";
import Form from "../form/Form";

const List = () => {
    const [noteList, setNoteList] = useState([])

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('notes'));
    //     if (items) {
    //         setNoteList(items);
    //     }
    // }, []);

    const addNewItem = (text) => {
        const newItem = {
            id: uniqId(),
            text,
        }
        setNoteList([...noteList, newItem])
        localStorage.setItem('notes', JSON.stringify([...noteList, newItem]));
    }

    const addSubList = (itemId) => {
        const list = [...noteList]
        const findId = list.findIndex(({id}) => id === itemId);
        list[findId].sublist = []
        setNoteList(list)
        localStorage.setItem('notes', JSON.stringify(list))
    }

    const deleteSublist = (itemId) => {
        const list = [...noteList]
        const findId = list.findIndex(({id}) => id === itemId);
        delete list[findId].sublist
        setNoteList([...noteList])
        localStorage.setItem('notes', JSON.stringify(list))
    }

    const upOrDownListItem = (item, delta) => {
        const newPosition = [...noteList];
        const currentIndex = newPosition.indexOf(item);
        // Remove from the array
        newPosition.splice(currentIndex, 1);
        // put it back in at the new position
        newPosition.splice(currentIndex + delta, 0, item);
        setNoteList(newPosition)
        localStorage.setItem('notes', JSON.stringify(newPosition))
    }

    const onRemoveItem = (id) => {
        setNoteList(noteList.filter(item => item.id !== id))
        localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.getItem('notes'))
                .filter((item) => item.id !== id),
            )
        )
    }

    return (
        <div>
            <ul>
                {noteList.map((item, index) =>
                    <li key={item.id}>
                        <ListItem
                            item={item}
                            index={index}
                            listLength={noteList.length}
                            onRemoveItem={onRemoveItem}
                            upOrDownListItem={upOrDownListItem}
                            addSubList={addSubList}
                            deleteSublist={deleteSublist}
                        />
                    </li>
                )}
                <Form addNewItem={addNewItem} noteList={noteList}/>
            </ul>
        </div>
    );
};

export default List;
