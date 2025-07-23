import React from "react";

interface DropdownItem {
  id: number;
  text: string;
  value: string;
}

interface DropdownProps {
  options: DropdownItem[];
  handleChange: (value:string) => void;
  selectedOption:string | null;
}

const DropDown: React.FC<DropdownProps> = ({
  handleChange,
  options,
  selectedOption
}) => {
  return (
    <>
      <select
        value={selectedOption || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded-lg px-3 py-1 text-gray-700 bg-white"
      >
        {options.map((option) => {
          return (
            <React.Fragment key={option.id}>
              <option value={option.value}>{option.text}</option>
            </React.Fragment>
          );
        })}
      </select>
    </>
  );
};

export default DropDown;
