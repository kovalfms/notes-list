import React, {useEffect, useState} from 'react';
import {v4 as uniqId} from "uuid"
import ListItem from "../ListItem/ListItem";
import Form from "../form/Form";


const List = ({data, onUpdate, parentData, parentId}) => {
    const [noteList, setNoteList] = useState(data)

    useEffect(() => {
        if (parentData && parentId) {
            const parentNote = parentData.map(note => note.id === parentId ? ({...note, sublist: noteList}) : note)
            return onUpdate(parentNote)
        }
        return onUpdate(noteList)
    }, [noteList])

    const addNewItem = (text) => {
        const newItem = {
            id: uniqId(),
            text,
        }
        setNoteList(prevState => [...prevState, newItem])
    }

    const addSubList =(itemId) => {
        const list = [...noteList]
        const findId = list.findIndex(({id}) => id === itemId);
        list[findId].sublist = []
        setNoteList(prevState => [...prevState])
    }

    const deleteSublist = (itemId) => {
        const list = [...noteList]
        const findId = list.findIndex(({id}) => id === itemId);
        delete list[findId].sublist
        setNoteList(prevState => [...prevState])
    }

    const upOrDownListItem = (item, delta) => {
        const newPosition = [...noteList];
        const currentIndex = newPosition.indexOf(item);
        // Remove from the array
        newPosition.splice(currentIndex, 1);
        // put it back in at the new position
        newPosition.splice(currentIndex + delta, 0, item);
        setNoteList(newPosition)
    }

    const onRemoveItem = (id) => {
        setNoteList(prevState => prevState.filter(item => item.id !== id)
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
                        {item.hasOwnProperty('sublist') &&
                            <List
                                data={item.sublist}
                                onUpdate={setNoteList}
                                parentData={noteList}
                                parentId={item.id}
                            />
                        }
                    </li>
                )}
                <Form addNewItem={addNewItem}/>
            </ul>
        </div>
    );
};

export default List;
