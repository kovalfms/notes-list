import './App.css'
import List from "./components/List/List";
import {baseStorage} from "./utils/baseStorage";
import {useCallback} from "react";


function App() {
    const updateStorage = useCallback(data => {
        baseStorage.setItem('notes', data)
    }, [])

    return (
        <div className="wrapper">
            <div className="list">
                <List data={baseStorage.getItem('notes') || []} onUpdate={updateStorage}/>
            </div>
        </div>
    );
}

export default App;
