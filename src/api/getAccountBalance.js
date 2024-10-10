export const useGetAccountBalance = async () => {
  const localStorageToken = JSON.parse(localStorage.getItem("jwttoken"));

  if (localStorageToken) {
    const response = await fetch(
      "http://localhost:3000/api/v1/account/getbalance",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } else return null;
};
