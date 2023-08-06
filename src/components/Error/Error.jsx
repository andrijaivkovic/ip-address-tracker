const Error = ({ errorMessage }) => {
  return (
    <div className="error">
      <h3>🛑 Error:</h3>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;
