export const useGetCurrentUserApi = async () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const localStorageToken = JSON.parse(localStorage.getItem("jwttoken"));

  if (localStorageToken) {
    const response = await fetch(`${API_BASE_URL}/api/v1/user/getcurrentuser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch current User data");
    }

    const data = await response.json();

    return data.userData;
  } else {
    return null;
  }
};
