import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitleBar from './components/titleBar';
import TopBar from './components/topBar';
import Search from './components/projectList/search';
import List from './components/projectList/list';

declare global {
    interface Window {
        electron: {
            quit: () => void;
            fetch: (...args: any[]) => any;
        }
    }

    interface ElectronFetch { 
        status: string, 
        statusText: string, 
        text: string 
    }

    interface Project {
        _id: string;
        title: string;
        platforms: string[];
        data: {
            design: string;
            blocks: string;
        }
    }
}

function App() {
    return (
        <BrowserRouter>
            <TitleBar />
            <TopBar />
            <Routes>
                <Route path='/' element={
                    <>
                        <Search />
                        <List />
                    </>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;