var express = require('express');
var stormpath = require('express-stormpath');
var xlsx = require('xlsx');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var excel_upload = upload.single('XLupload');
var AVLTree = require('binary-search-tree').AVLTree;
var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun('key-0ee8ffde132bab0666d733b80f46b6a4');
var router = express.Router();

<<<<<<< HEAD
if ((typeof alert) === 'undefined') {
	global.alert = function(message) {
		console.log(message);
=======
/* Takes in the Excel sheet and rips meaningful data from it, storing the data
in cellDateHash and employeeSchedule. */
function extractData(sheet, employeeSchedule, cellDateHash, currentEmployees) {

	var weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	// Current employee that is being modified inside of employee Object
	var employeeBeingModified;
	var currentRow;
	var employeeRow = null;

	for (cell in sheet) { 
		var cellAsString = String(sheet[cell].v);
		var cellAddress = String(cell);
		// Get row from cell address
		if (cellAddress.length == 2) {
			currentRow = cellAddress.slice(1, 2);
		} else if (cellAddress.length == 3 && cellAddress.charCodeAt(1) > 57) {
			currentRow = cellAddress.slice(2, 3);
		} else if (cellAddress.length == 3 && cellAddress.charCodeAt(1) <= 57) {
			currentRow = cellAddress.slice(1, 3);
		} else {
			currentRow = cellAddress.slice(2, 4);
		}
		// All keys that do not begin with "!" correspond to cell addresses
		// First, find cell addresses holding dates for the current week
		if (cell[0] === "!") continue;
		if (Object.keys(cellDateHash).length < 7) {
			for (day in weekDays) {
				var searchResult = cellAsString.search(weekDays[day]);
				if (searchResult != -1) {
					// Get column of date.  Key will be column, value will the date string.
					cellAddress = cellAddress.length == 2 ? cellAddress.slice(0, 1) : cellAddress.slice(0, 2);
					cellDateHash[cellAddress] = cellAsString;					
				}   
			}
		}
		// Search AVL Tree to see when employees are found in the spreadsheet
		// When employee is found, save their name in the object and save the row that the employee occurs on
		if (currentEmployees.search(cellAsString) == 1 && Object.keys(cellDateHash).length == 7) {
			employeeBeingModified = cellAsString;
			// Add employee name as a key to the object if it does not exist
			if (!employeeSchedule.hasOwnProperty(cellAsString)) {
				employeeSchedule[cellAsString] = {};
			}
			// Set employee row to match the current row
			employeeRow = currentRow;
			continue;
		}
		// Find the employees work days on the currentRow. Date strings don't match up with work times, 
		// thus must find closest column.
		if (currentRow == employeeRow) {
			if (cellAsString.length > 5) {
				var closestKey;
				var shortestDistance = null;
				for (var key in cellDateHash) {
					// Get ascii values of the keys and the current column
					var keyAscii = key.length == 1 ? key.charCodeAt(0) : key.charCodeAt(0) + key.charCodeAt(1);
					var currentColumn = cellAddress.charCodeAt(1) > 57 ? cellAddress.slice(0, 2) : cellAddress.slice(0, 1);
					var columnAsAscii = currentColumn.length == 1 ? currentColumn.charCodeAt(0) :
					currentColumn.charCodeAt(0) + currentColumn.charCodeAt(1);
					// Find the closest matching key
					var keyDistance = keyAscii >= columnAsAscii ? keyAscii - columnAsAscii : columnAsAscii - keyAscii;
					if (keyDistance < shortestDistance || shortestDistance == null) {
						shortestDistance = keyDistance;
						closestKey = key;
					}
				}
				// Insert the employee, along with the correct date key into the object
				var newProperty = cellDateHash[closestKey];
				var employeeIsolated = employeeSchedule[employeeBeingModified];
				employeeIsolated[newProperty] = cellAsString;
			}
		}
>>>>>>> 65c5780ed2c99c1109b223c6aa5ba589e422d07b
	}
}

// Update the document with new information from cell edit
router.post('/cell', function(req, res) {
	var name = req.body.name;
	var newTime = req.body.time;
	var date = req.body.date;
	var response = {
		status: 200,
		success: 'Schedule Updated Successfully'
	}
	var dbLocal = req.db;
	var collection = dbLocal.collection('chip');
	var update = {"$set": {} };
	update.$set[name + "." + date] = newTime;

	if (collection.update({}, update))
		res.end(JSON.stringify(response));

});

router.post('/', excel_upload, function(req, res) {
	var currentEmployees = new AVLTree();
	// Get the path to the uploaded Excel file
	var fileObject = req.file;
	var filePath = fileObject.path;

	// Drop schedule document if one exists in the database
	var dbLocal = req.db;
	var insertionCollection = dbLocal.collection('chip');
	insertionCollection.count(function(err, count) {
		if (!err && count !== 0) {
			insertionCollection.remove({});
		}
	});

	// Get employee list instance which will be used to get current employees from DB
	var employeeCollection = dbLocal.collection('employeeList');
	// Get employee availabilities that have been posted
	// Object which will act as a hashmap, mapping dates to cell addresses
	// Cell address will act as the key and the date will be the value
	var cellDateHash = {};
	/* Object which will be converted to all-JSON and inserted into the database
	 Keys will be employee name and the value an object containing dates they are working
	 This object is filled with data parsed from the .xslx file being uploaded*/
	var employeeSchedule = {};

	// Callback that inserts new object w/ employee schedule into the database
	function insertObj(obj) {
		insertionCollection.insertOne(obj, function(err, result) {
			if (err)
				console.log(err);
			else
				res.redirect('/success');
		});
	};

	// Insert current employees into the AVLTree
	employeeCollection.find({}).toArray(function(err, result) {
		if (err) throw err;
		for (doc in result) {
			currentEmployees.insert(result[doc].name, 1);
		}
		synthesizeNew(insertObj);
	});

	// Parses data from xlsx files into an object
	function synthesizeNew(insert) {
		// Convert the Excel data to JSON 
		var workbook = xlsx.readFile(String(filePath));
		var sheet_name_list = workbook.SheetNames;
<<<<<<< HEAD
		var weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		// Current employee that is being modified inside of employee Object
		var employeeBeingModified;
		var currentRow;
		var employeeRow = null;
=======
>>>>>>> 65c5780ed2c99c1109b223c6aa5ba589e422d07b
		/* Iterate through the cells in the worksheet, finding the cell addresses
		that contain the dates.  Save date-containing addresses in the hashmap to ensure that
		employee schedule information will be as accurate as possible. */
		sheet_name_list.forEach(function(y) {
			var sheet = workbook.Sheets[y];
<<<<<<< HEAD
			for (cell in sheet) { 
				var cellAsString = String(sheet[cell].v);
				var cellAddress = String(cell);
				// Get row from cell address
				if (cellAddress.length == 2) {
					currentRow = cellAddress.slice(1, 2);
				} else if (cellAddress.length == 3 && cellAddress.charCodeAt(1) > 57) {
					currentRow = cellAddress.slice(2, 3);
				} else if (cellAddress.length == 3 && cellAddress.charCodeAt(1) <= 57) {
					currentRow = cellAddress.slice(1, 3);
				} else {
					currentRow = cellAddress.slice(2, 4);
				}
				// All keys that do not begin with "!" correspond to cell addresses
				if (cell[0] === "!") continue;
				if (Object.keys(cellDateHash).length < 7) {
					for (day in weekDays) {
						var searchResult = cellAsString.search(weekDays[day]);
						if (searchResult != -1) {
							// Get column of date.  Key will be column, value will the date string.
							cellAddress = cellAddress.length == 2 ? cellAddress.slice(0, 1) : cellAddress.slice(0, 2);
							cellDateHash[cellAddress] = cellAsString;					
						}   
					}
				}
				// Search AVL Tree to see when employees are found in the spreadsheet
				// When employee is found, save their name in the object and save the row that the employee occurs on
				if (currentEmployees.search(cellAsString) == 1 && Object.keys(cellDateHash).length == 7) {
					employeeBeingModified = cellAsString;
					// Add employee name as a key to the object if it does not exist
					if (!employeeSchedule.hasOwnProperty(cellAsString)) {
						employeeSchedule[cellAsString] = {};
					}
					// Set employee row to match the current row
					employeeRow = currentRow;
					continue;
				}
				// Find the employees work days on the currentRow. Date strings don't match up with work times, 
				// thus must find closest column.
				if (currentRow == employeeRow) {
					if (cellAsString.length > 5) {
						var closestKey;
						var shortestDistance = null;
						for (var key in cellDateHash) {
							// Get ascii values of the keys and the current column
							var keyAscii = key.length == 1 ? key.charCodeAt(0) : key.charCodeAt(0) + key.charCodeAt(1);
							var currentColumn = cellAddress.charCodeAt(1) > 57 ? cellAddress.slice(0, 2) : cellAddress.slice(0, 1);
							var columnAsAscii = currentColumn.length == 1 ? currentColumn.charCodeAt(0) : currentColumn.charCodeAt(0) + currentColumn.charCodeAt(1);
							// Find the closest matching key
							var keyDistance = keyAscii >= columnAsAscii ? keyAscii - columnAsAscii : columnAsAscii - keyAscii;
							if (keyDistance < shortestDistance || shortestDistance == null) {
								shortestDistance = keyDistance;
								closestKey = key;
							}
						}
						// Insert the employee, along with the correct date key into the object
						var newProperty = cellDateHash[closestKey];
						var employeeIsolated = employeeSchedule[employeeBeingModified];
						employeeIsolated[newProperty] = cellAsString;
					}
				}
			}
=======
			extractData(sheet, employeeSchedule, cellDateHash, currentEmployees);
>>>>>>> 65c5780ed2c99c1109b223c6aa5ba589e422d07b
			insert(employeeSchedule);
		});
	};

});

module.exports = router;