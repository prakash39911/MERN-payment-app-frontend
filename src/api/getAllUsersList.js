export const useGetAllUsersListApi = async (filterObj) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const localstorageToken = JSON.parse(localStorage.getItem("jwttoken"));

  // Build query parameters string from the filters object
  const queryParams = new URLSearchParams(filterObj).toString();

  if (localstorageToken) {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/user/getalluser?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localstorageToken}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } else return null;
};
