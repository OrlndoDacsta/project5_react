import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });

  const getData = () => {
    axios
      .get(
        `https://api.mudoapi.tech/menus?perPage=5&page=${pagination.currentPage}`
      )
      .then((res) => {
        console.log(res.data.data.Data);
        const response = res.data.data.Data;
        setData(response);

        const pagination = {
          total: res.data.data.total,
          perPage: res.data.data.perPage,
          nextPage: res.data.data.nextPage,
          currentPage: res.data.data.currentPage,
          previousPage: res.data.data.previousPage,
        };

        setPagination(pagination);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  //ketika page pertama kali dibuka
  useEffect(() => {
    getData();
  }, []);

  //ketika currentPage Berubah
  useEffect(() => {
    getData();
  }, [pagination.currentPage]);

  const handleNext = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage + 1,
    });
  };

  const handlePrev = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage - 1,
    });
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>MENU Warung Bujang</h1>
      {data.map((item) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
            width: "300px",
          }}
          key={item.id}
        >
          <img
            style={{ width: "200px", height: "200px", borderRadius: "10px" }}
            src={item.imageUrl}
            alt=""
          />
          <p>
            <b>{item.name}</b>
          </p>
          <p>Harga: {item.priceFormatted}</p>
        </div>
      ))}
      <div style={{ display: "flex", gap: "10px" }}>
        <button disabled={!pagination.previousPage} onClick={handlePrev}>
          Back
        </button>
        <p>{pagination.currentPage}</p>
        <button disabled={!pagination.nextPage} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
