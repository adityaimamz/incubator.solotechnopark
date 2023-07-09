export const formatDate = (inputDate) => {
  const dateObject = new Date(inputDate);
  const year = dateObject.getFullYear();
  let month = String(dateObject.getMonth() + 1).padStart(2, "0");
  let day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
