import React from "react";

export default function Pagination({ totalPosts, postsPerpage, setCurrentPage, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
    pages.push(i);
  }
  return (
    <>
    <div className="  p-1 text-center" style={{ height: "50px" }}>
        {pages.map((page, index) => (
          <button className={page == currentPage ? "btn btn-primary active" : "btn btn-primary"}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button> 
        ))}
      </div>
    </>
  );
}
