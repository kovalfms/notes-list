import React from 'react';
import styles from './ListItem.module.css'
import List from "../List/List";

const ListItem = ({
    listLength,
    item,
    index,
    addSubList,
    deleteSublist,
    upOrDownListItem,
    onRemoveItem,
    setNoteList,
    noteList
}) => {

    const {text, id, sublist} = item

    return (
        <div className={styles.listItem}>
            <span style={{margin: "10px"}}>{text}</span>
            <div>
                <button
                    className={styles.btnUpDown}
                    disabled={index === 0}
                    onClick={() => upOrDownListItem(item, -1)}
                >
                    &uarr;
                </button>
                <button
                    className={styles.btnUpDown}
                    disabled={index === listLength - 1}
                    onClick={() => upOrDownListItem(item, 1)}
                >
                    &darr;
                </button>
                <button
                    className={styles.btnDelete}
                    onClick={() => onRemoveItem(id)}
                >
                    &times;
                </button>

                {sublist
                    ? <button
                        className={styles.btnRemoveSubList}
                        onClick={() => deleteSublist(id)}
                    >
                        Remove Sublist
                    </button>
                    : <button
                        className={styles.btnAddSubList}
                        onClick={() => addSubList(id)}
                    >
                        Add Sublist
                    </button>
                }
                {item.hasOwnProperty('sublist') &&
                    <List
                        data={item.sublist}
                        onUpdate={setNoteList}
                        parentData={noteList}
                        parentId={item.id}
                    />
                }
            </div>
        </div>
    );
}
export default ListItem;