import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  const url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=${limit}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setProducts(data.data);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [page, limit]);

  console.log(products);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="header-title">Products</h1>
          <p className="header-info">
            Showing {products.currentPageItems} of {products.totalItems}{" "}
            products
          </p>
          <span className="limit-selector">
            <select value={limit} onChange={(e) => setLimit(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </span>
        </div>
        <div className="products">
          {products?.data?.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                className="product-image"
                src={product.images[0]}
                alt={product.title}
              />
              <div className="product-info">
                <p className="product-title">{product.title}</p>
                <p className="product-brand">{product.brand}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => (
              <button
                className={`pagination-button ${
                  index + 1 === page ? "active" : ""
                }`}
                key={index}
                onClick={() => setPage(index + 1)}
                disabled={products?.data?.length < limit}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="pagination-button"
            onClick={() => setPage(page + 1)}
            disabled={products?.data?.length < limit}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
