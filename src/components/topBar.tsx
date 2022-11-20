import '../scss/components/topBar.scss'

function TopBar() {
    return (
        <div className="topBar">
            <div style={{maxWidth: '33%'}}>
                <img src="/assets/logo.png" alt="" /*onclick="location = '/'"*/ /> {/* to fix when using Link*/}
                <button className="current" data-nav="design">Design</button>
                <button data-nav="blocks">Blocks</button>
            </div>
            <div className="projectTitle">
                <img src="/assets/icon.png" alt="" />
                    <h1>Project1</h1>
            </div>
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