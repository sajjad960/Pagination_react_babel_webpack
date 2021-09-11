import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { useFetch } from "./useFetch";
import Follower from "./Follower";

const App = () => {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return setFollowers(data[page]);
  });
  useEffect(() => {
    setFollowers(data[page]);
  }, [page]);

  const handlePage = (index) => {
    setPage(index);
  };

  const prevPage = () => {
    if (page !== 0) {
      setPage(page - 1);
    } else {
      let page = data.length - 1;
      setPage(page);
    }
  };
  const nextPage = () => {
    if (page !== data.length - 1) {
      setPage(page + 1);
    } else {
      let page = 0;
      setPage(page);
    }
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "...Loading" : "Pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers &&
            followers.map((follower) => (
              <Follower key={follower.id} {...follower} />
            ))}
        </div>
        {!loading ? (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              Prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  key={index}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={nextPage}>
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
