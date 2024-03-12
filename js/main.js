const RENDER_EVENT = "render-book-shelf";
const SAVE_EVENT = "save-book-shelf";
const MODAL_EVENT = "modal-book=shelf";

document.addEventListener(RENDER_EVENT, () => {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  incompleteBookshelfList.innerHTML = "";
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  completeBookshelfList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = makeBook(book);
    if (book.isCompleted) {
      completeBookshelfList.append(bookElement);
    } else {
      incompleteBookshelfList.append(bookElement);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const submitBookForm = document.getElementById("inputBook");

  submitBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
  });
  const searchBookForm = document.getElementById("searchBook");
  searchBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchBook();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(MODAL_EVENT, () => {
  const bookItem = document.querySelector(".book_item");
  if (bookItem) {
    const bookId = bookItem.getAttribute("data-id");
    const book = books.find((b) => b.id == bookId);
    modalDelete(book);
  }
});
