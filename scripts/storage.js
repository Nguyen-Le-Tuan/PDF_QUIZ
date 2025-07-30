// storage.js
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  function loadFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  function clearStorage() {
    localStorage.clear();
  }
  