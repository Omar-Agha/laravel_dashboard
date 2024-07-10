<?php

namespace App\Helpers;


class FileUploadHelper
{
    public static function upload_file($file, $path)
    {
        $file_name = time() . '.' . $file->extension();

        $file->move($path, $file_name);

        return $path.'/'. $file_name;
        
    }
}
