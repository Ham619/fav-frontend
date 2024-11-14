

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const formatDate1 = (dateString) => {
  const dateParts = dateString.split("-");
  const day = String(dateParts[2]).padStart(2, "0");
  const month = String(dateParts[1]).padStart(2, "0");
  const year = String(dateParts[0]).slice(-2); // Get the last two digits of the year

  return `${day}/${month}/${year}`;
};