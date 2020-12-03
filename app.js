const chalk = require('chalk');
const yargs = require('yargs');
const validator = require('validator');
const {
    addNote,
    getNote,
    listNotes,
    removeNote
} = require('./notes.js');

// Customize yargs
yargs.version(`v.1.0`)

// Create add command
yargs.command({
    command: `add`,
    describe: `Add a new note`,
    builder: {
        title: {
            alias: `t`,
            describe: `Note title`,
            demandOption: true,
            type: `string`
        },
        body: {
            alias: `b`,
            describe: `Note body`,
            default: `Default body`,
            demandOption: true,
            type: `string`
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: `remove`,
    describe: `Remove a note`,
    builder: {
        title: {
            alias: `t`,
            describe: `Note title`,
            demandOption: true,
            type: `string`
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
    }
});

// Create read command
yargs.command({
    command: `read`,
    describe: `Read a note`,
    builder: {
        title: {
            alias: `t`,
            describe: `Note title`,
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        getNote(argv.title)
    }
});

// Create list command
yargs.command({
    command: `list`,
    describe: `List all notes`,
    handler: () => {
        listNotes();
    }
});

// add, remove, read, list
// console.log(yargs.argv);
yargs.parse();