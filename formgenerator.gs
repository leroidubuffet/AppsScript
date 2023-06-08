// Create multiple forms from a sheets document
function createForms() {
// Access the specific spreadsheet and sheet
var sheet = SpreadsheetApp.openById('1SYBLCcnFS7LKl7nHx348yFvvDWovhOauVZs6rIuE7GY').getSheetByName('questions');


// Get the data from the spreadsheet
var data = sheet.getDataRange().getValues();


// Access the template form
var templateFormId = '1IABnBAlx3PdnKaYkkhhRFh2PV2STFXVnKwGlTuRCRUE';
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
if (row[1] === '' && row[2] === '') {
if (newForm) {
Logger.log('Created a new form with ID: ' + newForm.getId());
}
newFormFile = templateFormFile.makeCopy(row[0]);
newForm = FormApp.openById(newFormFile.getId());
var items = newForm.getItems();
for (var j = 0; j < items.length; j++) {
newForm.deleteItem(items[j]);
}
} else if (newForm) {
// Only add questions if the form has been created


// Get the question, choices, and correct answer
var question = row[0];
var choices = row[1].split(', ');
var correctAnswer = row[2];


// Create a new multiple choice item, set the choices, and add the correct answer to the description
var item = newForm.addMultipleChoiceItem().setTitle(question).setChoiceValues(choices).setHelpText('Correct answer: ' + correctAnswer);


// Set the item to be worth 1 point
item.setPoints(1);
}
}


if (newForm) {
Logger.log('Created a new form with ID: ' + newForm.getId());
}
}



