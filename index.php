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
    <link href="/webuploader/0.1.5/webuploader.css?t=<?php echo time();?>" rel="stylesheet" type="text/css" />
    <link href="/webuploader/0.1.5/h-ui.min.css?t=<?php echo time();?>" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="row cl">
    <label class="form-label col-xs-4 col-sm-2">缩略图：</label>
    <div class="formControls col-xs-8 col-sm-9">
        <div class="uploader-thum-container">
            <div id="fileList1" class="uploader-list"></div>
            <div id="filePicker1" onclick="SelectFileList(1)">选择图片</div>
            <button id="btn-star1" class="btn btn-default btn-uploadstar radius ml-10">开始上传</button>
        </div>
    </div>
</div>
<div class="row cl">
    <label class="form-label col-xs-4 col-sm-2">缩略图：</label>
    <div class="formControls col-xs-8 col-sm-9">
        <div class="uploader-thum-container">
            <div id="fileList2" class="uploader-list"></div>
            <div id="filePicker2" onclick="SelectFileList(2)">选择图片</div>
            <button id="btn-star2" class="btn btn-default btn-uploadstar radius ml-10">开始上传</button>
        </div>
    </div>
</div>
<!--单张裁剪图片-->
<div class="row cl">
<div id="wrapper">
    <div class="uploader-container">
        <div id="filePicker">选择文件</div>
    </div>
    <!-- Croper container -->
    <div class="cropper-wraper webuploader-element-invisible">
        <div class="img-container"> <img src="" alt="" /> </div>
        <div class="upload-btn">上传所选区域</div>
        <div class="img-preview"></div>
    </div>
</div>
</div>
<div class="row cl">
    <label class="form-label col-xs-4 col-sm-2">缩略图：</label>
    <div class="formControls col-xs-8 col-sm-9">
        <div class="uploader-thum-container uploader-thum-container2">
            <div id="fileList" class="uploader-list"></div>
            <div id="filePicker2"><div class="webuploader-pick">选择图片</div></div>
            <button id="btn-star" class="btn btn-default btn-uploadstar radius ml-10">开始上传</button>
        </div>
    </div>
</div>
<!--多图上传-->
<div class="row cl" >
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
<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js?t=<?php time();?>"></script>
<script type="text/javascript" src="/webuploader/0.1.5/webuploader.min.js?t=<?php time();?>"></script>
<script type="text/javascript" src="/webuploader/0.1.5/MyWebUploader.js?t=<?php time();?>"></script>

<script>
    jspath="/webuploader/0.1.5/webuploader.min.js?t=<?php echo time();?>";
    casspath="/webuploader/0.1.5/webuploader.css?t=<?php echo time();?>";
    SelectFileListId=1;
    function SelectFileList(id){
        SelectFileListId=id;
    }
    $(function(){
        option={
            index:"uploader1",
            fileList:"#fileList1",/*上传的图片放入的容器*/
            starBtn:"#btn-star1",/*手动上传按钮*/
            jspath:jspath,
            casspath:casspath,
            single:true,
            morePic:true,
            cropper:false,
            auto:false,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker1',
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        };
        var uploader=[];
        $("#filePicker1").powerWebUpload(option);
        $("#filePicker2").powerWebUpload($.extend(option,{index:"uploader2",fileList:"#fileList2",starBtn:"#btn-star2",/*手动上传按钮*/pick:"#filePicker2"}));

    })
</script>
</body>
</html>