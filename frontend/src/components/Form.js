const Form = ({ onSubmit, children, className = '' }) => {
    return (
      <form
        onSubmit={onSubmit}
        className={`form-container bg-white p-6 rounded shadow ${className}`}
      >
        {children}
      </form>
    );
  };
  
  export default Form;
  