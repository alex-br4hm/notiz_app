let noteHeadlineArr = ["test1", "test2", "test3", "test4", "test5", "test6"];
let noteTextArr = [
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariaturLorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum rem maxime sed, recusandae eius aperiam molestias nisi quae iure pariatur",
];
let trashHeadlineArr = [];
let trashTextArr = [];
let noteContainer = document.getElementById("notesCardContainer");

function renderNotices(noteHeadlineArr, noteTextArr) {
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

function renderedNoticesBack() {
  addNotice();
  document.getElementById("noteHeadline").value = "";
  document.getElementById("noteText").value = "";
}

function addNotice() {
  let noteHeadlineInput = document.getElementById("noteHeadline").value;
  let noteTextInput = document.getElementById("noteText").value;

  if (noteHeadlineInput && noteTextInput) {
    noteHeadlineArr.push(noteHeadlineInput);
    noteTextArr.push(noteTextInput);
    renderNotices(noteHeadlineArr, noteTextArr);
  } else {
    alert("enter title and name");
  }
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
}

// open/close trash overlay
function toggleTrashOverlay() {
  let trashOverlay = document.getElementById("trashOverlay");
  let emptyTrashBtn = document.getElementById("emptyTrashBtn");
  let trashArrow = document.getElementById("trashArrow");
  trashOverlay.classList.toggle("d-none");
  emptyTrashBtn.classList.toggle("d-none");
  trashArrow.classList.toggle("trash-arrow-rotated");
}

// empty trash
function emptyTrash() {
  let trashOverlay = document.getElementById("trashOverlay");
  trashOverlay.innerHTML = "";
}

function editNotice(z) {
  document.getElementById("noteHeadline").classList.add("edit-field");
  document.getElementById("noteText").classList.add("edit-field");
  document.getElementById("noteHeadline").value = noteHeadlineArr[z];
  document.getElementById("noteText").value = noteTextArr[z];
  noteHeadlineArr.splice(z, 1);
  noteTextArr.splice(z, 1);
  document.documentElement.scrollTop = 0;
  renderNotices(noteHeadlineArr, noteTextArr);
}
