function addNotice() {
  let noteHeadline = document.getElementById("noteHeadline").value;
  let noteText = document.getElementById("noteText").value;
  let noteContainer = document.getElementById("notesCardContainer");

  noteContainer.innerHTML += `
    <div class="notes-card-content">
        <div class="note-headline-card" id="noteHeadlineCard">${noteHeadline}</div>
     <div class="note-text-card" id="noteTextCard">${noteText}
    <div class="cards-delete-btn">&#10005;</div>
    <div class="cards-edit-btn">edit</div>
    </div>
    </div>
    </div>
    `;

  document.getElementById("noteHeadline").value = "";
  document.getElementById("noteText").value = "";
}
