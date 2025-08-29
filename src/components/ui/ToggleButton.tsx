import React from "react";

type ToggleButtonProps = {
  items: string[];
  value: string;
  onChange: (selected: string) => void;
  className?: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  items,
  value,
  onChange,
  className,
  ...props
}) => {
  const getButtonClass = (isSelected: boolean) =>
    [
      "flex-1 px-4 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none rounded-md h-9 w-9",
      isSelected
        ? "bg-[#424242] text-white"
        : "hover:bg-[#424242] text-[#AAAAAA]",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div
      className={`inline-flex rounded-lg p-0.5 gap-0.5 bg-[#212121] shadow overflow-hidden ${className}`}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={getButtonClass(value === item)}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
