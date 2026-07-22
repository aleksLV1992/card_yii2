<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';

    /** @var list<string> */
    public $css = [
        'css/game.css',
    ];

    /** @var list<string> */
    public $js = [
        'js/game.js',
    ];

    /** @var list<class-string> */
    public $depends = [
        'yii\web\YiiAsset',
    ];
}
