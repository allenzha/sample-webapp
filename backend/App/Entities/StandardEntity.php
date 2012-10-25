<?php

namespace App\Entities;

/**
 * Created by JetBrains PhpStorm.
 * User: jbrosi
 * Date: 18.07.12
 * Time: 21:59
 * To change this template use File | Settings | File Templates.
 */

class StandardEntity{


    public function toArray() {
        //converts all visible (protected+public) fields to json
        $result = array();

        foreach ($this as $key => $value) {
            $result[$key] = $value;
        }
        return $result;
    }

}