const Input = ({ type, name, value, onChange, placeholder, error, className = '' }) => {
    return (
      <div className="input-container">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input border px-3 py-2 rounded ${className}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };
  
  export default Input;
  