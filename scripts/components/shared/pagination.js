import React, { Component } from "react";
import { observer } from "mobx-react";
import range from "lodash/range";

import LoadingWrapper from "./loading-wrapper";

@observer
class Pagination extends Component {

  renderEntriesInfo(collection) {
    const { currentPage, totalItems, perPage, totalPages } = collection;

    const first = (currentPage - 1) * perPage + 1;
    const last  = currentPage * perPage;

    const perPageInput = (
      <input
        type="number"
        className="per-page"
        defaultValue={collection.perPage}
        onKeyPress={(e) => {
          if (e.which === 13 || e.keyCode === 13) {
            collection.set('perPage', e.target.value);
            collection.set('currentPage', 1);
            collection.fetch();
          }
        }}
      />
    );

    if (totalPages > 1)
      return (
        <span>
          {`Displaying ${first} - ${last} enties of ${totalItems} in total, `}
          {perPageInput}
          {' per page'}
        </span>
      );

    if (totalItems === 0) {
      return 'No entries found';

    } else if (totalItems === 1) {
      return 'Displaying 1 entry';

    } else {
      return (
        <span>
          {`Displaying ${totalItems} entries, `}
          {perPageInput}
          {' per page'}
        </span>
      );
    }
  }

  getPagesArray(sideOffset = 2) {
    const { collection: { currentPage, totalPages } } = this.props;

    let startPage, endPage, result = [];

    // too few pages, display them all
    if (totalPages <= 2 * sideOffset + 5) {
      startPage = 1;
      endPage   = totalPages;

    // currentPage is too close to the beginning
    } else if (currentPage <= sideOffset + 3) {
      startPage = 1;
      endPage   = sideOffset + 5;

    // currentPage is too close to the end
    } else if (currentPage >= totalPages - (sideOffset + 2)) {
      startPage = totalPages - (sideOffset + 4);
      endPage   = totalPages;

    // regular case
    } else {
      startPage = currentPage - sideOffset;
      endPage   = currentPage + sideOffset;
    }

    if (startPage > 1) result.push(1);
    if (startPage > 2) result.push("...");

    range(startPage, endPage + 1).forEach(num => result.push(num));

    if (endPage < totalPages - 1) result.push("...");
    if (endPage < totalPages)     result.push(totalPages);

    return result;
  }

  renderPageButton(page, currentPage, index) {
    if (page === currentPage)
      return <li key={index} className="current">{page}</li>;

    if (page === "...")
      return <li key={index} className="ellipsis" />;

    return (
      <li key={index}>
        <a className="page-number" onClick={this.getPage}>{page}</a>
      </li>
    );
  }

  getPreviousPage = (event) => {
    const { collection } = this.props;

    if (collection.currentPage === 1) return;

    collection.set('currentPage', collection.currentPage - 1);
    collection.fetch();
  }

  getNextPage = (event) => {
    const { collection } = this.props;

    if (collection.currentPage === collection.totalPages) return;

    collection.set('currentPage', collection.currentPage + 1);
    collection.fetch();
  }

  getPage = (event) => {
    const { collection } = this.props;

    collection.set('currentPage', +event.target.text);
    collection.fetch();
  }

  render() {
    const { collection } = this.props;

    if (!collection) return null;

    if (collection.isBeingFetched && !collection.length)
      return null;

    const { currentPage, totalPages } = collection;

    return (
      <div className="pagination">
        {collection.isBeingFetched ? <LoadingWrapper /> : null}

        <p className="pagination float-left">
          {this.renderEntriesInfo(collection)}
        </p>

        {totalPages > 1 ? (
          <ul className="pagination float-right">

            {currentPage === 1 ? (
              <li className="pagination-previous disabled">Previous</li>
            ) : (
              <li className="pagination-previous">
                <a className="previous" onClick={this.getPreviousPage}>Previous</a>
              </li>
            )}

            {this.getPagesArray().map((page, index) => {
              return this.renderPageButton(page, currentPage, index, this.getPage);
            })}

            {currentPage === totalPages ? (
              <li className="pagination-next disabled">Next</li>
            ) : (
              <li className="pagination-next">
                <a className="next" onClick={this.getNextPage}>Next</a>
              </li>
            )}

          </ul>
        ) : null}
      </div>
    );
  }

}

export default Pagination;
