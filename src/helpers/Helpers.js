export const randomNumber = () => Math.floor(Math.random() * 5) + 1;
export const formatNumberWord = (input) => {
  return input
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
};
export const jsonToCsv = (jsonData) => {
  let csv = '';
  // Get the headers
  let headers = Object.keys(jsonData[0]);
  csv += headers.join(',') + '\n';
  // Add the data
  jsonData.forEach(function (row) {
      let data = headers.map(header => row[header]).join(',');
      csv += data + '\n';
  });
  return csv;
}
