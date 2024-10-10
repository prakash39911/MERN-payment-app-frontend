export const useLoginApi = async (formData) => {
  const response = await fetch("http://localhost:3000/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  localStorage.setItem("jwttoken", JSON.stringify(data.jwtToken));

  return { response, data };
};
