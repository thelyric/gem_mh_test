import { useEffect, useRef, useState } from "react";
import Popper from "./Popper";
import Minus from "../../assests/icons/Minus";
import Plus from "../../assests/icons/Plus";

interface InputNumberProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  containerClassName?: string;
  isFloat?: boolean;
}

const formatValue = (val: number, floatMode: boolean) => {
  if (floatMode) {
    const str = val.toFixed(6);
    return str
      .replace(/(\.\d*?[1-9])0+$/, "$1")
      .replace(/(\.\d)0+$/, "$1")
      .replace(/\.0{1,5}$/, ".0");
  }
  return String(Math.round(val));
};

const InputNumber = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
  containerClassName = "",
  isFloat = false,
}: InputNumberProps) => {
  const [input, setInput] = useState<string>(formatValue(value, isFloat));
  const [error, setError] = useState<{
    ref: React.RefObject<HTMLButtonElement | null>;
    msg: string;
  } | null>(null);

  const minusRef = useRef<HTMLButtonElement>(null);
  const plusRef = useRef<HTMLButtonElement>(null);

  const parseValue = (str: string) => {
    return isFloat ? parseFloat(str.replace(/,/g, ".")) : parseInt(str, 10);
  };

  const isValid = (str: string) => {
    return isFloat ? /^\-?\d*(\.\d*)?$/.test(str) : /^\-?\d*$/.test(str);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setInput(e.target.value);
  };

  const handleBlur = () => {
    let str = input.trim();
    let num = parseValue(str);

    // Trường hợp nhập sai định dạng
    if (!isValid(str) || isNaN(num)) {
      setInput(formatValue(value, isFloat));
      onChange(value);
      return;
    }

    // Giới hạn min/max
    if (num < min) {
      setInput(formatValue(min, isFloat));
      onChange(min);
      setError({ ref: minusRef, msg: `Value cần lớn hơn ${min}` });
      return;
    }

    if (num > max) {
      setInput(formatValue(value, isFloat)); // giữ nguyên value cũ
      onChange(value);
      setError({ ref: plusRef, msg: `Value cần nhỏ hơn ${max}` });
      return;
    }

    onChange(num);
    setInput(formatValue(num, isFloat));
  };

  const handleDecrease = () => {
    const next = Math.max(min, value - step);
    onChange(next);
    setInput(formatValue(next, isFloat));
  };

  const handleIncrease = () => {
    const next = Math.min(max, value + step);
    onChange(next);
    setInput(formatValue(next, isFloat));
  };

  useEffect(() => {
    if (max < value) {
      onChange(max);
      setInput(formatValue(max, isFloat));
    }
  }, [max]);

  return (
    <div
      className={`flex items-center justify-between bg-[#212121] rounded-lg overflow-hidden ${containerClassName} group focus-within:ring-1 focus-within:ring-blue-500`}
    >
      {/* Minus */}
      <button
        ref={minusRef}
        type="button"
        className={`h-9 w-9 flex items-center justify-center text-white text-lg font-bold shrink-0
          ${value <= min ? "cursor-not-allowed" : "hover:bg-[#3B3B3B]"}`}
        onClick={handleDecrease}
        disabled={value <= min}
      >
        <Minus />
      </button>

      {/* Input */}
      <input
        type="text"
        className={`w-full text-center outline-none ${className}`}
        value={input}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {/* Plus */}
      <button
        ref={plusRef}
        type="button"
        className={`h-9 w-9 flex items-center justify-center text-white text-lg font-bold shrink-0
          ${value >= max ? "cursor-not-allowed" : "hover:bg-[#3B3B3B]"}`}
        onClick={handleIncrease}
        disabled={value >= max}
      >
        <Plus />
      </button>

      {/* Error Popper */}
      {error && (
        <Popper
          offsetY={14}
          anchorRef={error.ref as React.RefObject<HTMLButtonElement>}
        >
          {error.msg}
        </Popper>
      )}
    </div>
  );
};

export default InputNumber;
