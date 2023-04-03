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
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  </head>
  <body>
    <header>
      <h1 class="display-3">TA LIST</h1>
    </header>

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
          placeholder="Filter column 2 by..."
        />
        <input
          type="text"
          id="input3"
          onkeyup="findMatch()"
          placeholder="Filter column 3 by..."
        />
        <input
          type="text"
          id="input4"
          onkeyup="findMatch()"
          placeholder="Filter column 4 by..."
        />
        <input
          type="text"
          id="input5"
          onkeyup="findMatch()"
          placeholder="Filter column 5 by..."
        />
      </div>
    </div>

    <footer>
      <div class="left-button">
        <button onclick="goToMainPage()">Back to Main Page</button>
      </div>

      <div class="right-button">
        <button onclick="getScheduleTimes()">Test Schedule</button>
      </div>

      <div class="right-button">
        <button onclick="goToSchedulePage()">View Schedule</button>
      </div>


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