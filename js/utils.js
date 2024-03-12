const books = [];

const generateId = () => {
  return +new Date();
};

const generateObjectBook = (objectBook) => {
  return {
    id: objectBook.id,
    title: objectBook.title,
    author: objectBook.author,
    year: objectBook.year,
    isCompleted: objectBook.isCompleted,
  };
};

const findBook = (id) => {
  const findData = books.find((book) => book.id === id);
  return findData ?? null;
};

const findBookByIndex = (id) => {
  const findData = books.findIndex((book) => book.id === id);
  return findData ?? -1;
};

const findBookByTitle = (title) => {
  const findData = books.filter((book) =>
    book.title.toUpperCase().includes(title.toUpperCase())
  );
  return findData ?? null;
};

const makeBook = (objectBook) => {
  const container = document.createElement("article");
  container.classList.add("card", "m-3", "book_item");
  container.setAttribute("data-id", objectBook.id);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = objectBook.title;

  const author = document.createElement("p");
  author.classList.add("card-text");
  author.innerText = `Penulis: ${objectBook.author}`;

  const year = document.createElement("p");
  year.classList.add("card-text");
  year.innerText = `Tahun: ${objectBook.year}`;

  const action = document.createElement("div");
  action.classList.add("action", "d-flex", "gap-3");
  if (objectBook.isCompleted) {
    const incompleteButton = document.createElement("button");
    incompleteButton.setAttribute("id", "incompleteButton");
    incompleteButton.classList.add("btn", "btn-success");
    incompleteButton.innerHTML = `<i class="bi bi-bookmark-dash" style="padding-right: 5px;"></i>Belum selesai di Baca`;
    incompleteButton.addEventListener("click", () => {
      undoBookFromCompleted(objectBook.id);
    });

    action.append(incompleteButton);
  } else {
    const completeButton = document.createElement("button");
    completeButton.setAttribute("id", "completeButton");
    completeButton.classList.add("btn", "btn-success");
    completeButton.innerHTML = `<i class="bi bi-bookmark-check" style="padding-right: 5px;"></i>Sudah selesai di Baca`;
    completeButton.addEventListener("click", () => {
      addBookFromCompleted(objectBook.id);
    });
    action.append(completeButton);
  }
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "deleteButton");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.innerHTML = `<i class="bi bi-trash3" style="padding-right: 5px;"></i>Hapus Buku`;
  deleteButton.addEventListener("click", () => {
    modalDelete(objectBook);
  });

  action.append(deleteButton);
  cardBody.append(title, author, year, action);
  container.appendChild(cardBody);

  return container;
};

const addBook = () => {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

  const generatedId = generateId();

  const bookObject = generateObjectBook({
    id: generatedId,
    title: bookTitle,
    author: bookAuthor,
    year: parseInt(bookYear),
    isCompleted: bookIsComplete,
  });

  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveDataToStorage();
};

const addBookFromCompleted = (id) => {
  const bookTarget = findBook(id);
  if (!bookTarget) return null;
  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveDataToStorage();
};

const removeBook = (id) => {
  const bookTarget = findBookByIndex(id);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveDataToStorage();
};

const undoBookFromCompleted = (id) => {
  const bookTarget = findBook(id);

  if (!bookTarget) return null;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveDataToStorage();
};

const searchBook = () => {
  const searchInput = document.getElementById("searchBookTitle").value;

  const searchResult = findBookByTitle(searchInput.toUpperCase());
  if (searchInput) {
    if (searchResult) {
      const bookList = document.querySelectorAll(".book_item");

      bookList.forEach((book) => {
        const title = book.querySelector("h5").innerText;
        const match = searchResult.find((result) => result.title === title);
        book.style.display = match ? "block" : "none";
      });
    }
  } else {
    return document.dispatchEvent(new Event(RENDER_EVENT));
  }
};

modalDelete = (objectBook) => {
  const { id: bookId, title, author, year } = objectBook;

  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.innerText = `Hapus Buku ${title}`;
  modalBody.innerText = `Apakah kamu yakin buku ${title} dari author ${author} tahun ${year} akan dihapus?`;

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.id = "hiddenBookId";
  hiddenInput.value = bookId;
  modalTitle.appendChild(hiddenInput);
  document.dispatchEvent(new Event(MODAL_EVENT));
  // modalNotification(objectBook);
};

modalNotification = (objectBook) => {
  const { title, author } = objectBook;
  const modalBody = document.getElementById("modalNotificationBody");
  modalBody.innerText = `Buku ${title} dari author ${author} telah dihapus`;

  const notificationModal = new bootstrap.Modal(
    document.getElementById("notificationModal")
  );
  notificationModal.show();

  setTimeout(() => {
    notificationModal.hide();
  }, 3000);
};
