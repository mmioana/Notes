const chalk = require('chalk');
const fs = require('fs');

const addNote = async (title, body) => {

  let notes = [];

  try {
    notes = await loadNotes();
  } catch (err) {
    console.log(err);
  }

    // Check for notes duplicates
    const duplicate = notes.find(note => note.title === title);
    if (!duplicate) {
        notes.push({
            title,
            body
        });

        try {
            await saveNotes(notes);

            console.log(`Adding a new note with title ${
              chalk.blue.italic(title)
            } and description ${
              chalk.blue.italic(body)
            }`)

        } catch(err) {
            console.log(err);
        }

    } else {
      console.log(chalk.inverse.red(`Duplicate note found`))
    }

};

const removeNote = async (title) => {

    let notes = [];

    try {
        notes = await loadNotes();
    } catch (err) {
        console.log(err);
    }

    const filteredNotes = notes.filter(note => note.title !== title);

    if (filteredNotes.length !== notes.length) {

        try {
            await saveNotes(filteredNotes);

            console.log(`Note with title ${chalk.blue(title)} removed.`);

        } catch(err) {
            console.log(err);
        }

    } else {
        console.log(chalk.inverse.red(`Note not found`));
    }

};

const listNotes = async () => {
    let notes = [];

    try {
        notes = await loadNotes();
    } catch (err) {
        console.log(err);
    }

    notes.forEach((note, index) => {
      console.log(`Note ${index}: ${chalk.inverse.blue(note.title)}`);
    })
};

const getNote = async (title) => {
    let note;

    try {
        const notes = await loadNotes();
        note = notes.find(note => note.title === title);
    } catch (err) {
        console.log(err);
    }

    if (note) {
      console.log(`Note with title ${
        chalk.blue(title)
      } has body ${
        chalk.inverse.blue(note.body)
      }`);
    } else {
      console.log(chalk.inverse.red(`Note with title ${title} not found.`))
    }
};

const loadNotes = () => {

  return new Promise((resolve, reject) => {
      fs.readFile(`./notes.json`, (err, fileContent) => {

        if (err) {
          reject(err);
        }

        let notes = [];

        if ( fileContent ) {
          const notesString = fileContent.toString();
          notes = JSON.parse(notesString);
        }

        resolve(notes);
      });
  });

};

const saveNotes = (notes) => {

  return new Promise((resolve, reject) => {
      fs.writeFile(`./notes.json`, JSON.stringify(notes), (err) => {
          if (err) {
            reject(err);
          }

          resolve();
      });
  })

};

module.exports = {
    addNote,
    getNote,
    listNotes,
    removeNote,
};