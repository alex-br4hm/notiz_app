let noteHeadlineArr = [];
let noteTextArr = [];
let trashHeadlineArr = [];
let trashTextArr = [];

getFromLocalStorage();

function addNotice() {
  let noteHeadlineInput = document.getElementById("noteHeadline").value;
  let noteTextInput = document.getElementById("noteText").value;
  console.log(noteHeadlineInput, noteTextInput);

  if (noteHeadlineInput && noteTextInput) {
    console.table(noteHeadlineArr);
    noteHeadlineArr.push(noteHeadlineInput);
    noteTextArr.push(noteTextInput);
    renderNotices(noteHeadlineArr, noteTextArr);
  } else {
    openErrorWarning();
  }

  saveInLocalStorage();
}

function renderNotices(noteHeadlineArr, noteTextArr) {
  let noteContainer = document.getElementById("notesCardContainer");
  noteContainer.innerHTML = "";

  for (let i = 0; i < noteHeadlineArr.length; i++) {
    noteContainer.innerHTML += `
    <div class="notes-card-content">
        <div class="note-headline-card" id="noteHeadlineCard">${noteHeadlineArr[i]}</div>
     <div class="note-text-card" id="noteTextCard">${noteTextArr[i]}
    <div class="cards-delete-btn" onclick="deleteNotice(${[i]})">&#10005;</div>
    <div class="cards-edit-btn" onclick="editNotice(${[i]})">edit</div>
    </div>
    </div>
    </div>
    `;
  }
}

function emptyInputs() {
  addNotice();
  document.getElementById("noteHeadline").value = "";
  document.getElementById("noteText").value = "";
}

function openErrorWarning() {
  document.getElementById("errorWarning").classList.remove("d-none");
}

function closeErrorWarning() {
  document.getElementById("errorWarning").classList.add("d-none");
}

function deleteNotice(x) {
  deletedHeadlineElementFromArr = noteHeadlineArr.slice(x, x + 1);
  deletedTextElementFromArr = noteTextArr.slice(x, x + 1);
  trashHeadlineArr.push(deletedHeadlineElementFromArr[0]);
  trashTextArr.push(deletedTextElementFromArr[0]);

  noteHeadlineArr.splice(x, 1);
  noteTextArr.splice(x, 1);
  renderNotices(noteHeadlineArr, noteTextArr);
  renderTrash(trashHeadlineArr, trashTextArr);

  saveInLocalStorage();
}

function renderTrash(trashHeadlineArr, trashTextArr) {
  let trashOverlay = document.getElementById("trashOverlay");
  trashOverlay.innerHTML = "";
  for (let i = 0; i < trashHeadlineArr.length; i++) {
    trashOverlay.innerHTML += `
              <div class="trash-card">
                  <h2>${trashHeadlineArr[i]}</h2>
                  <div>${trashTextArr[i]}</div>
                <div id="restoreBtn" onclick="restoreFromTrash(${[i]})">restore</div>
              </div>`;
  }
}

function restoreFromTrash(y) {
  noteHeadlineArr.push(trashHeadlineArr[y]);
  noteTextArr.push(trashTextArr[y]);
  renderNotices(noteHeadlineArr, noteTextArr);
  trashHeadlineArr.splice(y, 1);
  trashTextArr.splice(y, 1);
  renderTrash(trashHeadlineArr, trashTextArr);

  saveInLocalStorage();
}

// open/close trash overlay
function toggleTrashOverlay() {
  let trashOverlay = document.getElementById("trashOverlay");
  let emptyTrashBtn = document.getElementById("emptyTrashBtn");
  let trashToggleBtn = document.getElementById("trashToggleBtn");
  let trashToggleCross = document.getElementById("trashToggleCross");
  trashToggleCross.classList.toggle("d-none");
  trashToggleBtn.classList.toggle("d-none");
  trashOverlay.classList.toggle("d-none");
  emptyTrashBtn.classList.toggle("d-none");
}

// empty trash
function emptyTrash() {
  trashHeadlineArr = [];
  trashTextArr = [];
  renderTrash(trashHeadlineArr, trashTextArr);
  saveInLocalStorage();
}

function editNotice(z) {
  document.getElementById("noteHeadline").classList.add("edit-field");
  document.getElementById("noteText").classList.add("edit-field");
  document.getElementById("noteHeadline").value = noteHeadlineArr[z];
  document.getElementById("noteText").value = noteTextArr[z];
  noteHeadlineArr.splice(z, 1);
  noteTextArr.splice(z, 1);
  document.documentElement.scrollTop = 0;
  saveInLocalStorage();
  renderNotices(noteHeadlineArr, noteTextArr);
}

function toggleTrashOverlayOnClick() {
  let trashOverlay = document.getElementById("trashOverlay");
  let trashToggleCross = document.getElementById("trashToggleCross");
  let trashToggleBtn = document.getElementById("trashToggleBtn");
  let emptyTrashBtn = document.getElementById("emptyTrashBtn");
  trashOverlay.classList.add("d-none");
  trashToggleCross.classList.add("d-none");
  trashToggleBtn.classList.remove("d-none");
  emptyTrashBtn.classList.add("d-none");
}

// LOCAL STORAGE HELPING FUNCTIONS //

function saveInLocalStorage() {
  let titleAsText = JSON.stringify(noteHeadlineArr);
  localStorage.setItem("noticeTitle", titleAsText);
  let textAsText = JSON.stringify(noteTextArr);
  localStorage.setItem("noticeText", textAsText);

  let trashTitleAsText = JSON.stringify(trashHeadlineArr);
  localStorage.setItem("trashNoticeTitle", trashTitleAsText);

  let trashTextAsText = JSON.stringify(trashTextArr);
  localStorage.setItem("trashNoticeText", trashTextAsText);
}

function getFromLocalStorage() {
  let noteHeadlineArrLocalStorage = localStorage.getItem("noticeTitle");
  let noteTextArrLocalStorage = localStorage.getItem("noticeText");
  let trashHeadlineArrLocalStorage = localStorage.getItem("trashNoticeTitle");
  let trashTextArrLocalStorage = localStorage.getItem("trashNoticeText");

  if (noteHeadlineArrLocalStorage && noteTextArrLocalStorage) {
    noteHeadlineArr = JSON.parse(noteHeadlineArrLocalStorage);
    noteTextArr = JSON.parse(noteTextArrLocalStorage);
    renderNotices(noteHeadlineArr, noteTextArr);
  }

  if (trashHeadlineArrLocalStorage && trashTextArrLocalStorage) {
    trashHeadlineArr = JSON.parse(trashHeadlineArrLocalStorage);
    trashTextArr = JSON.parse(trashTextArrLocalStorage);
    console.table("HIIIIIIIIIER");
    console.table(trashHeadlineArr, trashTextArr);
    renderTrash(trashHeadlineArr, trashTextArr);
  }
}
