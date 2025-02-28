import React, { useState, useRef } from "react";

const CategoryInput = ({ categories = [], category, setCategory }) => {
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef(null);

  const handleInputChange = (e) => {
    setCategory(e.target.value);
    setShowList(true);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(category.toLowerCase())
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block">Category</label>
      <input
        value={category}
        onChange={handleInputChange}
        onFocus={() => setShowList(true)}
        onBlur={() => setShowList(false)}
        className="w-full p-2 border rounded"
        required
      />

      {showList && (
        <div className="absolute w-full mt-1 bg-white border rounded shadow">
          {filteredCategories.map((cat) => (
            <div
              key={cat}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => {
                setCategory(cat);
                setShowList(false);
              }}
            >
              {cat}
            </div>
          ))}

          {!filteredCategories.length && category && (
            <div className="p-2 text-blue-500">Add "{category}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryInput;
