const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const addNoteButton = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createNoteElement(note, index) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <div class="note-actions">
            <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        </div>
    `;
    return noteDiv;
}

function displayNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        notesList.appendChild(createNoteElement(note, index));
    });
}

function addNote() {
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    if (title && content) {
        notes.push({ title, content });
        noteTitleInput.value = '';
        noteContentInput.value = '';
        saveNotes();
        displayNotes();
    }
}

function editNote(index) {
    const note = notes[index];
    noteTitleInput.value = note.title;
    noteContentInput.value = note.content;
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

notesList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('edit-btn') || target.parentElement.classList.contains('edit-btn')) {
        const index = parseInt(target.dataset.index || target.parentElement.dataset.index);
        editNote(index);
    } else if (target.classList.contains('delete-btn') || target.parentElement.classList.contains('delete-btn')) {
        const index = parseInt(target.dataset.index || target.parentElement.dataset.index);
        deleteNote(index);
    }
});

addNoteButton.addEventListener('click', addNote);

displayNotes();