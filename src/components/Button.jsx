const Button = ({ btnName, onclick }) => {
  return (
    <button
      onClick={onclick}
      className="text-white p-3 font-medium hover:bg-black rounded-3xl bg-gray-600"
    >
      {btnName}
    </button>
  );
};

export default Button;
