// Create multiple forms from a sheets document
function createForms() {
// Access the specific spreadsheet and sheet
var sheet = SpreadsheetApp.openById('1ZEdq0EAbKK9dGXe8HuN5IiOq2RsYRX91ZwkqFwF1h6M').getSheetByName('questions');

// Get the data from the spreadsheet
var data = sheet.getDataRange().getValues();

// Access the template form
var templateFormId = '12h7kGONtnP7OnZwZY-a132cWyfKxRWHU1PfrpzYglcE';
var templateFormFile = DriveApp.getFileById(templateFormId);

var newFormFile, newForm;

// Loop through each row of data
for (var i = 0; i < data.length; i++) {
var row = data[i];

// If the row is an "END" row, skip to the next row
if (row[0] === 'END') {
continue;
}

// If the row is a title row, create a new form
// The row is a title row if rows 1 and 2 are empty
if (row[1] === '' && row[2] === '') {
if (newForm) {
Logger.log('Created a new form with ID: ' + newForm.getId());
}
// New form is created taking row[0] as the file and form title
newFormFile = templateFormFile.makeCopy(row[0]);
newForm = FormApp.openById(newFormFile.getId());
newForm.setTitle(row[0]);
var items = newForm.getItems();
for (var j = 0; j < items.length; j++) {
newForm.deleteItem(items[j]);
}
} else if (newForm) {
// Only add questions if the form has been created

// Get the question, choices, and correct answer
// Question is in column 0
// Choices are in column 1, separated by commas
// Correcto answers are in column 2, separated by commas
var question = row[0];
var choices = row[1].split(', ');
var correctAnswer = row[2];

// Create a new multiple choice item, set the choices, and add the correct answer to the description
// Correct answers must be manually set and descriptions must be deleted (use deletehelptext.gs)
var item = newForm.addMultipleChoiceItem().setTitle(question).setChoiceValues(choices).setHelpText('Correct answer: ' + correctAnswer);

// Set the item to be worth 1 point
item.setPoints(1);
}
}

if (newForm) {
Logger.log('Created a new form with ID: ' + newForm.getId());
}
}
