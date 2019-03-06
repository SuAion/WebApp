export default (jsonStr) => {
  const formData = new FormData();
  for (var i in jsonStr) {
    if (jsonStr.hasOwnProperty(i)) {
      formData.append(i, jsonStr[i]);
    }
  }
  return formData;
}
