const STORAGE_KEY = "storage-book-shelf";
const isStorageExist = () => {
  if (typeof Storage) {
    return true;
  } else {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
};

const saveDataToStorage = () => {
  if (isStorageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    document.dispatchEvent(new Event(SAVE_EVENT));
  }
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data) {
    data.forEach((book) => {
      books.push(book);
    });
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
};
