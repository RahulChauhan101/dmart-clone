import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDiscountPrice, setMinDiscountPrice] = useState("");
  const [maxDiscountPrice, setMaxDiscountPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);

  const PAGES_PER_GROUP = 5;

  useEffect(() => {
    fetchProducts(1); 
  }, []);

  const fetchProducts = (page = 1) => {
    const params = {
      page,
      name: search,
      minPrice,
      maxPrice,
      minDiscountPrice,
      maxDiscountPrice,
    };

    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const url = `http://localhost:5000/api/products/search?${queryString}`;
  console.log("ASDASD",queryString)

    axios
      .get(url)
      .then((res) => {
        setData(res.data.products);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  const handleSearch = () => {
    setPageGroupStart(1);
    fetchProducts(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    fetchProducts(pageNum);
  };

  const handleNextGroup = () => {
    const nextGroupStart = pageGroupStart + PAGES_PER_GROUP;
    if (nextGroupStart <= totalPages) {
      setPageGroupStart(nextGroupStart);
    }
  };

  const handlePrevGroup = () => {
    const prevGroupStart = pageGroupStart - PAGES_PER_GROUP;
    if (prevGroupStart >= 1) {
      setPageGroupStart(prevGroupStart);
    }
  };

  const visiblePages = Array.from(
    { length: Math.min(PAGES_PER_GROUP, totalPages - pageGroupStart + 1) },
    (_, i) => pageGroupStart + i
  );

  return (
    <div className=" pt-0">
      <div className=" sticky items-center top-32 w-full  z-50 flex flex-wrap gap-3 bg-gray-100 p-4 rounded-md shadow-xl/10  mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="bg-white border px-3 py-2 rounded shadow-sm w-50 "
        />
        <span >MinPrice</span>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="  bg-white border px-3 py-2 rounded shadow-sm w-50"
        />
        <span  >MaxPrice</span>
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="bg-white border px-3 py-2 rounded shadow-sm w-30"
        />
         <span>MinDiscountPrice</span>
        <input
          type="number"
          placeholder="Min Discount Price"
          value={minDiscountPrice}
          onChange={(e) => setMinDiscountPrice(e.target.value)}
          className="bg-white border px-3 py-2 rounded shadow-sm w-45"
        />
         <span>MaxDiscountPrice</span>
        <input
          type="number"
          placeholder="Max Discount Price"
          value={maxDiscountPrice}
          onChange={(e) => setMaxDiscountPrice(e.target.value)}
          className="bg-white border px-3 py-2 rounded shadow-sm w-47"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-white hover:text-custom-darkreen hover:border-custom-darkreen cursor-pointer"
        >
          Search
        </button>
      </div>

    
      <ul className="flex items-center justify-center gap-2 p-2">
        <h1 className=" text-white px-4 py-2 rounded bg-yellow-600">Page</h1>
        {pageGroupStart > 1 && (
          <li
            onClick={handlePrevGroup}
            className="px-3 py-1 border cursor-pointer text-white rounded-l-lg bg-green-700 hover:bg-white hover:text-green-700"
          >
            « Prev
          </li>
        )}
        {visiblePages.map((pageNum) => (
          <li
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 border rounded cursor-pointer ${
              currentPage === pageNum
                ? "bg-green-800 text-white"
                : "bg-white text-green-800 hover:bg-green-100"
            }`}
          >
            {pageNum}
          </li>
        ))}
        {pageGroupStart + PAGES_PER_GROUP - 1 < totalPages && (
          <li
            onClick={handleNextGroup}
            className="px-3 py-1 border cursor-pointer text-white rounded-r-lg bg-green-700 hover:bg-white hover:text-green-700"
          >
            Next »
          </li>
        )}
      </ul>

      
      <div className="flex flex-wrap gap-5 mx-6 mt-5">
        {data.length === 0 ? (
          <div className="text-center w-full text-gray-600">
            No products found.
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="bg-white border  ml-4 p-3 rounded shadow-md w-[250px] h-[480px]"
            >
              <h1 className="text-right text-sm bg-amber-50 mb-3 text-gray-600">
                ID: {item.id}
              </h1>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover mb-3 rounded"
              />
              <div className="flex justify-between items-center bg-amber-100 px-2 py-1 font-medium">
                <h1>{item.name}</h1>
                <span>${item.price}</span>
              </div>
              <p className="flex justify-between items-center bg-amber-100 px-2 py-1 mt-4 font-medium">Discount Price: ${item.discountPrice}</p>
              <p className="mt-3 text-gray-700 text-sm">{item.details}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Search = () => {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageGroupStart, setPageGroupStart] = useState(1);

//   const PAGES_PER_GROUP = 5;

//   useEffect(() => {
//     fetchProducts(1);
//   }, []);

//   const fetchProducts = (page = 1, query = "") => {
//     let url = `http://localhost:5000/api/products/search?page=${page}`;
//     if (query) {
//       url += `&name=${query}`;
//     }

//     axios
//       .get(url)
//       .then((res) => {
//         setData(res.data.products);
//         setCurrentPage(res.data.currentPage || 1);
//         setTotalPages(res.data.totalPages || 1);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//       });
//   };

//   const handleSearch = () => {
//     setPageGroupStart(1); 
//     fetchProducts(1, search);
//   };

//   const handlePageChange = (pageNum) => {
//     setCurrentPage(pageNum);
//     fetchProducts(pageNum, search);
//   };

//   const handleNextGroup = () => {
//     const nextGroupStart = pageGroupStart + PAGES_PER_GROUP;
//     if (nextGroupStart <= totalPages) {
//       setPageGroupStart(nextGroupStart);
//     }
//   };

//   const handlePrevGroup = () => {
//     const prevGroupStart = pageGroupStart - PAGES_PER_GROUP;
//     if (prevGroupStart >= 1) {
//       setPageGroupStart(prevGroupStart);
//     }
//   };

//   const visiblePages = Array.from(
//     { length: Math.min(PAGES_PER_GROUP, totalPages - pageGroupStart + 1) },
//     (_, i) => pageGroupStart + i
//   );

//   return (
//     <div>
//       <div className="sticky top-31 z-50 mr-5 flex w-full bg-gray-100 mx-auto -mt-1 ml-10">
//         <input
//           type="search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search here..."
//           className="bg-gray-100 text-sm text-gray-900 w-[33vw] h-10 px-3 py-2 shadow border border-gray-300 rounded-sm"
//         />
//         <button
//           onClick={handleSearch}
//           className="uppercase font-bold text-sm bg-custom-Green text-white shadow-gray-700 py-3 px-2 rounded-sm -ml-1 cursor-pointer hover:bg-white hover:text-custom-Green hover:border border-custom-Green"
//         >
//           Search
//         </button>
//       </div>

//       {/* Pagination Top */}
//       <ul className="flex items-center mt-5 justify-center gap-2 p-2 text-lm">
//         {pageGroupStart > 1 && (
//           <li
//             onClick={handlePrevGroup}
//             className="px-3 py-1 border cursor-pointer  text-white rounded-l-lg bg-custom-darkreen  hover:bg-white hover:text-custom-Green"
//           >
//             « Prev
//           </li>
//         )}

//         {visiblePages.map((pageNum) => (
//           <li
//             key={pageNum}
//             onClick={() => handlePageChange(pageNum)}
//             className={`px-3 py-1 border rounded-sm cursor-pointer ${
//               currentPage === pageNum
//                 ? "bg-custom-darkreen text-white"
//                 : "bg-white text-custom-darkreen hover:bg-red-50"
//             }`}
//           >
//             {pageNum}
//           </li>
//         ))}

//         {pageGroupStart + PAGES_PER_GROUP - 1 < totalPages && (
//           <li
//             onClick={handleNextGroup}
//             className="px-3 py-1 border cursor-pointer  text-white rounded-r-lg bg-custom-darkreen  hover:bg-white hover:text-custom-Green"          >
//             Next »
//           </li>
//         )}
//       </ul>

//       {/* Products */}
//       <div className="flex flex-wrap justify-start ml-10">
//         {data.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white my-3 mr-5 p-2 border border-gray-300 rounded-md w-[250px] h-[480px] shadow-sm"
//           >
//             <h1 className="text-right px-2">ID: {item.id || item._id}</h1>
//             <img
//               className="w-full h-70 object-contain mb-4"
//               src={item.image}
//               alt={item.name}
//             />
//             <div className="flex gap-5 text-lm font-medium px-2 bg-amber-100">
//               <h1>{item.name}</h1>
//               <h1>${item.price}</h1>
//             </div>
//             <h1 className="text-lm font-semibold mt-3">{item.details}</h1>
//           </div>
//         ))}
//       </div>

     
//     </div>
//   );
// };

// export default Search;



