# time-to-work
This is a little side project I made after getting tired of having to call in and ask for the schedule for the upcoming week.  Additionally, managers would often not upload the schedule for the next week until late Sunday night, leaving us in limbo as to the schedule for the next week.

Managers can login and upload the schedule for the week in a .xslx file.  I used [SheetJS](https://github.com/SheetJS/js-xlsx) to iterate through the spreadsheet, grab the employee's schedule for the week, and insert the employee object  into MongoDB.  jQuery and AJAX were then used to grab the data and parse it back out into HTML on the front end.

Lastly, I used [node-mailgun](https://github.com/shz/node-mailgun) in order to email managers when they uploaded a schedule that conflicted with an availability posted by an employee.
=======
UPDATE 12/2015 -- After learning more about Handlebars, it seems like it would an apt fit for this project.  Refactoring this code
is pretty far down on my priorities, but I know now better methods to perform templating that would have been useful here :)

This is a little side project I made after getting tired of having to call in and ask for the schedule for the upcoming week.  Additionally, managers would often not upload the schedule for the next week until late Sunday night, leaving us in limbo as to the schedule for the next week.

Managers can login and upload the schedule for the week in a .xslx file.  I used [SheetJS](https://github.com/SheetJS/js-xlsx) to iterate through the spreadsheet, grab the employee's schedule for the week, and insert the employee data into MongoDB.  jQuery and AJAX were then used to grab the data and parse it back out into HTML on the front end.

Managers can also make edits to the schedule by clicking on the table cells.

The project has been deployed to [Heroku](https://time-to-work.herokuapp.com).  Some screenshots are shown below:

This is what the schedule looks like. Odd/Inconsistent formatting:

![schedule](http://i.imgur.com/Qeq5TPP.png)

Login page via Stormpath API:

![login](http://i.imgur.com/E55cwXM.png)

HomeScreen:

![home](http://i.imgur.com/AmueBRE.jpg)

Schedule Successfully parsed into HTML. Managers can click to make edits:
![main](http://i.imgur.com/USKom68.png)