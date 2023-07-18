var tableContent = document.getElementById("tableContent");
var nameInput = document.getElementById("site-name");
var urlInput = document.getElementById("site-url");
var modal = document.getElementById("modal");

var bookmarks = [];

var urlRegex = /^(http(s)?:\/\/)?www.[a-zA-Z0-9]+\.com$/;

var savedURLs = sessionStorage.getItem("urls");
if (savedURLs != null) {
    bookmarks = JSON.parse(savedURLs);
}
displayAllURLs();

function addURL() {
    if (nameInput.value.length < 3 || !urlRegex.test(urlInput.value)) {
        // alert(`Site Name or Url is not valid, Please follow the rules below :
        // - Site name must contain at least 3 characters
        // - Site URL must be a valid one`);
        openModal();
        return;
    }
    var index = 1;
    if (bookmarks.length > 0) {
        index = bookmarks[bookmarks.length - 1].index + 1;
    }
    var url = urlInput.value;
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        url = "https://" + url;
    }
    bookmarks.push({
        index: index,
        name: nameInput.value,
        url: url,
    });
    displayAllURLs();
    sessionStorage.setItem("urls", JSON.stringify(bookmarks));
    clearInputs();
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
}

function deleteURL(index) {
    bookmarks.splice(index, 1);
    displayAllURLs();
    sessionStorage.setItem("urls", JSON.stringify(bookmarks));
}

function displayAllURLs() {
    var content = "";
    for (var i = 0; i < bookmarks.length; i++) {
        content += `
            <tr>
                <td>${bookmarks[i].index}</td>
                <td>${bookmarks[i].name}</td>
                <td>
                    <a href="${bookmarks[i].url}" target="_blank" class="btn btn-success">
                        <i class="fa-solid fa-eye"></i>
                        Visit
                    </a>
                </td>
                <td>
                    <button onclick="deleteURL(${i})" class="btn btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }
    tableContent.innerHTML = content;
}

function clearInputs() {
    nameInput.value = "";
    urlInput.value = "";
}

function validateName(name) {
    if (name.length < 3) {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        return;
    }
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
}

function validateURL(url) {
    if (!urlRegex.test(url)) {
        urlInput.classList.add("is-invalid");
        urlInput.classList.remove("is-valid");
        return;
    }
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
}

function openModal() {
    modal.classList.remove("d-none");
    modal.classList.add("d-flex");
}

function closeModal() {
    modal.classList.remove("d-flex");
    modal.classList.add("d-none");
}