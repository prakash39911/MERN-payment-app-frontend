export const useGetAccountBalance = async () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const localStorageToken = JSON.parse(localStorage.getItem("jwttoken"));

  if (localStorageToken) {
    const response = await fetch(`${API_BASE_URL}/api/v1/account/getbalance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });

    const data = await response.json();

    return data;
  } else return null;
};
