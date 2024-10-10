export const useLoginApi = async (formData) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const response = await fetch(`${API_BASE_URL}/api/v1/user/login`, {
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
