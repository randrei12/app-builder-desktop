import '../../scss/components/projectList/search.scss';

function Search() {
    return (
        <div className="searchDiv">
            <div className="searchInput">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search projects..." />
            </div>
        </div>
    );
}

export default Search;