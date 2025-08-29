import { useState } from "react";
import ToggleButton from "./components/ui/ToggleButton";
import InputNumber from "./components/ui/InputNumber";

const App = () => {
  const [unit, setUnit] = useState<"px" | "%">("%");
  const [value, setValue] = useState<number>(1);

  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4 gap-2">
          <span className="flex-1">Unit</span>
          <ToggleButton
            items={["%", "px"]}
            value={unit}
            onChange={setUnit}
            className="flex-1"
          />
        </div>

        <div className="flex justify-between items-center mb-4 gap-2">
          <span className="flex-1">Value</span>
          <InputNumber
            containerClassName="flex-1"
            value={value}
            onChange={setValue}
            max={unit === "%" ? 100 : 1000}
            isFloat={true}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
