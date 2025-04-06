// components/BackButton.jsx
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to = -1 }) => {
  const navigate = useNavigate();
  return (
    <FaLongArrowAltLeft
      className="text-xl cursor-pointer hover:text-orange-500 transition"
      onClick={() => navigate(to)}
    />
  );
};

export default BackButton;
