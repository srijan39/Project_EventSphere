const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
