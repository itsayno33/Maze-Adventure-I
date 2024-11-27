<?php
    header("Content-type: text/css");

    $fileurl = '';
    $filetime = date("Y-m-d_H:i:s");
    foreach($_GET as $key => $value) {
        if ($key === "file") {
            $fileurl = $value;
            continue;
        }
        if ($key === "time") {
            $filetime = $value;
            continue;
        }
    }

    $css_url_base = "css/{$fileurl}/";

    $iphone_portrait_file  = "{$css_url_base}{$fileurl}_iphone_portrait.css";
    $iphone_landscape_file = "{$css_url_base}{$fileurl}_iphone_landscape.css";
    $default_file   = "{$css_url_base}{$fileurl}_default.css";
    $common_file    = "{$css_url_base}{$fileurl}_common.css";

    $iphone_portrait_width  = "1000px";
    $iphone_landscape_width = "1000px";
?>

@charset "utf-8";

/* 初期値 */
@import url(<?php echo "\"{$default_file}?time={$filetime}\""; ?>);
/* 
((orientation: portrait)  and (width >= <?php echo "{$iphone_portrait_width}"; ?>)) " 
or ((orientation: landscape) and (width >= <?php echo "{$iphone_landscape_width}"; ?>));
*/


/* iphone 縦 */
@import url(<?php echo "\"{$iphone_portrait_file}?time={$filetime}\""; ?>) 
screen and (orientation: portrait) and (width < <?php echo "{$iphone_portrait_width}"; ?>);


/* iphone 横 */
@import url(<?php echo "\"{$iphone_landscape_file}?time={$filetime}\""; ?>) 
screen and (orientation: landscape) and (width < <?php echo "{$iphone_landscape_width}"; ?>);


/* 共通設定 */
@import url(<?php echo "\"{$common_file}?time={$filetime}\""; ?>);
