import '../scss/components/titleBar.scss';

function TitleBar() {
    return (
        <div className="titleBar">
            <img src="/assets/icon.png" />
            <span>App Builder Desktop</span>
            <button onClick={() => window.electron.quit()}><i className="fa-solid fa-xmark"></i></button>
        </div>
    );
}

export default TitleBar;