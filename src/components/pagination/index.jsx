import ReactPaginate from "react-paginate";
function Pagination(props) {
  let { paginate, filter, setFilter } = props;
  let { page, totalPage } = paginate;
  const handlePageClick = (e) => {
    const newPage = e.selected + 1;
    setFilter({ ...filter, page: newPage });
  };
  return (
    <>
      <nav className="table-paging">
        <ReactPaginate
          previousLabel={`<`}
          nextLabel={`>`}
          breakLabel={`...`}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          onPageChange={handlePageClick}
          containerClassName="paging-ul d-flex"
          pageClassName="paging-li"
          pageLinkClassName="paging-a"
          previousClassName="paging-li"
          previousLinkClassName="paging-a"
          nextClassName="paging-li"
          nextLinkClassName="paging-a"
          activeClassName="isActive"
        />
      </nav>
    </>
  );
}

export default Pagination;
