import React, { useState } from "react";
import Select from "react-select";

const ProductSelect = ({ product, onSelectChange }) => {
  if (!product || !product.price || !Array.isArray(product.price)) {
    return null;
  }

  const options = product.price.map((p) => ({
    value: p.quantity || "",
    label: p.quantity || "",
    priceData: p,
  }));

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onSelectChange && option) {
      onSelectChange(option.priceData);
    }
  };

  return (
    <div className="">
      <h3 className="mb-1.5">{product.name}</h3>
      <Select
        classNames={{
          control: (state) =>
            state.isFocused ? "border-red-600" : "border-grey-300",
        }}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select Quantity"
        isSearchable={false}
        menuPortalTarget={document.body}
        styles={{
          control: (base) => ({
            ...base,
            cursor: "pointer",
            "&:hover": {
              borderColor: "#21ae0f",
            },
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#e9f6ec" : "white",
            color: state.isFocused ? "#21ae0f" : "black",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e9f6ec",
              color: "#21ae0f",
            },
          }),
        }}
      />
    </div>
  );
};

export default ProductSelect;
