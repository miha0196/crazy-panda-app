export const fetchTableItems = async () => {
  const res = await fetch("http://localhost:3030/names");
  return await res.json();
};
