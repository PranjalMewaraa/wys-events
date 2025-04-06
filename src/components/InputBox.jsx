import React from "react";

const InputBox = ({
  label,
  label2 = null,
  placeholder,
  value = "",
  name,
  type = "text",
  onChangeFn,
}) => {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-col poppins-light">
        <label htmlFor={name} className="text-xs text-wrap">
          {label}
        </label>
        {label2 && (
          <label htmlFor={name} className="text-xs text-wrap">
            {label2}
          </label>
        )}
      </div>

      <input
  type={type}
  id={name}
  name={name}
  placeholder={placeholder}
  {...(onChangeFn
    ? { value, onChange: onChangeFn }
    : { defaultValue: value })} // Uncontrolled fallback
  className="focus:outline-none border-b border-black"
/>

    </div>
  );
};

export default InputBox;
