import Swal from 'sweetalert2';
import ProjectGenerator from '../generators/generate';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../hooks/context';
import '../scss/pages/project.scss';

function Project() {
    const { project, setProject } = useContext(Context);
    const { id } = useParams();

    if (project._id !== id) {
        Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(null);
            }
        });
        window.electron.fetch(import.meta.env.VITE_SERVER_URL + '/fetchProject', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then((res: ElectronFetch) => {
            let data = JSON.parse(res.text);
            setProject(data);
            console.log(data);
            Swal.close();
        });
    }

    function build(e: any) {
        let generator = new ProjectGenerator({ platform: e.target.parentElement.dataset.platform, os: e.target.dataset.os, project, id: id as string });
        generator.build();
    }

    return (
        <>
            <h1 className="buildTitle">Build</h1>
            <div className="BuildOptions">
                <div className="buildSection">
                    <span>Web</span>
                    <div data-platform="web">
                        <button onClick={build} data-os="web"><i className="fa-solid fa-globe"></i> Build as website</button>
                    </div>
                </div>
                <div className="buildSection">
                    <span>Desktop</span>
                    <div data-platform="desktop">
                        <button onClick={build} data-os="macos"><i className="fa-brands fa-apple"></i> Build for macOS</button>
                        <button onClick={build} data-os="windows"><i className="fa-brands fa-windows"></i> Build for Windows</button>
                        <button onClick={build} data-os="linux"><i className="fa-brands fa-linux"></i> Build for Linux</button>
                    </div>
                </div>
                <div className="buildSection">
                    <span>Mobile</span>
                    <div data-platform="mobile">
                        <button onClick={build} data-os="ios"><i className="fa-brands fa-apple"></i> Build for iOS</button>
                        <button onClick={build} data-os="android"><i className="fa-brands fa-android"></i> Build for Android</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project;