import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitleBar from './components/titleBar';
import TopBar from './components/topBar';
import ProjectList from './pages/projectList';
import Project from './pages/project';

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
                <Route path='/' element={<ProjectList />} />
                <Route path='/projects/:id' element={<Project />} />
                <Route path='*' element={<h1>Error</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;