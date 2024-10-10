export const useGetAllUsersListApi = async (filterObj) => {
  const localstorageToken = JSON.parse(localStorage.getItem("jwttoken"));

  // Build query parameters string from the filters object
  const queryParams = new URLSearchParams(filterObj).toString();

  if (localstorageToken) {
    const response = await fetch(
      `http://localhost:3000/api/v1/user/getalluser?${queryParams}`,
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
