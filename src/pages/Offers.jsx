import React, { useEffect, useState } from "react";
import axios from "axios";

const Offers = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/categoriesimages"
        );
        setImageData(res.data);
      } catch (err) {
        console.error("Error fetching image data", err);
      }
    }
    fetchImage();
  }, []);

  return (
    <>
      {imageData.map(
        ({
          _id,
          image,
          categorisimage1,
          categorisimage2,
          categorisimage3,
          categorisimage4,
          name,
        }) => (
          <div key={_id}>
            <div className="bg-white w-[97vw] m-auto my-5 py-5 px-4 border border-gray-300 rounded-md flex gap-4">
              <img
                src={image}
                alt={name}
                className="w-full mb-4 rounded-md"
              />
            </div>
            {categorisimage1?.map((item, idx) => (
              <div
                key={idx}
                className="flex bg-white w-[97vw] gap-4 m-auto my-5 py-5 px-4 border border-gray-300 rounded-md"
              >
                {["image1", "image2", "image3"].map(
                  (key, i) =>
                    item[key] && (
                      <img
                        key={i}
                        src={item[key]}
                        alt={`Category 1 - Image ${i + 1}`}
                        className="w-1/3 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-md "
                      />
                    )
                )}
              </div>
            ))}

            {categorisimage2?.image && (
              <div className="bg-white w-[97vw] m-auto my-5 py-5 px-4 border border-gray-300 rounded-md">
                <img
                  src={categorisimage2.image}
                  alt="Category Image 2"
                  className="w-full transition-all duration-300 hover:shadow-lg rounded-md"
                />
              </div>
            )}

            {categorisimage3?.image && (
              <div className="bg-white w-[97vw] m-auto my-5 py-5 px-4 border border-gray-300 rounded-md">
                <img
                  src={categorisimage3.image}
                  alt="Category Image 3"
                  className="w-full transition-all duration-300 hover:shadow-lg rounded-md"
                />
              </div>
            )}

            {categorisimage4?.image && (
              <div className="bg-white w-[97vw] m-auto my-5 py-5 px-4 border border-gray-300 rounded-md">
                <img
                  src={categorisimage4.image}
                  alt="Category Image 4"
                  className="w-full transition-all duration-300 hover:shadow-lg rounded-md"
                />
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default Offers;
