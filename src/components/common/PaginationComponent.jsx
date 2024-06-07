import PropTypes from "prop-types";

const PaginationComponent = ({
  postPerPage,
  currentPage,
  setCurrentPage,
  totalPost,
}) => {
  const numberOfPages = Math.ceil(totalPost / postPerPage);
  const pagesArray = [...Array(numberOfPages).keys()];

  const handleCurrentPage = (e) => {
    setCurrentPage(+e.target.textContent - 1);
  };

  const HandlePrevButton = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const HandleNextButton = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (numberOfPages > 1) {
    return (
      <>
        <div className="flex justify-center space-x-4">
          <button
            onClick={HandlePrevButton}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold shadow-md hover:bg-primary hover:text-primary-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          {pagesArray.map((page, index) => (
            <button
              key={index}
              type="button"
              onClick={handleCurrentPage}
              className={`inline-flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold shadow-md hover:bg-primary hover:text-primary-foreground ${currentPage === page ? "bg-primary text-primary-foreground" : ""} `}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={HandleNextButton}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold shadow-md hover:bg-primary hover:text-primary-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </>
    );
  }
};

PaginationComponent.propTypes = {
  postPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  search: PropTypes.string,
  totalPost: PropTypes.number,
};

export default PaginationComponent;
