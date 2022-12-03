import "./Select.css";


export const Select = (props) => {



  const { options, onSelect, selectedValue } = props;

  

  const handleSelect = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className='select'>
      <div>{props.children}</div>
      <select value={selectedValue} onChange={(e) => handleSelect(e)}>
        <option value=''></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
