<?php

namespace app\actions;

use yii\base\Action;

class IndexAction extends Action
{
    public function run(): string
    {
        return $this->controller->render('index');
    }
}
