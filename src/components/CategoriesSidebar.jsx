

import React, { useState } from 'react';
import { Categories } from '../constData/data,js'



const CategoriesSidebar = () => {
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const toggleCategory = (id) => {
    setOpenCategoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-[15vw]  bg-white mt-[1px]  ">
      <h4 className=" w-[230px]  py-3  text-sm font-semibold px-10 -mt-1 border border-gray-300">Packaged Food</h4>

      {Categories.map(({ id, mCategories, totalcount, subCategories }) => (
        <div key={id} className=" ">
          <button
            onClick={() => toggleCategory(id)}
            className="w-[230px]  py-4  text-xs font-semibold px-10  border border-gray-300  hover:text-custom-Green hover:underline  cursor-pointer hover:bg-gray-50"
          >
            {mCategories} ({totalcount})
          </button>

          {openCategoryId === id && (
            <div>
              {subCategories.map(({ id: subId, name, link }) => (
                <a
                  key={subId}
                  href={link}
                  className=" border-r border-gray-300 px-10 block text-sm text-gray-500 bg-gray-200 hover:bg-gray-50 hover:text-custom-Green hover:underline py-3 hover:bg-#0f540f-100"
                >
                  {name}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesSidebar;
