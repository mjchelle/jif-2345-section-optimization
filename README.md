# TA Section Optimization Project
This is a tool that imports a CSV with information about TAs and filters them based on availability and prioritized criteria chosen by the instructor/coordinator. This product helps organize TAs' availability and weighs the importance of the students' needs against the traits of the TAs. 

# Install Guide
### Pre-requisite
* A laptop with web browsers and terminal
* No internet needed

### Dependent Libraries that must be installed
* Install PHP
* The tutorials for downloading and installing PHP are as follows:
  * Install PHP on Windows: https://www.youtube.com/watch?v=1lxzfBQ0NPo
  * Install PHP on Mac:
    1. install homebrew
    2. Open terminal and run the command "brew install php"
    3. See details at https://www.php.net/manual/en/install.macosx.packages.php
    
### Download Instructions
* Download the package from https://github.com/mjchelle/jif-2345-section-optimization/archive/refs/heads/master.zip

### Installation of Actual Application
* Unzip the downloaded package to the desired directory

### Run Instructions
1. Open terminal
2. Run the command “cd \<directory of the unzipped package\>”
    * For example, if the the package is on desktop, we will run cd Desktop/jif-2345-section-optimization
3. Run the local server by the command “php -S localhost:<post#>” where post# needs to be replaced by 9000/8080, etc. 
    * For example, we can run “php -S localhost:9000” for local post 9000
4. Open a web browser and enter “http://localhost:<post#>/src/mainpage.html”, where post# need to replaced by the number we run for local host.
    * For example, if we run “php -S localhost:9000”, we will enter http://localhost:9000/src/mainpage.html to access the application.

### Troubleshooting
* If you encounter the error message "This site can't be reached", follow these steps:
  1. Check if the local server is running and if it is running in the correct path where the package is downloaded.
  2. Verify that the local post number in the website matches the running server.

# Release Notes
## Version 0.5.0

### Features
* Drag and drop to make sections manually 
* Download functionality to access information 
* Table to list requirements for sections 
* Generating schedule
* Improved UI 


### Bug Fixes
* Fixed manual TA inputs so that rows are added correctly
* Fixed typos and descriptions

### Known Bugs and Defects
* The CSV survey must adhere to a specific format that includes the following fields in a specific order: name, age, GTID, car, availability, and other information.

## Version 0.4.0

### Features
* Addition of php backend connection
* Addition of basic schedule generation algorithm
* Addition of csv output to user's computer
* Main page UI changes

### Bug Fixes
* Fixed sorting buttons sizing issues

### Known Issues
* Possible issues with data being saved between uses.

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
