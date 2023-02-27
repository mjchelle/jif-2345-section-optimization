<?php
    include_once('csv.php');
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
    <title>TA List</title>
    <link rel="stylesheet" href="./CSS/traits-style.css" />
    <script src="js/traitspage.js"></script>
  </head>
  <body>
    <header>
      <h1 class="display-3">TA LIST</h1>
    </header>

    <div>
        <button>Clear Form</button>
    </div>
    <div class="main-list" style="display: table">
        <?php
        if(strlen($display_table) > 0)
        {
            echo $display_table;
        }
        ?>
    </div>
    <footer>
      <div class="left-button">
        <button onclick="goToMainPage()">Back to Main Page</button>
      </div>

      <div class="right-button">
        <button onclick="">View Schedule</button>
      </div>
    </footer>
  </body>
</html>