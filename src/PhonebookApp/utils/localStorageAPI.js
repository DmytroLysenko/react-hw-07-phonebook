const get = (name, noData = []) => {
  return localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : noData;
};

const set = (name, data) => {
  return localStorage.setItem(name, data);
};

export default { get, set };
