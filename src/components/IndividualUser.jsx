import { userIcon } from "../assets";
import { useState } from "react";
import TransferModal from "./TransferModal";

const IndividualUser = ({ eachUserData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-row justify-between rounded-md p-1 items-center">
        <div className="flex flex-row gap-2 items-center">
          <img src={userIcon} className="w-5 h-5" />
          <span className="font-bold text-xl">{eachUserData.firstname} </span>
        </div>
        <button
          onClick={openModal}
          className="p-2 bg-black text-white rounded-md"
        >
          Send Money
        </button>
        <TransferModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          user={eachUserData}
        />
      </div>
    </>
  );
};

export default IndividualUser;
