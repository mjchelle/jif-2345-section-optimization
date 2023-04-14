<?php
function get_html($csv_file)
{
    $html = '<table border="1" id="table">';
    $file = fopen($csv_file, 'r');
    $header_arr = fgetcsv($file);
    $html.='<thead>';
    foreach($header_arr as $k=>$v)
    {
        $html.='<th>'.$v.'</th>';
    }
    $html.='</thead>';

    $html.='<tbody>';

    while($line = fgetcsv($file)) 
    {
        // added a draggable class to all of the table rows - Nnamdi
        $html.='<tr draggable="true" ondragstart="drag(event)">';
        foreach($line as $k=>$v)
        {
            $html.='<td>'.$v.'</td>';
        }
        $html.='</tr>';
    }

    $html.='</tbody>';
    $html.='</table>';
    return $html;
}
?>