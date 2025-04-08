// SelectGroup.jsx
import React, { useState } from "react";

const SelectGroup = ({
  options,
  isMulti = false,
  maxSelections = options.length, // New prop for max selections when isMulti is true
  onChange,
  defaultValue,
  clx = null,
}) => {
  const [selected, setSelected] = useState(
    defaultValue || (isMulti ? [] : null)
  );

  const handleChange = (value) => {
    let newSelected;

    if (isMulti) {
      if (selected.includes(value)) {
        // Deselect if already selected
        newSelected = selected.filter((item) => item !== value);
      } else {
        // Check if maxSelections limit would be exceeded
        if (maxSelections && selected.length >= maxSelections) {
          // Optionally, you could alert the user here
          console.log(`Maximum ${maxSelections} selections allowed`);
          return; // Don't update if limit reached
        }
        newSelected = [...selected, value];
      }
    } else {
      // Single select behavior remains unchanged
      newSelected = selected === value ? null : value;
    }

    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <>
      {isMulti && maxSelections && (
        <div className="text-xs text-gray-500 mt-2">
          {`You can select upto ${selected.length} of ${maxSelections} `}
        </div>
      )}
      <div
        className={`${
          clx ? clx : "flex flex-row gap-2 w-full justify-center flex-wrap"
        }`}
      >
        {options.map((option) => {
          const isChecked = isMulti
            ? selected.includes(option.value)
            : selected === option.value;

          return (
            <label
              key={option.value}
              className={`select-group-item text-sm w-fit poppins-light ${
                isChecked ? "selected" : ""
              }`}
            >
              <input
                type="checkbox"
                name={option.label}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
              />
              <span>{option.label}</span>
              {option.desc && (
                <span className="text-xs">{`(${option.desc})`}</span>
              )}
            </label>
          );
        })}
        {/* Optional: Display selection count when isMulti is true */}
      </div>
    </>
  );
};

export default SelectGroup;
