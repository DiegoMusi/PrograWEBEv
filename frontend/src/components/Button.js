const Button = ({ onClick, children, type = 'button', className = '' }) => {
    const defaultStyles = 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700';
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${defaultStyles} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  