const ReusableInput = ({
    label,
    type,
    id,
    name,
    placeholder,
    className,
    onChange,
    value,
    errorMessage,
    required = false,
  }) => {
    return (
      <div className="form-group">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            {label}
          </span>
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={className}
            onChange={onChange}
            value={value}
            required={required}
          />
          {errorMessage ? <p className="error_message">{errorMessage}</p> : null}
        </label>
      </div>
    );
  };
  
  export default ReusableInput;
  