import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../hooks/context';
import '../scss/components/topBar.scss';

function TopBar() {
    let path = useLocation().pathname;
    const { project } = useContext<{project: { [key: string]: string }, setProject: (value: {}) => void}>(Context);

    return (        
        <div className="topBar">
            <Link to="/">
                <img src="/assets/logo.png" alt="" /*onclick="location = '/'"*/ /> {/* to fix when using Link*/}
            </Link>
            { !['/'].includes(path) && 
                <div className="projectTitle">
                    <img src="/assets/icon.png" alt="" />
                    <h1>{project.title}</h1>
                </div> 
            }

            <div className="rightActions">
            { !['/'].includes(path) ?
                <>
                    <button><i className="fa-solid fa-share-nodes"></i></button>
                    <button><i className="fa-solid fa-book"></i></button>
                </>
                :
                <>
                    <button>PRO</button>
                </>
            }
                <img className="accountButton" src="/assets/doggie.png" />
            </div>
        </div>
    );
}

export default TopBar;