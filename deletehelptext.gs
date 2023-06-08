// Deletes help texts in all of the questions in the forms inside a given folder
function deleteHelpTextInForms() {
  // Specify the ID of your folder here
  var folderId = '1gCS1-5HD42T9xDQmCoIdaml7husWPURo';

  // Get all the files in the folder
  var files = DriveApp.getFolderById(folderId).getFiles();

  while (files.hasNext()) {
    var file = files.next();

    // Check if the file is a Google Form
    if (file.getMimeType() === 'application/vnd.google-apps.form') {
      var form = FormApp.openById(file.getId());

      // Get all the items in the form
      var items = form.getItems();

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        // Check if the item is a multiple choice question
        if (item.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
          var mcItem = item.asMultipleChoiceItem();

          // Remove the description (help text) of the question
          mcItem.setHelpText('');
        }
      }
    }
  }
}
