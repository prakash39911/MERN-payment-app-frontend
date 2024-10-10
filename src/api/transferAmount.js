export const useTransferAmountApi = async (obj) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const localstoragetoken = JSON.parse(localStorage.getItem("jwttoken"));

  if (localstoragetoken) {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/account/transferfund`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localstoragetoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    if (!response.ok) {
      throw new Error("Error while transferring money");
    }

    const data = await response.json();
    return data;
  } else return null;
};
