import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoad, setImageLoad] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("page") === null) localStorage.setItem("page", 1);
  }, []);
  const nowFetch = async (cate) => {
    setCategory(cate);
    await axios
      .get(
        `https://api.unsplash.com/search/photos?query=${cate}&client_id=Jl2tinpf3TSTony2-N2pN5-eZOhFZolkFO7OwlXCWPI&page=${localStorage.getItem(
          "page"
        )}`
      )
      .then((response) => {
        console.log(response.data.results);
        setData(response.data.results);
        setIsLoading(false);
      });
  };

  const AddImages = (url) => {
    axios.post("http://localhost:6969/addImages", {
      url,
      category,
    });
  };

  const searchCategory = () => {
    setIsLoading(true);
    setData(null);
    nowFetch(category);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <h1 className="row justify-content-center">Rating App</h1>
      <p>
        *beta version<Link to="/main">Voting area</Link>
      </p>
      <div className="container my-container">
        <div className="row">
          <h2>Category: </h2>
          <h2>{category}</h2>
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Go for it
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button onClick={searchCategory}>Search</button>
        </div>
        <div className="row justify-content-around">
          <p>Quick Access</p>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => nowFetch("Drawing")}
          >
            Drawing
          </button>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => nowFetch("Photography")}
          >
            Photography
          </button>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => nowFetch("Scenery")}
          >
            Scenery
          </button>
        </div>
        <div className="row">
          {!isLoading ? (
            data.map((x, key) => (
              <div key={key} className="border border">
                <img
                  id="myImg"
                  onClick={() => AddImages(x.urls.raw)}
                  className="image col-sm-12"
                  src={x.urls.raw}
                  height={600}
                  width={800}
                  alt="img"
                />
                <h3>{x.alt_description}</h3>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        {!isLoading ? (
          <div className="row justify-content-center">
            <button
              className="col- btn btn-outline-dark"
              onClick={() => {
                localStorage.setItem(
                  "page",
                  parseInt(localStorage.getItem("page")) - 1
                );
                setIsLoading(true);
                searchCategory();
              }}
            >
              Previous page
            </button>
            <button
              className="col- btn btn-outline-dark"
              onClick={() => {
                localStorage.setItem(
                  "page",
                  parseInt(localStorage.getItem("page")) + 1
                );
                setIsLoading(true);
                searchCategory();
              }}
            >
              Next page
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
