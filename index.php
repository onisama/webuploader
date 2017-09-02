<?php
/**
 * Created by 小白.
 * User: 小白
 * Email: 1254860261@qq.com
 * Date: 2017/9/2
 * Time: 11:17
 */

?>
<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <title>新增图片</title>
    <link href="/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="row cl">
    <label class="form-label col-xs-4 col-sm-2">图片上传：</label>
    <div class="formControls col-xs-8 col-sm-9">
        <div class="uploader-list-container">
            <div class="queueList">
                <div id="dndArea" class="placeholder">
                    <div id="filePicker-2"></div>
                    <p>或将照片拖到这里，单次最多可选300张</p>
                </div>
            </div>
            <div class="statusBar" style="display:none;">
                <div class="progress"> <span class="text">0%</span> <span class="percentage"></span> </div>
                <div class="info"></div>
                <div class="btns">
                    <div id="filePicker2"></div>
                    <div class="uploadBtn">开始上传</div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>