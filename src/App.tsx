import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitleBar from './components/titleBar';
import TopBar from './components/topBar';
import ProjectList from './pages/projectList';
import Project from './pages/project';

declare global {
    interface Window {
        electron: {
            run: {
                npmInstall: (path: string) => Promise<string>
                npmRun: (path: string, command: string) => Promise<string>
            },
            quit: () => void;
            fetch: (...args: any[]) => any;
            isPath: (path: string) => boolean;
            path: any;
            userData: string;
            makePath(path: string, obj?: object): void;
            createFile(file: string, data: string): void;
            beep: () => void;
            showItemInFolder: (path: string) => Promise<void>;
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