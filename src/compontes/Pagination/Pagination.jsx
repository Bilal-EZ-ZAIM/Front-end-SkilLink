import React, { useContext } from 'react';
import { UserContext } from '../../context/ContextProvider';

function Pagination({ offerDemploi , fond }) {
    const { current_page, last_page, links } = offerDemploi;
    const { setpage , setpageC} = useContext(UserContext);

    const handlePageChange = (index) => {
        if(fond === "client"){
            setpageC(index);
            console.log(index);
        }else{
            setpage(index);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(current_page - 1)}>
                        Previous
                    </button>
                </li>
                <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(current_page + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
