# TA Section Optimization Project
This is a tool that imports a CSV with information about TAs and filters them based on availability and prioritized criteria chosen by the instructor/coordinator. This product helps organize TAs' availability and weighs the importance of the students' needs against the traits of the TAs. 

## Version 0.3.0

### Features
* Addition of functionality to sort columns alphabetically or numerically
* Included buttons to facilitated this sorting
* Addition of functionality to filter the table based on criteria the professor chooses
* Included text boxes to allow for professors to filter columns individually or together
* Cleaned up UI for sorting and filtering

### Bug Fixes
* jQuery loading issue
* CSV with empty cells don't lead to issues

### Known Issues
* Sorting Buttons can be deformed on screens smaller than 1080p
* Individual CSV cells with commas in them can be read as different cells
* Excel files with a hanging empty cell in a new row can be read incorrectly

## Version 0.2.0

### Features
* Addition of the ability to parse the information held in a CSV
* Changes to the main page HTML/CSS
* A new page to display the contents of parsed CSVs
* Add an "Add TA" modal to manually enter TA's information.

### Bug Fixes
The TA List no longer has an overflow issue.

### Known Issues
Entering a CSV with empty cells in the middle of the user's feedback produce an error when shown in the application.

## Version 0.1.0

### Features
* Changes to main page layout
* Changes to traits page layout
* Major CSS implementation and changes
* Addition of Schedule page

### Bug Fixes
N/A

### Known Issues
The TA List page can overflow if too many students are added to it. 
