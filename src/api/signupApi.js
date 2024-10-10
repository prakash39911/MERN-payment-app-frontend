export const useSignupApi = async function (userData) {
  const response = await fetch("http://localhost:3000/api/v1/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  return { response, data };
};
