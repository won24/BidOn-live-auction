

const Pagination = ({ currentPage, totalPages, goToPage, nextPage, prevPage }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

    return (
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1} className="pagenation_btn">
                이전
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={currentPage === page ? "active" : ""}
                >
                    {page}
                </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages} className="pagenation_btn">
                다음
            </button>
        </div>
    );
};

export default Pagination;
