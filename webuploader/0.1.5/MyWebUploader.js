/*
*
* (function ($, window){

 })(jQuery, window)
 把事件注入到JQuery,window 里面就
* */
(function ($, window) {
    /*用于储存 Uploader上传图片的数量,可以把单图上传，和多图上传合并到一起*/
    var UpdataLoadarrayObj = new Array();
    /*定义随机函数*/
    $.GetRandomString = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    /*
     * initWebUpload 图片上传
     * */
    function initWebUpload(item, options) {
        /*浏览器不支持WebUploader上传*/
        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。<a target='_blank' href='https://www.baidu.com/s?wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8'>下载页面</a>";
            if (window.console) {
                window.console.log(error);
            }
            $(item).text(error);
            return;
        }
        /*浏览器支持WebUploader上传*/
        var target = $(item);//定义容器
        if(!options.single){
            /*多图上传*/
             UploadMorePicture(item, options);
        }else{
            /*单图上传*/
            if(options.cropper){
                /*支持裁剪*/
                UploadCropperPicture(item, options);
            }else{
                /*不支持裁剪*/
                UploadSinglerPicture(item, options);

            }
        }
    }
    /*上传单张不可裁剪的图片*/
    function UploadSinglerPicture(item, options){
        $list = $(options.fileList);
        $btn = $(options.starBtn);
        state = "pending";/*上传的状态*/
        var  ratio = window.devicePixelRatio || 1
        // 缩略图大小
        var thumbnailWidth = 110 * ratio
        var thumbnailHeight = 110 * ratio
       uploader = WebUploader.create(options);
        uploader.on( 'fileQueued', function( file ) {
            $list = $(options.fileList+SelectFileListId);

            var $li = $(
                    '<div id="' + file.id + '" class="item">' +
                    '<div class="pic-box"><img><img></div>'+
                    '<div class="info">' + file.name + '</div>' +
                    '<p class="state">等待上传...</p>'+
                    '</div>'
                ),
            $img = $li.find('img');
            if(options.morePic){
                $list.append( $li );
            }else{
                $list.html( $li );
            }
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.eq(0).replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.eq(0).attr( 'src', src );
            }, 1, 1 );
            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.eq(1).replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.eq(1).attr( 'src', src );
            }, thumbnailWidth, thumbnailHeight );

        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress-box .sr-only');
            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<div class="progress-box"><span class="progress-bar radius"><span class="sr-only" style="width:0%"></span></span></div>').appendTo( $li ).find('.sr-only');
            }
            $li.find(".state").text("上传中");
            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file ) {
            $( '#'+file.id ).addClass('upload-state-success').find(".state").text("已上传");
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            $( '#'+file.id ).addClass('upload-state-error').find(".state").text("上传出错");
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress-box').fadeOut();
        });
        uploader.on('all', function (type) {
            if (type === 'startUpload') {
                state = 'uploading';
            } else if (type === 'stopUpload') {
                state = 'paused';
            } else if (type === 'uploadFinished') {
                state = 'done';
            }

            if (state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        $btn.on('click', function () {
            if (state === 'uploading') {
                uploader.stop();
            } else {
                uploader.upload();
            }

        });
    }
    /*上传单张可裁剪图片*/
    function UploadCropperPicture(item, options){

    }
    /*上传多张图片*/
    function UploadMorePicture(item, options){
        console.info(options);
    }
    /*清除文件*/
    $.fn.CleanUpload = function (options) {
        var uploadrFile = UpdataLoadarrayObj[$(this).attr("id")]
        var fileslist = uploadrFile.getFiles();
        for (var i in fileslist) {
            uploadrFile.removeFile(fileslist[i]);
        }
    }
    /*获取所有文件的地址*/
    $.fn.GetFilesAddress = function (options) {
        var ele = $(this);
        var filesdata = ele.find(".UploadhiddenInput");
        var filesAddress = [];
        filesdata.find(".hiddenInput").each(function () {
            filesAddress.push($(this).val());
        })
        return filesAddress;
    }
    /*上传文件初始化*/
    $.fn.powerWebUpload = function (options) {
        var ele = this;
        if (typeof WebUploader == 'undefined') {
            var casspath = options.casspath;
            $("<link>").attr({ rel: "stylesheet", type: "text/css", href: casspath }).appendTo("head");
            var jspath = options.jspath;
            $.getScript(jspath).done(function () {
                    initWebUpload(ele, options);
                })
                .fail(function () {
                    alert("请检查webuploader的路径是否正确!")
                });

        }
        else {
            initWebUpload(ele, options);
        }
    }
})(jQuery, window)
/*
* option={
*  swf: applicationPath + '/Scripts/lib/webuploader/Uploader.swf',
*  server: applicationPath + '/MvcPages/WebUploader/Process',
*
* }
*
* */