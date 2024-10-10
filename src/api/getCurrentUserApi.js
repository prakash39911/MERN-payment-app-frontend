export const useGetCurrentUserApi = async () => {
  const localStorageToken = JSON.parse(localStorage.getItem("jwttoken"));

  if (localStorageToken) {
    const response = await fetch(
      "http://localhost:3000/api/v1/user/getcurrentuser",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to fetch current User data");
    }

    const data = await response.json();
    
    return data.userData;
  } else {
    return null;
  }
};
