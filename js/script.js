var bookmarkName = document.getElementById('bookmarkName')
var bookmarkURL = document.getElementById('bookmarkURL')
var submitBtn = document.getElementById('submitBtn')
var bookmarkList = [];



submitBtn.onclick = addName;


// localStorage

if (localStorage.getItem('bookmark') !== null) {
  bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
  displyaList()
} else {
  bookmarkList = []
}



function addName() {

  if (bookmarkName.value.trim() === "") {
    alert("Site Name or Url is not valid");
    return;
  }
  if (!/^https?:\/\//.test(bookmarkURL.value)) {
    alert("please enter a valid URL start with http:// or https://")
    return;
  }


  var bookmark = {
    bookmarkName: bookmarkName.value,
    bookmarkURL: bookmarkURL.value,
  }
  bookmarkList.push(bookmark);
  localStorage.setItem('bookmark', JSON.stringify(bookmarkList))
  displyaList();
  resetForm();

}

// display 

function displyaList() {
  var cartona = ``;
  for (let i = 0; i < bookmarkList.length; i++) {
    cartona += `<tr>
                      <td>${i + 1}</td>
                      <td><span class="text-capitalize">${bookmarkList[i].bookmarkName}</span></td>              
                      <td>
                        <a href="${bookmarkList[i].bookmarkURL}" target="_blank" class="btn btn-visit" data-index="0">
                          <i class="fa-solid fa-eye pe-2"></i>Visit
                        </a>
                      </td>
                      <td>
                        <button onclick="deleteName(${i})" class="btn btn-delete pe-2" data-index="0">
                          <i class="fa-solid fa-trash-can"></i>
                          Delete
                        </button>
                      </td>
                  </tr> `

  }
  document.getElementById('tableContent').innerHTML = cartona
}


// clear form

function resetForm() {
  bookmarkName.value = null;
  bookmarkURL.value = null;
}


function deleteName(index) {
  bookmarkList.splice(index, 1)
  displyaList()
  localStorage.setItem('bookmark', JSON.stringify(bookmarkList))
}


// validation 

var nameRegex = document.getElementById('bookmarkName')
nameRegex.addEventListener('input', function () {
  var regex = /^[a-z0-9_-]{3,15}$/;
  var myStr = nameRegex.value;

  if (regex.test(myStr) == true) {
    nameRegex.classList.add('is-valid');
    nameRegex.classList.remove('is-invalid');
  } else {
    nameRegex.classList.add('is-invalid');
    nameRegex.classList.remove('is-valid');
  }
})
var urlRegex = document.getElementById('bookmarkURL')
urlRegex.addEventListener('input', function () {
  var regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
  var myStr = urlRegex.value;

  if (regex.test(myStr) == true) {
    urlRegex.classList.add('is-valid');
    urlRegex.classList.remove('is-invalid');
  } else {
    urlRegex.classList.add('is-invalid');
    urlRegex.classList.remove('is-valid');
  }
});
