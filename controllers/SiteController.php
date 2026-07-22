<?php

namespace app\controllers;

use yii\web\Controller;

/**
 * Site controller with standalone actions
 */
class SiteController extends Controller
{
    /**
     * @return array<string, array{class: class-string}>
     */
    public function actions(): array
    {
        return [
            'index' => [
                'class' => 'app\actions\IndexAction',
            ],
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }
}
