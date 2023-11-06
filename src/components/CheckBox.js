import { useEffect, useState } from "react";

function Checkbox({ label, filterList, callback }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(filterList.includes(label) ? true : false);
  }, [filterList, label]);

  function handleCheck(e) {
    setIsChecked((isChecked) => !isChecked);
    callback(e.target.value);
  }

  return (
    <div className="flex items-center">
      <input
        className="mr-1.5 w-4 h-4 rounded text-current focus:ring-current focus:ring-1"
        type="checkbox"
        name={label}
        value={label}
        checked={isChecked}
        onChange={handleCheck}
      />
      <label>{label}</label>
    </div>
  );
}

export default Checkbox;
