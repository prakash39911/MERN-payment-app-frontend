import React, { useState } from "react";
import { closeIcon, transferMoneyIcon, userIcon } from "../assets";
import { useTransferAmountApi } from "../api/transferAmount";

const TransferModal = ({ isOpen, closeModal, user }) => {
  if (!isOpen) return null; // Render nothing if modal is closed

  const [amount, setAmount] = useState("");
  const [isTransferSuccess, setisTransferSuccess] = useState(false);

  async function transfer(e) {
    e.preventDefault();
    const obj = {
      transferTo: user._id,
      amount: Number(amount),
    };
    const response = await useTransferAmountApi(obj);

    if (response?.message === "Transaction Successfull") {
      setAmount("");
      setisTransferSuccess(true);
      setTimeout(() => closeModal(), 5000);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white gap-1 flex flex-col items-center p-6 rounded-lg shadow-lg w-[400px] h-[420px] border-2 border-blue-400">
        <img
          onClick={closeModal}
          src={closeIcon}
          className="ml-[335px] m-[-14px] mb-1 w-6 h-6 cursor-pointer"
        />
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-orange-500">T</span>ransfer{" "}
          <span className="text-orange-500">M</span>oney
        </h2>
        <div className="font-bold text-xl">To</div>
        <div className="flex flex-row gap-1 justify-center items-center m-2">
          <img src={userIcon} className="w-6 h-6" />
          <div className=" mb-1 font-bold text-xl">{user.firstname}</div>
        </div>

        <form
          onSubmit={(e) => transfer(e)}
          className="flex flex-col m-6 gap-2 w-full mb-6"
        >
          <p className="ml-1.5 mb-[-6px]">Amount (in Rs.)</p>

          <div className="h-16 ">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded-lg w-full"
              placeholder="Enter Amount"
            />
          </div>

          <button
            type="submit"
            disabled={isTransferSuccess}
            className="bg-red-700 ml-[2px] w-full text-white px-4 py-2 rounded-lg border-2"
          >
            Transfer Amount
          </button>
          {isTransferSuccess ? (
            <div className="flex flex-row gap-3 mt-3 justify-center">
              <img src={transferMoneyIcon} className="w-8 h-8" />
              <p className="text-green-400 font-bold text-xl">
                Transfer Successfull !
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div>
                Please check{" "}
                <span className="text-red-600 font-bold">amount</span> and
              </div>
              <div>
                the <span className="text-red-600 font-bold">Person</span> you
                are sending money To
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
