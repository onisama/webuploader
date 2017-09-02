/**
 * Created by Administrator on 2017/8/25.
 */
(function($,window) {
    /*定义随机函数*/
    $.GetRandomString = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    /*初始化WeBUpload 编辑器*/
    function initWebUpload(item, options) {
        /*首先验证上传控件是否支持浏览器*/
        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。<a target='_blank' href='http://se.360.cn'>下载页面</a>";
            /*当前浏览器是否支持Console*/
            if (window.console) {
                window.console.log(error);
            }
            $(item).text(error);
            return;
        }
        /*创建默认参数*/
        var defaults = {
            auto: true,
            hiddenInputId: "uploadifyHiddenInputId", // input hidden id
            onAllComplete: function (event) {
            }, // 当所有file都上传后执行的回调函数
            onComplete: function (event) {
            },// 每上传一个file的回调函数
            innerOptions: {},
            fileNumLimit: undefined,//验证文件总数量, 超出则不允许加入队列
            fileSizeLimit: undefined,//验证文件总大小是否超出限制, 超出则不允许加入队列。
            fileSingleSizeLimit: undefined,//验证单个文件大小是否超出限制, 超出则不允许加入队列
            PostbackHold: false
        };
        var opts = $.extend(defaults, options);
        /*合并参数*/
        var hdFileData = $("#" + opts.hiddenInputId);
        /*隐藏的数据*/
        var target = $(item);//容器
        var pickerid = "";
        if (typeof guidGenerator36 != 'undefined')//给一个唯一ID
            pickerid = guidGenerator36();
        else
            pickerid = $.GetRandomString();

        /*HTML 结构开始*/
        var uploaderStrdiv = '<div class="webuploader">';
        /*创建*/
        /*判断是否是自动上传*/
        if (opts.auto) {
            /*自动上传DOM结构创建*/
            uploaderStrdiv +=
                '<div id="Uploadthelist" class="uploader-list"></div>' +
                '<div class="btns">' +
                '<div id="' + pickerid + '">选择文件</div>' +
                '</div>';
        } else {
            /*手动上传DOM结构创建*/
            uploaderStrdiv +=
                '<div  class="uploader-list"></div>' +
                '<div class="btns">' +
                '<div id="' + pickerid + '">选择文件</div>' +
                '<button class="webuploadbtn">开始上传</button>' +
                '</div>'
        }
        /*隐藏部分DOM*/
        uploaderStrdiv += '<div style="display:none" class="UploadhiddenInput" >\
                         </div>'
        uploaderStrdiv += '</div>';
        /*HTML 结构创建完成*/
        target.append(uploaderStrdiv);
        /*完成对容器的初始化创建*/
        var $list = target.find('.uploader-list'), /*获取uploader-list 对象*/
            $btn = target.find('.webuploadbtn'),//手动上传按钮备用
            state = 'pending', /*状态*/
            $hiddenInput = target.find('.UploadhiddenInput'), /*隐藏的数据*/
            uploader;
        /*uploader 上传对象*/
        var jsonData = {
            fileList: []
        };
        /*数据列表*/
        /*var webuploaderoptions = $.extend({
         // swf文件路径
         swf: applicationPath + '/Scripts/lib/webuploader/Uploader.swf',
         // 文件接收服务端。
         server:  '/Home/AddFile',
         deleteServer:'/Home/DeleteFile',
         // 选择文件的按钮。可选。
         // 内部根据当前运行是创建，可能是input元素，也可能是flash.
         pick: '#' + pickerid,
         //不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
         resize: false,
         fileNumLimit: opts.fileNumLimit,
         fileSizeLimit: opts.fileSizeLimit,
         fileSingleSizeLimit: opts.fileSingleSizeLimit
         },
         opts.innerOptions);*/
        var webuploaderoptions = $.extend({
                swf: opts.swf,  //FLASH  swf文件路径
                server: opts.server, /*文件接收服务端。*/
                deleteServer: opts.deleteServer, /*文件删除服务器*/
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#' + pickerid,
                resize: opts.resize, /*不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！*/
                fileNumLimit: opts.fileNumLimit,
                fileSizeLimit: opts.fileSizeLimit,
                fileSingleSizeLimit: opts.fileSingleSizeLimit
            },
            opts.innerOptions);
        var uploader = WebUploader.create(webuploaderoptions);
        /*创建上传对象*/

        /*回调时还原hiddenfiled的保持数据 显示已上传的文件*/
        var fileDataStr = hdFileData.val();
        if (fileDataStr && opts.PostbackHold) {
            jsonData = JSON.parse(fileDataStr);
            $.each(jsonData.fileList, function (index, fileData) {
                var newid = $.GetRandomString();
                fileData.queueId = newid;
                $list.append('<div id="' + newid + '" class="item">' +
                    '<div class="info">' + fileData.name + '</div>' +
                    '<div class="state">已上传</div>' +
                    '<div class="del"></div>' +
                    '</div>');
            });
            hdFileData.val(JSON.stringify(jsonData));
        }
        /*监听文件队列*/
        if (opts.auto) {
            uploader.on('fileQueued', function (file) {
                $list.append('<div id="' + $(item)[0].id + file.id + '" class="item">' +
                    '<span class="webuploadinfo">' + file.name + '</span>' +
                    '<span class="webuploadstate">正在上传...</span>' +
                    '<div class="webuploadDelbtn">删除</div><br />' +
                    '</div>');
                uploader.upload();
                /*启用自动上传函数*/
            });
        } else {
            uploader.on('fileQueued', function (file) {//队列事件
                $list.append('<div id="' + $(item)[0].id + file.id + '" class="item">' +
                    '<span class="webuploadinfo">' + file.name + '</span>' +
                    '<span class="webuploadstate">等待上传...</span>' +
                    '<div class="webuploadDelbtn">删除</div><br />' +
                    '</div>');
            });
        }
        /*创建进度条,上传中*/
        uploader.on('uploadProgress', function (file, percentage) {
            //进度条事件
            var $li = target.find('#' + $(item)[0].id + file.id),
                $percent = $li.find('.progress .bar');
            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<span class="progress">' +
                    '<span  class="percentage"><span class="text"></span>' +
                    '<span class="bar" role="progressbar" style="width: 0%">' +
                    '</span></span>' +
                    '</span>').appendTo($li).find('.bar');
            }

            $li.find('span.webuploadstate').html('上传中');
            $li.find(".text").text(Math.round(percentage * 100) + '%');
            $percent.css('width', percentage * 100 + '%');
        });
        /*上传成功*/
        uploader.on('uploadSuccess', function (file, response) {//上传成功事件
            if (response.state == "error") {
                target.find('#' + $(item)[0].id + file.id).find('span.webuploadstate').html(response.message);
            } else {
                target.find('#' + $(item)[0].id + file.id).find('span.webuploadstate').html('已上传');
                $hiddenInput.append('<input type="text" id="hiddenInput' + $(item)[0].id + file.id + '" class="hiddenInput" value="' + response.message + '" />')
            }


        });
        /*上传失败事件*/
        uploader.on('uploadError', function (file) {
            /*展示上传失败的状态*/
            target.find('#' + $(item)[0].id + file.id).find('span.webuploadstate').html('上传出错');
        });
        /*全部完成事件*/
        uploader.on('uploadComplete', function (file) {
            //全部完成事件,移除所有的进度条
            target.find('#' + $(item)[0].id + file.id).find('.progress').fadeOut();
        });
        /*监听上传时的状态*/
        uploader.on('all', function (type) {
            /*检测是否开始上传*/
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
        //删除时执行的方法
        uploader.on('fileDequeued', function (file) {
            var fullName = $("#hiddenInput" + $(item)[0].id + file.id).val();
            if (fullName != null) {
                $.post(webuploaderoptions.deleteServer, {fullName: fullName}, function (data) {
                    alert(data.message);
                })
            }
            $("#" + $(item)[0].id + file.id).remove();
            $("#hiddenInput" + $(item)[0].id + file.id).remove();
        })
        //多文件点击上传以及暂停上传的方法
        $btn.on('click', function () {
            if (state === 'uploading') {
                uploader.stop();
            } else {
                uploader.upload();
            }
        });
        //删除某个图片触发的事件
        $list.on("click", ".webuploadDelbtn", function () {
            var $ele = $(this);
            var id = $ele.parent().attr("id");
            var id = id.replace($(item)[0].id, "");
            var file = uploader.getFile(id);
            uploader.removeFile(file);
        });
    }
    /*返回上传之后文件路径的数组*/
    $.fn.GetFilesAddress = function (options) {
        var ele = $(this);
        var filesdata = ele.find(".UploadhiddenInput");
        var filesAddress = [];
        filesdata.find(".hiddenInput").each(function () {
            filesAddress.push($(this).val());
        })
        return filesAddress;
    }
    /*powerWebUpload中的参数请参考官网的API，初始化*/
    $.fn.powerWebUpload = function (options) {
        var ele = this;
        if (typeof WebUploader == 'undefined') {
                /*定义CSS文件路径*/
            var csspath = options.csspath;
            $("<link>").attr({ rel: "stylesheet", type: "text/css", href: csspath }).appendTo("head");
                /*定义JS文件路径*/
            var jspath = options.jspath;
            $.getScript(jspath) .done(function() {
                    initWebUpload(ele, options);
                })
                .fail(function() {
                    alert("请检查webuploader的路径是否正确!")
                });
        }
        else {
            initWebUpload(ele, options);
        }
    }
})(jQuery, window);
/*option 参数合并
*{
auto: true,  //是否是自动上传
 csspath,//CSS文件路径
 jspath,//js 文件路径
 hiddenInputId: "uploadifyHiddenInputId", // input hidden id
 onAllComplete: function (event) {
 //所有文件完成后返回要执行的事件
 },
 onComplete: function (event) {
 //每个文件完成后返回要执行的事件
 },
 innerOptions: {},//扩展属性
 PostbackHold: false
 swf: applicationPath + '/Scripts/lib/webuploader/Uploader.swf',//swf文件路径
 server:  '/Home/AddFile',//服务器端接受路径
 deleteServer:'/Home/DeleteFile',//删除操作服务器接受路径
 pick: '#' + pickerid,
 resize: false,//不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
 fileNumLimit: fileNumLimit,//文件数量限制
 fileSizeLimit: fileSizeLimit,//文件大小限制
 fileSingleSizeLimit:fileSingleSizeLimit//单个文件大小限制
 }
* */