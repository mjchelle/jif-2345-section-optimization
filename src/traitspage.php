<?php
    include_once('php/csv.php');
    $display_table = '';
    if(isset($_POST['upload']) && $_POST['upload'] == 'Upload CSV')
    {
        $upload_dir=getcwd().DIRECTORY_SEPARATOR.'/uploads';
        if($_FILES['csv']['error'] == UPLOAD_ERR_OK)
        {
            $tmp_name=$_FILES['csv']['tmp_name'];
            $name=basename($_FILES['csv']['name']);
            $csvfile = $upload_dir.'/'.$name;
            move_uploaded_file($tmp_name, $upload_dir.'/'.$name);
            $display_table = get_html($csvfile);
        }
    }
?>

<!-- for the manual output my idea is to start with a setup that can allow users to drag and drop TAs from the table into a schedule maker.
have it start with a section header they can name, then a space below that to drag and drop the TAs for that section
under that you can have a button to add another section. -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TA List</title>
    <link rel="stylesheet" href="./CSS/traits-style.css" />
    <script src="js/common.js"></script>
    <script src="js/csv_table.js"></script>
    <script src="js/manual_schedule.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  </head>
  <body>
    <header>
      <h1 class="display-3">TA LIST</h1>
    </header>


    <div class="main-list" style="display: table">
        <?php
        if(strlen($display_table) > 0)
        {
            echo $display_table;
        }
        ?>
    </div>

    <div class="sorting-options">
        <div class="sorting-buttons">
            <fieldset>
                <legend>Sort TA's by:</legend>
                <label for="radio-1" class="sortingLabels"
                >Name (first column)
                    <input
                            type="radio"
                            name="radio-1"
                            id="radio-1"
                            class="sort-radio"
                    />
                </label>
                <label for="radio-2" class="sortingLabels"
                >Year (second column)
                    <input
                            type="radio"
                            name="radio-1"
                            id="radio-2"
                            class="sort-radio"
                    />
                </label>
            </fieldset>
        </div>

        <div class="search-boxes">
            <h2>Search TA's:</h2>
            <input
                    type="text"
                    id="nameInput"
                    onkeyup="findMatch()"
                    placeholder="Search for name.."
            />
            <input
                    type="number"
                    id="yearInput"
                    onkeyup="findMatch()"
                    placeholder="Search for year.."
            />
            <input
                    type="text"
                    id="input2"
                    onkeyup="findMatch()"
                    placeholder="Filter GTID by..."
            />
            <input
                    type="text"
                    id="input3"
                    onkeyup="findMatch()"
                    placeholder="Filter drivers by..."
            />
            <input
                    type="text"
                    id="input4"
                    onkeyup="findMatch()"
                    placeholder="Filter section availability by..."
            />
            <input
                    type="text"
                    id="input5"
                    onkeyup="findMatch()"
                    placeholder="Filter extra comments by..."
            />
        </div>
    </div>

    <div class="main-list" style="display: table">
        <?php
        if(strlen($display_table) > 0)
        {
            echo $display_table;
        }
        ?>
    </div>


    <div>
      <button onclick="clearTable()">Clear Table</button>
      <button id="modalBtn">Add TA</button>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <div>
            <h2 class="man-entry">Manual Entry</h2>
            <ul id="entries"></ul>
            <button id="submitBtn" onclick="postManualEntry()">Submit</button>
          </div>
        </div>
    </div>
  </div>


    <div>
          <button onclick="clearTable()">Clear Table</button>
          <button id="modalBtn">Add TA</button>
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <div>
                <h2 class="man-entry">Manual Entry</h2>
                <ul id="entries"></ul>
                <button id="submitBtn" onclick="postManualEntry()">Submit</button>
              </div>
            </div>
          </div>
      </div>

    <div class="section-list" style="display: table">
        <h2>Insert Section Data</h2>
        <h3>For the category "Needs Experience", rank from 1-5, with 5 being the most needed.</h3>
        <button onclick="populateSectionTable(); style.display = 'none'">Insert Data</button>

        <table class="table table-dark table-striped" id="sectiontable">
            <thead>
            <tr>
                <th scope="col">Section</th>
                <th scope="col">Number of Drivers Needed</th>
                <th scope="col">Needs Experienced TA</th>
            </tr>

            </thead>
            <tbody id="table-body"></tbody>
        </table>

       

        <button onclick="submitSectionData()">Submit Data</button>
        <label hidden id="submitMsg">      Data submitted! Click "generate schedule".</label>

    </div>

    <div class="schedule-right" id="right-schedule">
      <div class="single-section">
        <h2>Schedule Output</h2>
        <textarea name="section-textarea" id="text-s-1" rows="10" placeholder="Enter Section Name"></textarea>
        <div class="enter-TA" id="section-1" ondrop="drop(event)" ondragover="allowDrop(event)">
        </div>
      </div>

    </div>
    <div class="section-buttons" id="buttons-div">
        <button id="add-button" onclick="addSection()">Add Section</button>
        <button id="remove-button" onclick="removeSection()">Remove Section</button>
        <button id="export-button" onclick="exportSet()">Export Sections</button>
    </div>

    <!-- <a id="downloadLink" href="#" download="Schedule_Output.txt">Download</a> -->

    <footer id="main-footer">
      <div class="left-button">
        <button onclick="goToMainPage()">Back to Main Page</button>
      </div>

      <div class="right-button">
        <button onclick="getScheduleTimes()">Generate Schedule</button>
      </div>

<!--      <div class="right-button">-->
<!--        <button onclick="goToSchedulePage()">View Schedule</button>-->
<!--      </div>-->


    </footer>

    <script>
      $("#radio-1").click(function () {
        sortTableByName();
      });

      $("#radio-2").click(function () {
        sortTableByYear();
      });
    </script>
  </body>
</html>