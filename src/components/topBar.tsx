import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../scss/components/topBar.scss';

function TopBar() {
    return (
        <div className="topBar">
            <div>
                <img src="/assets/logo.png" alt="" /*onclick="location = '/'"*/ /> {/* to fix when using Link*/}
            </div>
            <Routes>
                <Route path='/*' element={
                    <div className="projectTitle">
                        <img src="/assets/icon.png" alt="" />
                        <h1>Project1</h1>
                    </div>
                } />
            </Routes>

            <div className="rightActions">
                <button><i className="fa-solid fa-play"></i></button>
                <button><i className="fa-solid fa-share-nodes"></i></button>
                <button><i className="fa-solid fa-book"></i></button>
                <img className="accountButton" src="/assets/doggie.png" />
            </div>
        </div>
    );
}

export default TopBar;