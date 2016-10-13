var gewara = gewara || {}; gewara.util = {};
var gewa = gewa || {};gewa.string = {};gewa.util = {};
var GewaraUtil = gewara.util,gewaUtil = gewa.util,gewaString = gewa.string;
gewara.util.onReturn = function(event, action) {
  if (!event) event = window.event;
  if (event && event.keyCode && event.keyCode == 13) action();
};
gewara.util.rtime = function(){
	return new Date().getTime();
};
gewara.util.basePath = '/';
gewara.util.httpsPath = 'https://www.gewara.com/';
gewara.util.imgPath = 'http://img5.gewara.com/';
gewara.util.cdnPath = 'http://static5.gewara.com/';
gewara.util.icon = gewara.util.cdnPath + "css/global/pub_icon.png";
gewara.util.retdata={};
gewara.util.retdata.success=true;
gewara.util.member ={};
gewara.util.member.login=false;
gewara.util.member.isMobile = false;
gewara.util.member.headUrl = '';
gewara.util.isNumber = function(str){return /^\d+$/.test(str)};
gewara.util.isWarp = window.screen.availWidth>=1280;
gewa.util.cinemaCityPy = '';
gewara.util.isNotNull = function(v){
	return (!(v.match(/^\s*$/)));
};
gewara.util._isObject = function(obj){
	return obj.toString() === '[object Object]';
};
gewara.util._hasObject = function(obj){
	 obj = obj.toString().indexOf('[object Object]');
	 return obj>=0?true:false;
};
gewara.util.isMobile = function(v) {
  	return (/^(?:13\d|15[0-9]|18[0-9]|17[0-9]|14[0-9])-?\d{5}(\d{3}|\*{3})$/.test(v));
};
gewara.util.isEmail = function(v){
	return (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z]{2,4})$/.test(v));
};
gewara.util.isIdCard = function(v){
	return (/(^\d{15}$)|(^\d{17}([0-9]|[X,x])$)/.test(v));
};
gewara.util.replaceStr = function(el){
	$(el).value = $(el).value.replace(/[^\d]/g,'');
};
gewara.util.isVideoURL = function(v){
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&amp;=+$%-]+: )?[0-9a-z_!~*'().&amp;=+$%-]+@)?" //ftp的user@
	+ "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	+ "|" // 允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\\.)*" // 域名- www.z
	+ "(tudou|youku|56|ku6|qq|sohu|iqiyi|qiyi)\\." // 二级域名
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // 端口- :80
	+ "((/?)|" // a slash isn't required if there is no file name
	+ "(/[0-9a-zA-Z_\\/!~*'().;?:@&amp;=+$,%#-]+)+/?)$";
	return new RegExp(strRegex).test(v);
};
var _debug = function(){
	if('\v' == 'v'){//IE
		alert(arguments);
	}else{
		try{
			console.info(arguments);
		}catch(e){}
	}
};
/**
 *例如：<input type="hidden" name="captchaId" id="captcha1" />
 *则 <img id="captcha1Img" .../>，img的id是上面的id+"Img"
 ***********************/
gewara.util.refreshCaptcha = function(captchaIdField,zt, path){
	if($(captchaIdField+"Img"))$(captchaIdField+"Img").setStyle('background','url('+gewara.util.cdnPath+'css/images/loading2.gif) center center no-repeat');
	var basePath = gewara.util.basePath;
	var httpsPath = gewara.util.httpsPath;
	if(path){
		basePath = path.replace("https", "http") ;
		httpsPath = path;
	}
	//TODO:BAOSHAN TEST,REMOVE
	if($("baoshan_test_001") || !document.location.href.contains("gewara.com") || document.location.href.contains("w137.gewara.com") || document.location.href.contains("m137.gewara.com")){
		var index = basePath.indexOf('://');
		if(index > 0){
			index +=3;
			basePath = basePath.substring(index,basePath.length);
			index = basePath.indexOf('/');
			basePath = basePath.substring(index,basePath.length);
		}
		var indexHttp = httpsPath.indexOf('://');
		if(indexHttp>0){
			indexHttp +=3;
			httpsPath = httpsPath.substring(indexHttp, httpsPath.length);
			indexHttp = httpsPath.indexOf('/');
			httpsPath = httpsPath.substring(indexHttp, httpsPath.length);
		}
	}
	if($(captchaIdField).value==""){//无ID，则产生一个ID
		gewara.util.sendRequest(basePath + "getCaptchaId.xhtml", {"r":gewara.util.rtime()}, function(result){
			if(result.success) {
				$(captchaIdField).value = result.retval;
				var curl = httpsPath + "captcha.xhtml?captchaId=" + result.retval + "&r=" + gewara.util.rtime();
				if(zt) curl =curl + "&zt=" + zt;
				$(captchaIdField+"Img").src = curl;
			}else{
				alert("获取验证码出错，请重新获取！");
			}
		}, 'get');
	}else{
		var curl = httpsPath + "captcha.xhtml?captchaId=" + $(captchaIdField).value + "&r=" + gewara.util.rtime();
		if(zt) curl =curl + "&zt=" + zt;
		$(captchaIdField+"Img").src = curl;
	}
	$(captchaIdField + "Input").value="";
	if($(captchaIdField + "Input").retrieve('label')){
		$(captchaIdField + "Input").retrieve('label').text.innerHTML = "输入验证码";
	}
	$(captchaIdField + "Input").onfocus = null;
};
// js方法里打开新页面
gewara.util.openwin = function(url, target){
	var hiddenForm = new Element("form", {
		target:target,
		action:url,
		method:'post',
		styles: {
			"display":'none',
			"z-index":"-1"
		}
	}).addEvent('submit', function(){hiddenForm.submit();}).inject(document.body);
	hiddenForm.fireEvent('submit');
};
gewara.util.getLength = function(obj){
	var length = 0;
	for (var key in obj){
		if (obj.hasOwnProperty(key)) length++;
	}
	return length;
};

/**
*	该程序验证表单 input 必填域, containerid通常为formID
*	<input type="text" mustTxt="用户名为必填项.">
*/
gewara.util.baseValidForm = function(containerid, isadmin){
	var vv = $(containerid).getElements('*[mustTxt]');
	var baseValid = true;
	try{
		$each(vv, function(i, n){
			var val = $(i).get('value');
			if(!GewaraUtil.isNotNull(val)){
				if(isadmin == 'admin'){
					alert($(i).get('mustTxt'));
				}else if(isadmin == 'member'){
					gewaUtil.alert($(i).get('mustTxt'));
				}else{
					if($(i))$(i).focus();
					if($(i) && $(i).type != 'hidden' && !$(i).match('textarea'))GewaraUtil.showValidateErr(i,$(i).get('mustTxt'));
					else gewaUtil.alert($(i).get('mustTxt'));
				}
				baseValid = false;
				throw "break";
			}
		});
	}catch(e){
		//if(e != "break") throw e;
		return false;
	}
	return baseValid;
};
//错误提示
gewara.util.showValidateErr = function(el,text,point,width){
	el = $(el);
	if(!el){gewaUtil.alert(text);return false;}
	if(el.retrieve('tips') == null){
		el.store('tips',true);
		var newEl = new Element('div',{'styles':{
			'position':'absolute',
			'width':'auto',
			'height':'20px',
			'border':'1px solid #ffcccc',
			'background':'#ffeeee',
			'padding':'0px 5px',
			'color':'#333',
			'z-index':'999',
			'overflow':'hidden'
		}}).inject(document.body);
		new Element('div',{'class':'errmsg','html':text}).inject(newEl);
		newEl.position({
			relativeTo:el,
			position:"leftBottom",
			offset:{x:(el.getParent('label.text'))?-7:0,y:(el.getParent('label.text'))?-2:0}
		});
		//gewa.util.tips(el,'<div class="errmsg">'+text+'</div>',width?width:140,el,point?point:'left');
		//el.focus();
		(function(){
			//if(gewa.util.container[el])gewa.util.container[el].dispose(el);
			newEl.dispose();
			el.store('tips',null);
		}).delay(2600);
	}else{return false;}
};

gewara.util.showErrorMsg = function(elId, data){
	if(!$(elId)) return;
	var hash = new Hash(data);
	hash.each(function(value, key){
	  var el = $(elId).getElement('*[name='+key+']');
	  if(key && el) {
	  		GewaraUtil.showValidateErr(el,value);
	  }
  	});
};

gewara.util.showLoading = function(target){
	if(!$("loadingPic")){
		var picZone = new Element("img",{
			"id":"loadingPic",
			"src":GewaraUtil.cdnPath+"css/home/loading.gif",
			"styles": {
				"display":"block",
				"position":"absolute",
				"top": "0px",
				"left": "0px",
				"visibility":"hidden",
				"padding": "4px",
				"z-index":"401"
			}
		});
		picZone.inject(document.body);
	}
	gewara.util.toCenter("loadingPic", target);
};

gewara.util.hideLoading = function(){
	if($("loadingPic")) $("loadingPic").setStyle("visibility","hidden");
};

gewara.util.showDialog = function(el, zIndex, pin,hide){
	if(!zIndex) zIndex = $(el).getStyle("z-index");
	if(zIndex < 10) zIndex = 200;
	var disabledZone = $("dialogDisabledZone"),
	winSize = $(document.body).getScrollSize();
	if(!disabledZone){
		disabledZone = new Element("div", {
			"id":"dialogDisabledZone",
			"styles":{
				"position": "absolute",
				"z-index": zIndex - 1,
				"left": "0px",
				"top": "0px",
				"background-color":"#000"
			}
		});
		disabledZone.inject($(document.body),"top");
	}
	disabledZone.setStyles({
		"width": winSize.x,
		"height": winSize.y,
		"display":"",
		"visibility":"visible",
		"z-index": zIndex - 1
	});
	disabledZone.setOpacity(0.6);
	$(el).setStyles({
		"position":"absolute",
		"z-index":zIndex,
		"display":"",
		"top":0,
		"left":0,
		"visibility":"visible"
	}).show();
	gewara.util.toCenter(el);
	if(pin) $(el).pin();
};

gewara.util.showAlbumDialog = function(el, zIndex, pin,hide){
	if(!zIndex) zIndex = $(el).getStyle("z-index");
	if(zIndex < 10) zIndex = 200;
	$(document.body).setStyle('overflow','hidden');
	var disabledZone = $("dialogDisabledZone"),
	boxSize = $(document.body).getSize();
	winSize = $(document.body).getScrollSize();
	if(!disabledZone){
		disabledZone = new Element("div", {
			"id":"dialogDisabledZone",
			"styles":{
				"position": "absolute",
				"z-index": zIndex - 1,
				"left": "0px",
				"top": "0px",
				"background-color":"#474747"
			}
		});
		disabledZone.inject($(document.body),"top");
	}
	disabledZone.setStyles({
		"width": winSize.x,
		"height": winSize.y,
		"display":"",
		"visibility":"visible",
		"z-index": zIndex - 1
	});
	$(el).setStyles({
		"position":"absolute",
		"height": boxSize.y,
		"z-index":zIndex,
		"display":"",
		"top":0,
		"left":0,
		"visibility":"visible"
	}).show();
	gewara.util.toCenter(el);
	if(pin) $(el).pin();
};

gewara.util.hideAlbumDialog = function(el){
	if($("dialogDisabledZone")) $("dialogDisabledZone").setStyles({"visibility":"hidden","top":"0px","height":"0px"});
	if($(el)) $(el).setStyles({"display":"none","visibility":"hidden","top":"0px"});
};
gewara.util.hideDialog = function(el){
	if($("dialogDisabledZone")) $("dialogDisabledZone").setStyles({"visibility":"hidden","top":"0px","height":"0px"});
	if($(el)) $(el).setStyles({"display":"none","visibility":"hidden","top":"0px"});
};
gewara.util.toCenter = function(src, target){
	var tar = $(target) || document.body,
	zIndex = $(src).getStyle("z-index");
   if(!zIndex || (zIndex < 10)) zIndex = 100;
   $(src).setStyles({
   	"position":"absolute",
      "z-index":zIndex,
      "visibility":"visible"
   });
   $(src).position({
    relativeTo:tar,
   	position:"center",
   	edge:'center'
   });
};
gewara.util.moveTo = function(src, target, xfloat, yfloat){
	if(!xfloat) xfloat=0;
	if(!yfloat) yfloat=0;
   var zIndex = $(src).getStyle("z-index");
   if(!zIndex || zIndex < 10) zIndex = 100;
   $(src).setStyles({
      "position":"absolute",
      "z-index":zIndex,
      "visibility":"visible"
   });
   $(src).position({
   	relativeTo:$(target),
   	position:"upperLeft",
   	offset:{x:xfloat,y:yfloat}
   });
   return this;
};
gewara.util.moveToMouse = function(src, x, y){
   $(src).setStyles({
      "position":"absolute",
      "z-index":zIndex,
      "visibility":"visible"
   });
   $(src).position({
   	relativeTo:document.body,
   	position:"upperLeft"
   	//offset:{x:xfloat,y:yfloat}
   });
};
/*********************************************************
 * joinChar 将多个select、checkbox这样的多值用 joinChar连接起来
 **********************************************************/
gewara.util.getValues = function(elId, joinChar) {
  if (!$(elId)) return null;
  var values = $(elId).toQueryString().parseQueryString();
  if(!joinChar) return values;
  var hash = new Hash(values),result={};
  hash.each(function(value, key){
	  if(key) result[key] = (value && value.join) ? value.join(joinChar) : value;
  });
  return result;
};
gewara.util.getPostValues = function(elId){
  if (!$(elId)) return null;
  var values = $(elId).toQueryString().parseQueryString();
  return values;
};
/************************************************
 * 设置表单值（根据ID），不考虑MultiSelect，Radio，checkbox
 ************************************************/
gewara.util.setValues = function(data) {
	var hash = new Hash(data);
	hash.each(function(value, key){
	  if(key && $(key)) {
	  		if($(key).getAttribute('type')){
	  			$(key).value = value;
	  		}else if($(key).match('select')){
	  			$(key).getElements('option').each(function(option){
	  				if(option.value == value)option.selected = true;
	  			})
	  		}else{
	  			$(key).innerHTML = value;
	  		}
	  }
  	});
};
gewara.util.updateHtml = function(data, recordid){
  var hash = new Hash(data);
  hash.each(function(value, key){
	  if(key && $(key+"_"+recordid)) $(key+"_"+recordid).set("html", value);
  });
};
/*光标在元素内*/
gewara.util.inArea=function(el, x, y){
	var co = $(el).getCoordinates();
	return x>=co.left && x<=co.right && y>=co.top && y<=co.bottom;
};
/*光标不在元素内*/
gewara.util.outArea=function(el, x, y){
	var co = $(el).getCoordinates();
	return x<co.left || x>co.right || y<co.top || y>co.bottom;
};
gewara.util.show = function(item){
   try{item.show();}catch(e){};
};
gewara.util.hide = function(item){
   try{item.hide();}catch(e){};
};
gewara.util.openWindow = function(url,name,width,height,resizable,scrollbars,status){
   var top=20,left=120,win;
   if(window.screen.height){
      top=(window.screen.height-height)/2
   }
   if(window.screen.width){
      left=(window.screen.width-width)/2
   }
   win=window.open(url,name,"width="+width+",height="+height+",resizable="+(resizable?"yes":"no")+",scrollbars="+(scrollbars?"yes":"no")+",status="+(status?"1":"0")+",top="+top+",left="+left);
   if(win){win.focus();}
   return win;
};

gewara.util.isEmptyObject=function(obj){
	for(var name in obj){return false;}
	return true;
};
gewara.util.sendRequest=function(url, values, callback, vmethod){
	if(typeof values === "object"){
		if(gewara.util.isEmptyObject(values)) vmethod = 'get';
	}
	var myRequest = new Request({
		url: url, method: vmethod||'post',
		onSuccess: function(resText){
			eval(resText);
			if(callback) callback.run(data);
		},
		onFailure: function(res){
			if(callback){
				var data = {"success":false, "msg":"网络请求错误！"};
				if(res.status==403){//无权限
					data.msg = "无权限！";
				}
				callback.run(data);
			}
		}
	});
	myRequest.send({'data':values});
};
gewara.util.sendRequest4Json=function(url, values, callback, vmethod){
	if(typeof values === "object"){
		if(gewara.util.isEmptyObject(values)) vmethod = 'get';
	}
	values.callMethod='ajax';
	var myRequest = new Request.JSON({
		url: url, method: vmethod||'post',
		onSuccess: function(jsonObj){
	    	jsonObj.success = jsonObj.success||(jsonObj.code=="0000");
	    	jsonObj.msg = jsonObj.msg||jsonObj.error;
	    	jsonObj.retval = jsonObj.retval||jsonObj.data;
			if(callback) callback.run(jsonObj);
		},
		onFailure: function(resp){
			if(callback) {
				var data = {"success":false, "msg":"网络请求错误！"};
				if(resp.status==403){//无权限
					data.msg = "无权限！";
				}
				callback.run(data);
			}
		},
		onError: function(text,error){
			var data={"success":false, "msg": "数据格式错误！"};
			if(callback) callback.run(data);
		}
	});
    myRequest.send({'data':values});
}


// 20110520 bob add. sendLoad()模仿JQ的load(), 根据id过滤返回的content.
gewara.util.sendLoad=function(el, url, values, callback, ori, method){
	return gewara.util.sendLoadCore(el, url, values, callback, 'true', ori, method);
};
gewara.util.sendLoadEasy=function(el, url, values, callback, ori, method){
	return gewara.util.sendLoadCore(el, url, values, callback, 'false', ori, method);
};

gewara.util.sendLoadCore = function(el, url, values, callback, iseval, ori, method){
	try{
		var off = url.indexOf("#"),selector = '';
		if(off >= 0){
			selector = url.slice(off+1, url.length);
			url = url.slice(0, off);
		}
		var storeValue = $(ori)?$(ori).retrieve('key'):null;
		var storeJS = $(ori)?$(ori).retrieve('js'):null;
		iseval = iseval || 'true';
		if(storeValue == null){
			new Request.HTML({
				headers:{'Cache-Control': 'no-cache,no-store', 'If-Modified-Since':'0'},
				url: url,
				method: method || 'get',
				evalScripts:false,
				async:true,
				link:'cancel',
				onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript){
					if(selector && responseElements.length != 0){
						var child = new Element("div",{'html':responseHTML}).getElement('*[id='+selector+']');
						responseHTML = child.innerHTML;
					}
					if(responseElements.length == 0){
						if(callback) {
							try{
								eval(responseHTML);
							}catch(e){}
							if(typeof data == 'object'){
								callback.run({"success":false, "html":responseHTML, "json":data});
							}else{
								callback.run({"success":true, "html":responseHTML});
							}
						}
					}else{
						if(el && $(el)){
							$(el).set("html", responseHTML);
							if(iseval == 'true') eval(responseJavaScript);
							$(ori) && $(ori).store('key', responseHTML);
							$(ori) && $(ori).store('js', responseJavaScript);
							if(callback) callback.run({"success":true, "html":responseHTML});
						}else{
							if(callback) callback.run(responseHTML);
						}
					}
				},
				onFailure: function(res){
					if(callback) callback.run({"success":false, "msg":"网络请求错误！"});
				}
			}).send({'data':values});
		}else{
			if(el && $(el)){
				if(storeValue) $(el).set("html",storeValue);
				if(storeJS) eval(storeJS);
				if(callback) callback.run({"success":true, "html":storeValue});
			}else{
				if(callback) callback.run(storeValue);
			}
		}
	}catch(e){}
};

gewara.util.sendLoadXML=function(el, url, values, callback){
	new Request({
		headers:{'Cache-Control': 'no-cache,no-store', 'If-Modified-Since':'0'},
		url: url,
		method: 'get',
		evalScripts:false,
		onSuccess: function(text, xml){
			if(callback) callback.run({"success":true, "html":text, "xml":xml});
		},
		onFailure: function(res){
			if(callback) callback.run({"success":false, "msg":"网络请求错误！"});
		}
	}).send({'data':values});
};

gewara.util.slideIn = function(id){
	var slideElement = $(id);
	var slideVar = new Fx.Slide(slideElement, {
		mode: 'vertical',
		transition: 'sine:in',
		duration: 300
	});
	slideVar.slideIn();
};
gewara.util.removeAllOptions = function(elid){
	var selectel = $(elid);
	selectel.getElements("option").dispose();
};
gewara.util.addOptions = function(elid, dataList, valuefield, textfield){
	var selectel = $(elid),tmpValue, tmpText;
	dataList.each(function(item){
		if(valuefield instanceof Function) tmpValue = valuefield.run(item);
		else tmpValue=item[valuefield];

		if(textfield instanceof Function) tmpText=textfield.run(item);
		else tmpText=item[textfield];

		new Element("option", {"value":tmpValue, "text":tmpText}).inject(selectel);
	})
};

/*** From DWR To This*/
gewara.util._escapeHtml = true;
gewara.util.setEscapeHtml = function(escapeHtml) {
  gewara.util._escapeHtml = escapeHtml;
};
gewara.util._shouldEscapeHtml = function(options) {
  if (options && options.escapeHtml != null) {
    return options.escapeHtml;
  }
  return gewara.util._escapeHtml;
};
gewara.util.escapeHtml = function(original) {
  var div = document.createElement('div');
  var text = document.createTextNode(original);
  div.appendChild(text);
  return div.innerHTML;
};

gewara.util._isHTMLElement = function(ele, nodeName){
	if (ele == null || typeof ele != "object" || ele.nodeName == null) {
    	return false;
  	}
  	if (nodeName != null) {
  		var test = ele.nodeName.toLowerCase();
	   if (typeof nodeName == "string") {
	     return test == nodeName.toLowerCase();
	   }
  	}
  	return true;
};
gewara.util._isArray = function(data) {
  return (data && data.join) ? true : false;
};
gewara.util.addRows = function(ele, data, cellFuncs, options) {
  ele = $(ele);
  if (ele == null) return;
  if (!gewara.util._isHTMLElement(ele, ["table", "tbody", "thead", "tfoot"])) {
    return;
  }
  if (!options) options = {};
  if (!options.rowCreator) options.rowCreator = gewara.util._defaultRowCreator;
  if (!options.cellCreator) options.cellCreator = gewara.util._defaultCellCreator;
  var tr, rowNum;
  if (gewara.util._isArray(data)) {
    for (rowNum = 0; rowNum < data.length; rowNum++) {
      options.rowData = data[rowNum];
      options.rowIndex = rowNum;
      options.rowNum = rowNum;
      options.data = null;
      options.cellNum = -1;
      tr = gewara.util._addRowInner(cellFuncs, options);
      if (tr != null) ele.appendChild(tr);
    }
  }else if (typeof data == "object") {
    rowNum = 0;
    for (var rowIndex in data) {
      options.rowData = data[rowIndex];
      options.rowIndex = rowIndex;
      options.rowNum = rowNum;
      options.data = null;
      options.cellNum = -1;
      tr = gewara.util._addRowInner(cellFuncs, options);
      if (tr != null) ele.appendChild(tr);
      rowNum++;
    }
  }
};

/**
 * @private Internal function to draw a single row of a table.
 */
gewara.util._addRowInner = function(cellFuncs, options) {
  var tr = options.rowCreator(options);
  if (tr == null) return null;
  for (var cellNum = 0; cellNum < cellFuncs.length; cellNum++) {
    var func = cellFuncs[cellNum];
    if (typeof func == 'function') options.data = func(options.rowData, options);
    else options.data = func || "";
    options.cellNum = cellNum;
    var td = options.cellCreator(options);
    if (td != null) {
      if (options.data != null) {
        if (gewara.util._isHTMLElement(options.data)) td.appendChild(options.data);
        else {
          if (gewara.util._shouldEscapeHtml(options) && typeof(options.data) == "string") {
            td.innerHTML = gewara.util.escapeHtml(options.data);
          }
          else {
            td.innerHTML = options.data;
          }
        }
      }
      tr.appendChild(td);
    }
  }
  return tr;
};

gewara.util._defaultRowCreator = function(options) {
  return document.createElement("tr");
};

gewara.util._defaultCellCreator = function(options) {
  return document.createElement("td");
};

gewara.util.removeAllRows = function(ele, options) {
  ele = $(ele);
  if (ele == null) return;
  if (!options) options = {};
  if (!options.filter) options.filter = function() { return true; };
  if (!gewara.util._isHTMLElement(ele, ["table", "tbody", "thead", "tfoot"])) {
    return;
  }
  var child = ele.firstChild;
  var next;
  while (child != null) {
    next = child.nextSibling;
    if (options.filter(child)) {
      ele.removeChild(child);
    }
    child = next;
  }
};


/*  This function is to select all options in a multi-valued <select> */
function selectAll(elementId) {
   $(elementId).getElements("option").each(function(op){op.selected=true;});
}
var PanelGroup = new Class({
   tabList: [],
   initialize: function(vtabList, vcurrent, vactiveClass, vhideClass, vevent,callbcakOptions){
      this.activeClass = vactiveClass||"active";
      this.hideClass = vhideClass||"none";
      this.eventName = vevent||"click";
      this.current = vcurrent||"";
      var ac = this.activeClass, nc = this.hideClass, ve = this.eventName, panel = this;
      if(vcurrent && $(vcurrent)) {
         $(vcurrent).addClass(this.activeClass);
         $(vcurrent + "_content").removeClass(nc);
      }
      this.tableList=vtabList;
      vtabList.each(function(tab,index){
         if($(tab)){
	         $(tab).addEvent(ve, function(){
               if($(panel.current)){
                  $(panel.current).removeClass(ac);
	               $(panel.current+"_content").addClass(nc);
	            }
	           panel.current = tab;
	           $(tab).addClass(ac);
	           $(tab + "_content").removeClass(nc);
	           if(callbcakOptions && $defined(callbcakOptions) && typeof callbcakOptions == 'function')callbcakOptions.call(this,this);
	         })
	      }
      });
   }
});
var ClassGroup = new Class({
   initialize: function(vtabList, vcurrent, vactiveClass, vhideClass){
      this.current = vcurrent||"";
      this.activeClass = vactiveClass||"active";
      this.hideClass = vhideClass||"none";
      this.tableList=vtabList;
      var ac = this.activeClass,panel = this;
      if(vcurrent) $(vcurrent).addClass(ac);
      vtabList.each(function(tab){
         if($(tab)){
            $(tab).addEvent("click", function(){
               if($(panel.current)) $(panel.current).removeClass(ac);
               panel.current = tab;
               $(tab).addClass(ac);
            })
         }
      });
   }
});

/******************
 * 调整图片最大宽度
 ******************/
function resizePicture(picList, maxWidth, galerie, vbasePath, replaceWidth){
	var newHeight=0,newWidth=0,basePath=vbasePath||"/userfiles/",imgsrc='';
	picList.each(function(img){
		Asset.image(img.get('src'), {'styles':{'opacity':0,'position':'absolute','left':0,'top':0},
			onLoad: function(){
				var size = this.getSize();
				if(size.x >= maxWidth){
					if(size.x >= maxWidth || galerie){
						if(img.getParent().tagName != "A"){
							img.inject(new Element("a",{
								"href":img.src.replace(replaceWidth+'/', 'sw600h600/'),
								"rel":"lightbox[galerie]",
								"target":"_blank"
							}).inject(img, "before"));
						}
					}
					if(size.x >= maxWidth && !replaceWidth){
						newHeight = size.y * maxWidth / size.x;
						newWidth = maxWidth;
						img.set("width", newWidth);
						img.set("height", newHeight);
						img.setStyles({"width":newWidth+"px", "height":newHeight+"px"});
					}
					slidePicture();
				}
				this.dispose();
		}}).inject(document.body);
	});
}
function slidePicture(){
	var links = $$("a").filter(function(el) {
		return el.rel && el.rel.test(/^lightbox/i);
	});
	$$(links).slimbox({/* Put custom options here */}, null, function(el) {
		return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
	});
}
function copyToClipboard(theField) {
	var tempval=$(theField);
	if (Browser.Engine.trident){
		tempval.select();
		therange=tempval.createTextRange();
		therange.execCommand("Copy");
		gewaUtil.alert("复制成功。现在您可以粘贴（Ctrl+v）到Blog 或BBS中了。");
		return;
	}else{
		gewaUtil.alert("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
		tempval.select();
	}
}
function stopPropagation(event){
	event.stopPropagation();
}
function getFCKHtml(instance){
	var oEditor = FCKeditorAPI.GetInstance(instance);//获取当前页面 FCK 编辑器实例
	return oEditor.GetXHTML(); //获取编辑器内容
}
function getFCKText(instance, size){
	var oEditor = FCKeditorAPI.GetInstance(instance),
	text = $(oEditor.EditorDocument.body).get("text");
	if(size && text.length > size) return text.substring(0, size);
	return text;
}
function setFCKHtml(instance, vhtml){
	var oEditor = FCKeditorAPI.GetInstance(instance);//获取当前页面 FCK 编辑器实例
	return oEditor.SetHTML(vhtml); //获取编辑器内容
}

function getAndClearFCKElement(instance){
	var oEditor = FCKeditorAPI.GetInstance(instance);
	var vbody = new Element("div", {"html":oEditor.GetXHTML()});
	['script','link','style'].each(function(item){
		vbody.getElements(item).dispose();
	});
	_process(vbody);
	oEditor.SetHTML(vbody.innerHTML);
	return vbody.innerHTML;
}
function _process(el){
	el.removeAttribute("class");
	el.getChildren().each(function(item){_process(item);});
}
function insertFCKHtml(instance, vhtml){
	var oEditor = FCKeditorAPI.GetInstance(instance);//获取当前页面 FCK 编辑器实例
	return oEditor.InsertHtml(vhtml);
}
function refreshPage(){
	var loc="" + document.location.href, idx = loc.indexOf("refresh"), anidx = loc.indexOf("#"), anchor="";
	if(anidx > 0){
		anchor = loc.substring(anidx);
		loc = loc.substring(0, anidx);
	}
	if(idx > 0){
		loc = loc.substring(0, idx - 1);
	}else{
		idx = loc.indexOf("?");
		if(idx > 0){
			loc=loc+"&refresh=1";
		}else{
			loc=loc+"?refresh=1";
		}
	}
	loc += anchor;
	document.location.href = loc;
}
/***********************************
*逐一翻滚代码
***********************************/
var runtopAndBottom = new Class({
	initialize:function(scrollId,maxh){
		this.isPause=false;
		this.maxScroll = $(scrollId).getScrollSize().y-$(scrollId).getSize().y;
		var _this=this, fn = function(){
			if(!_this.isPause){
				_this.fx.start(0, $(scrollId).getScroll().y+maxh);
			}
		};
		this.fx = new Fx.Scroll(scrollId, {
			duration: 500, transition: Fx.Transitions.Sine.easeOut,
			onComplete: function(){
				if($(scrollId).getScroll().y == _this.maxScroll) this.set(0,0);
    		}
		});
		$(scrollId).addEvents({
			"mouseover":function(){_this.isPause = true;},
			"mouseout":function(){_this.isPause = false;}
		});
		fn.periodical(3000);
	}
});
/*********************
 * check Logon Member
 *********************/
function checkLogin(isNeedLogonBox, successCallback, cancleCallback){
	if(!cancleCallback) cancleCallback=function(){};
	if(gewara.util.member.login){
		successCallback();
	}else{
		gewara.util.sendRequest(GewaraUtil.basePath+"ma/common/checkLogon.xhtml",{}, function(result){
			if(result.success){
				gewara.util.member.login = true;
				gewara.util.member.memberid=result.id;
				gewara.util.member.nickname=result.nickname;
				gewara.util.member.isMobile = result.isMobile;
				gewara.util.member.headUrl = result.headUrl;
				successCallback();
			}else{
				showLogin(successCallback, cancleCallback);
			}
		});
	}
}
function gotoPosition(elid){
	if($(elid)) $(window).scrollTo(0,$(elid).getPosition().y);
}
function gotoURL(url, target){
	if(target) document.location.target = target;
	document.location.href = url;
}


var DefaultValue = new Class({
	initialize: function(el, disp){
		if($(el).value.trim()=='') $(el).value = disp;
		$(el).addEvents({
			'blur':function(){
				if(this.value.trim() == "") this.value = disp;
			},
			'focus':function(){
				if(this.value.trim() == disp) this.value="";
			}
		});
	}
});


/**
**添加关注人(项目场馆)
***/
function addMemberTreasure(memberid,tag,obj){
	checkLogin(true, function(){
		var url = GewaraUtil.basePath + "micro/addMicroAttention.xhtml";
		new Request({
			url:url,
			method:'post',
			onSuccess:function(resText){
				eval(resText);
				if(data.success){
					if(tag == 'micro'){
						if($chk(obj)&&$chk(obj.getParent('span')))
							obj.getParent('span').set('text','已关注').addClass('gray');
						else refreshPage();
					}else{
						gewaUtil.alert(data.retval);
					}
				}else{
		 			gewaUtil.alert(data.msg);
				}

			}
		}).send({'data':{'memberid':memberid}});
	});
}


/**
**发表哇啦，一句话点评字数提示
***/
function microChange(obj){
	var num=140;
	if($chk($(obj).value)){
		num = 140-$(obj).value.length;
	}
	if(num<0){
		var value = Math.abs(num);
		$('microText').set('styles',{'color':'#C03B0C'});
		$('microText').set('html','已超出<b style="font-size:15px;font-family: Constantia,Georgia" id="font">'+value+'</b>个汉字');
	}else{
		$('microText').set('styles',{'color':'black'}).set('html','你还可以输入<b style="font-size:15px;font-family: Constantia,Georgia" id="font">'+num+'</b>个字');
	}
}

/**
**判断当前用户是否被管理员加入黑名单
**/
function isCommuBlack(commuid, loc){
	var url = GewaraUtil.basePath+"home/commu/isCommuBlack.xhtml";
	var values = {'commuid':commuid};
	return GewaraUtil.sendRequest(url,values,function(result){
		if(result.success){
			if(loc){window.document.location = loc;}
		}
		else{
		 gewaUtil.alert(result.msg);
		}
	});
}

/**
*	话剧明星 - 成为fans
*/
function addFans(obj, relatedid, tag){
	var url = GewaraUtil.basePath + 'ajax/common/tobeFans.xhtml';
	var values = {'relatedid':relatedid, 'tag':tag};
	GewaraUtil.sendRequest(url, values, function(result){
		if(result.success){
			gewaUtil.alert("已添加成功!");
		}else{
			gewaUtil.alert(result.msg);
		}
	})
	$(obj).removeEvent('click', addFans);
}

/**
**解除好友关系
**/
function removeFriendRelate(memberid){
	if(confirm("解除好友关系从好友列表中删除，确认删除吗？")){
		var url = GewaraUtil.basePath + 'wala/removeFriend.xhtml';
		var values = {'memberid':memberid};
		GewaraUtil.sendRequest(url,values,function(result){
			if(result.success){
				refreshPage();
			}else{
				gewaUtil.alert(result.msg);
			}
		});
	}
}

/***
* 后台使用
*/
gewara.util.successAlert = function(spanid){
	$(spanid).addClass('OkMsg');
	$(spanid).innerHTML = '设置成功！';
	(function(){
		$(this).removeClass('OkMsg');
		$(this).innerHTML = '';
	}.bind(spanid)).delay(3000);
}

var tableDialog = new Class({
	Implements: [Options,Events],
	options:{
		/*parent:'',
		table:'',
		content:''*/
	},
	initialize:function(options){
		this.setOptions(options);
		this.options.table = new Element('table',{'cellspacing':'0','cellpadding':'0','border':'0','width':'100%'});
		var tbody = new Element('tbody').inject(this.options.table);
		var tt = new Element('tr').inject(tbody)
		new Element('td').addClass('dialog_tl').inject(tt);
		new Element('td').addClass('dialog_c').inject(tt);
		new Element('td').addClass('dialog_tr').inject(tt);
		var tr = new Element('tr').inject(tbody);
		new Element('td').addClass('dialog_c').inject(tr);
		this.options.content = new Element('td').inject(tr);
		new Element('td').addClass('dialog_c').inject(tr);
		var tb = new Element('tr').inject(tbody);
		new Element('td').addClass('dialog_bl').inject(tb);
		new Element('td').addClass('dialog_c').inject(tb);
		new Element('td').addClass('dialog_br').inject(tb);
	}
})

// GewaraUtil.mask(id): 覆盖id的遮罩层
// GewaraUtil.unmask(): 取消
gewara.util.mask = function(id,el){
	gewa.util.mask({'element':id,'mid':el || 'mskid_defined_', 'title':'正在提交，请稍等...'});
}

gewara.util.mask2 = function(id,el){
	gewa.util.mask2({'element':id,'mid':el || 'mskid_defined_'});
}

gewara.util.unmask = function(){
	gewa.util.clearMask(arguments[0]);
}


gewa.util.maskContent = function(el,content,title,width,def,callback,bgcolor,dialogBgcolor,isEsc,cancelCallback,initCallback,isPin){/*id,content,z-index*///content可传id
	var w1=(title?title.length*20+100:''),w = content?content.length*12>360?360:content.length*12+20:40,w = w1?w1>w?w1:w:w1;
	gewa.util.core({
		'bgel':$chk(el)?$(el):document.body,//绑定位置
		'content':content,//内容数据
		'title':title || '',
		'width':width || w,
		'def': def || '',
		'callback':callback || $empty,
		'bgcolor':bgcolor || '#fff',
		'dialogBgcolor':dialogBgcolor || '#aaa',
		'isEsc':isEsc || false,
		'cancelCallback':cancelCallback || $empty,
		'initCallback':initCallback || $empty,
		'isPin':isPin || false
	});
}

gewa.util.issure = function(el,content,title,width,def,callback,sureBt,cancelCallback,initCallback,cancelBt){
	var w1=(title?title.length*20+100:''),w = content?content.length*12>360?360:content.length*12+40:40,w = w1?w1>w?w1:w:w1;
	gewa.util.core({
		'bgel':$chk(el)?$(el):document.body,//绑定位置
		'content':content,//内容数据
		'title':title || '',
		'width':width || w,
		'def': def || '',
		'callback':callback || $empty,
		'issure':true,
		'cancelCallback':cancelCallback || $empty,
		'initCallback':initCallback || $empty,
		'sureBt':sureBt || '确定',
		'cancelBt':cancelBt|| '取消'
	});
}

//confirm组件改造
gewa.util.confirm = function(content,callback,el,width,sureBt,cancelBt){
	var w = content.length*16<320?320:content.length*16+60;
	w = w>360?360:w;
	return gewa.util.core({
		'bgel':$chk(el)?$(el):document.body,//绑定位置
		'content':content,//内容数据
		'title':'格瓦拉生活网提示',
		'width':width || w,
		'issure':true,
		'callback':callback,
		'zIndex':600,
		'isConfirm':true,//判断是否为提示类组件
		'opacity':0.4,
		'def':'confirm',
		'sureBt':sureBt || '确定',
		'cancelBt':cancelBt || '取消'
	});
}

//alert组件改造
gewa.util.alert = function(content,callback,el,width,title,sureBt){
	var w = content?content.length*16<320?content.length*16>360?360:320:content.length*16+60:320
	return gewa.util.core({
		'bgel':$chk(el)?$(el):document.body,//绑定位置
		'content':content,//内容数据
		'title':title || '格瓦拉生活网提示',
		'width':width || w,
		'issure':true,
		'callback':callback || $empty,
		'zIndex':601,
		'isAlert':true,//判断是否为提示类组件
		'opacity':0.4,
		'def':'alert',
		'sureBt':sureBt || '确定'
	});
}

//tips提示
gewa.util.tips = function(){/*id,content,width,flagId,z-index*/
	var w = arguments[1]?arguments[1].length*12>360?360:arguments[1].length*12+40:60
	gewa.util.core({
		'bgel':$chk($(arguments[0]))?$(arguments[0]):document.body,//绑定位置
		'content':arguments[1],//显示内容
		'isFlag':false,
		'width':arguments[2] || w,
		'def':arguments[3]?arguments[3]:'tips',//动态标识
		'point':arguments[4] || 'down',
		'callback':arguments[5] || $empty(),
		'zindex':arguments[6]?arguments[4]:300,//显示级别
		'ishide':arguments[7] || 1,//传除1的任意字符串
		'isEsc':arguments[8] || false,
		'size':arguments[9] || 15,
		'tipsBgColor':arguments[10] || '#fff',
		'tipsPtImg':arguments[11] || 'css/home/opt.png'
	});
}
//popo
gewa.util.popo = function(elements,content,width,point,loadCallback,callback){
	content = $(content)?$(content).getElement('.none').get('html'):content;
	var dE = function(el,ts){
		if(loadCallback && typeof loadCallback == "function"){
			loadCallback(el,ts,point,callback);
		}else{
			gewa.util.tips(el,content,width,ts,point,callback);
		}
	}
	elements.each(function(item){
		item.addEvents({
			'mouseenter':function(){
				this.store('isher',true);
				(function(){
					if(this.retrieve('isher') != null){
						var index = elements.indexOf(this);
						if(gewa.util.container['tips_'+index]){
							gewa.util.container['tips_'+index].isAttach = true;
						}else dE(this,'tips_'+index);
					}
				}).delay(200,this);
			},
			'mouseleave':function(){
				var index = elements.indexOf(this);
				this.store('isher',null);
				if(gewa.util.container['tips_'+index]){
					gewa.util.container['tips_'+index].isAttach = false;
					gewa.util.container['tips_'+index].disposeTips.delay(120,['tips_'+index]);
				}
			}
		})
	})
}
gewa.util.container = new Hash();
gewa.util.core = function(optionz){
	var def=optionz.def||"default";
	var recreate=optionz.recreate||true;
	if(gewa.util.container[def] && $defined(gewa.util.container[def]) && gewa.util.container[def].coreDialog) {
		gewa.util.container[def].show(def);
		return false;
	}
	var container = {};
	gewa.util.container[def] = container;
	container.options = $extend({
		def:"default",	//动态生成的标示参数
		content:'',//内容显示（text，html）
		bgel:document.body,//被覆盖的元素
		isFlag:true,//tips使用的时候使用
		ishide:true,//tips是否自动隐藏
		border:1,//可传外框大小
		width:360,//可传整体显示区域大小
		title:'',//如传值，即是带标题的显示区域,
		bgcolor:'#fff',//显示区域的背景颜色
		zIndex:300,
		issrue:false,//是否出现‘确定’和’取消‘的按钮
		callback:$empty,
		cancelCallback:$empty,
		initCallback:$empty,
		sureBt:'确定',
		cancelBt:'取消',
		isConfirm:false,//判断是否为confirm提示类组件
		isAlert:false,//判断是否为alert提示类组件
		point:'up',//提示组件方向
		opacity:0.4,
		tipsBorderColor:'#999',//提示边框
		tipsBgColor:'#fff',//提示背景颜色
		tipsPtImg:'css/home/opt.png',//提示方向提示箭头
		ietipsPtImg:'css/home/opt.gif?v=000',//提示方向提示箭头
		allowmax:960,
		dialogBgcolor:'#aaa',
		isEsc:false,
		isPin:false
	}, optionz || {});
	container.coreDialog = {};
	container.options.bgel = $(container.options.bgel);
	if(container.options.bgel && container.options.bgel.match('body')){
		container.p = container.options.bgel.getScrollSize();
	}else{
		container.p = container.options.bgel.getDimensions();
	}
	container.pos = container.options.bgel.getPosition();
	container.coreDialog = new Element('div',{'styles':{
		'width':'auto',
		'display':'inline-block',
		'height':'auto',
		'opacity':0,
		'position':'absolute',
		'top':0,
		'z-index':container.options.zIndex+1
	}}).inject(document.body);
	container.coreDialog.set('id','self'+container.options.def);
	container.isAttach = true;
	container.coreTable = new Element('table',{'cellspacing':'0','cellpadding':'0','border':'0','width':'100%'}).addClass('tableLayer').inject(container.coreDialog);
	container.coreTbody = new Element('tbody').inject(container.coreTable);
	container.coreTR = new Element('tr').inject(container.coreTbody)
	new Element('td').addClass('t_l').inject(container.coreTR);
	new Element('td').addClass('t_c').inject(container.coreTR);
	new Element('td').addClass('t_r').inject(container.coreTR);
	container.coreTR = new Element('tr').inject(container.coreTbody);
	new Element('td').addClass('m_l').inject(container.coreTR);
	container.coreTD = new Element('td',{'styles':{'padding':1,'background':container.options.dialogBgcolor}}).addClass('m_c').inject(container.coreTR);
	new Element('td').addClass('m_r').inject(container.coreTR);
	container.coreTR = new Element('tr').inject(container.coreTbody);
	new Element('td').addClass('b_l').inject(container.coreTR);
	new Element('td').addClass('b_c').inject(container.coreTR);
	new Element('td').addClass('b_r').inject(container.coreTR);
	if(container.options.isFlag){
		if(container.options.isEsc){
			if($('dailogCoreDisable')){
				$('dailogCoreDisable').setStyles({
					'width':container.p.x+'px',
					'height':container.p.y+'px',
					'top':container.pos.y+'px',
					'left':container.pos.x+'px',
					'background-color':container.options.dialogBgcolor,
					'z-index':container.options.zIndex
				}).show();
			}else{
				new Element('div',{'id':'dailogCoreDisable',styles:{
					'position':'absolute',
					'width':container.p.x+'px',
					'height':container.p.y+'px',
					'top':container.pos.y+'px',
					'left':container.pos.x+'px',
					'z-indent':'9',
					'opacity':container.options.opacity,
					'background-color':container.options.dialogBgcolor,
					'z-index':container.options.zIndex
				}}).inject(document.body);
			}
		}else{
			oldStyle = {
				styles:{//添加封盖区域层
					'position':'absolute',
					'width':container.p.x+'px',
					'height':container.p.y+'px',
					'top':container.pos.y+'px',
					'left':container.pos.x+'px',
					'z-indent':'9',
					'opacity':container.options.opacity,
					'background-color':container.options.dialogBgcolor,
					'z-index':container.options.zIndex
				}
			};
			newStyle = {
				styles:{//添加封盖区域层
					'position':'fixed',
					'width':'100%',
					'height':'100%',
					'top':0,
					'left':0,
					'z-indent':'9',
					'opacity':container.options.opacity,
					'background-color':container.options.dialogBgcolor,
					'z-index':container.options.zIndex,
				    'overflow-y': 'scroll'
				}
			};
			container.coreDisable = new Element('div',oldStyle).inject(document.body);
			container.coreDisable.set('id','parent'+container.options.def);
		}
	}else{//tips使用
		container.tapImg = gewara.util.cdnPath+container.options.tipsPtImg;
		container.ietipsPtImg = gewara.util.cdnPath+container.options.ietipsPtImg;
		container.coreTable.addClass('fixTableLayer');
		container.los = new Element('div',{'styles':{
			'height':(container.options.point == 'up' || container.options.point == 'down')?'15px':'33px',
			'width':(container.options.point == 'up' || container.options.point == 'down')?'33px':'15px',
			'overflow':'hidden',
			'position':'absolute',
			'background':'url('+(!Browser.ie6?container.tapImg:container.ietipsPtImg)+') no-repeat'
		}}).inject(container.coreDialog);
		if(container.options.ishide && container.options.ishide == 1){
			container.coreDialog.addEvents({
				'mouseenter':function(){container.isAttach = true;if(container.options.callback)container.options.callback();},
				'mouseleave':function(){
					container.isAttach = false;
					if(container.options.callback)container.options.callback();
					container.disposeTips.delay(120,[def]);
				}
			})
		}else{
			if(container.options.callback)container.options.callback();
		}
	}
	if(container.options.title){//带有标题的说明（如登陆）
		new Element('h2',{'text':container.options.title?container.options.title:'格瓦拉生活网提示','styles':{
			'height':'42px',
			'line-height':'42px',
			'text-indent':'10px',
			'font-size':'16px',
			'font-weight':'bold',
			'background':'#f0f0f0',
			'width':'100%',
			'display':'block',
			'color':'#333'
		}}).inject(container.options.isFlag?container.coreTD:container.coreDialog);
		if(!container.options.isConfirm && !container.options.isAlert){
			new Element('span',{'styles':{
				'position':'absolute',
				'top':'14px',
				'right':'16px',
				'cursor':'pointer',
				'display':'block',
				'height':'23px',
				'width':'23px',
				'background':'url('+gewara.util.icon+') 0 -142px no-repeat'
			}}).addEvents({
				'click':function(){//添加关闭按钮及事件
					container.options.cancelCallback.call();
					container.dispose(def);
				},
				'mouseenter':function(){this.setStyle('background-position','-23px -142px')},
				'mouseleave':function(){this.setStyle('background-position','0 -142px')}
			}).inject(container.options.isFlag?container.coreTD:container.coreDialog)
		}
	}
	container.content = new Element('div',{'styles':{//内容显示，可以是文本及html代码
		'padding':container.options.isEsc?'':'10px',
		'width':'auto',
		'line-height':'22px',
		'color':'#666',
		'font-size':'12px',
		'font-weight':'normal',
		'background-color':container.options.isFlag?container.options.bgcolor:container.options.tipsBgColor,
		'height':'auto',
		'overflow':'hidden'
	}}).inject(container.coreTD);
	if($(container.options.content))$(container.options.content).show().setStyle('opacity',1).inject(container.content);
	else container.content.innerHTML = container.options.content?container.options.content:'哦，出错了...';
	container.show = function(){
		var args = arguments[0]?arguments[0]:'default';
		if(gewa.util.container[args]){
			gewa.util.show(gewa.util.container[args].coreDialog,function(){
				if(gewa.util.container[args].coreDisable)gewa.util.container[args].coreDisable.show();
			});
		}
	}
	container.getPositionSettings = function(defpos){
		var s = container.options.isFlag?0:container.options.size || 15;
		var d = container.options.isFlag?'center':container.options.point;
		switch(d){
			case "left": case 8: case 9: case 10:
				return{
					edge:{x:'left',y:'top'},
					position:{x:'right',y:'top'},
					offset: {x:s,y:-s}
				};
			case "right": case 2:  case 3: case 4:
				return{
					edge:{x:'right',y:'top'},
					position: {x: 'left', y: 'top'},
					offset: {x:-s,y:-s}
				};
			case "up": case 11: case 12: case 1:
				return{
					edge:{x:defpos?defpos:'left',y: 'bottom'},
					position:{	x:defpos?defpos:'left', y: 'top' },
					offset:{y:-s,x:(!defpos)?(-s):s+10}
				};
			case "down": case 5: case 6: case 7:
				return{
					edge:{x:defpos?defpos:'left',y: 'top'},
					position:{x:defpos?defpos:'left', y:'bottom'},
					offset:{y:s,x:(!defpos)?(-s-5):s+10}
				};
			case "center":
				return{
					edge:{x:'center',y:'center'},
					position:{x:'center', y:'center'},
					offset:{y: 0,x:0}
				};
		};
	}
	container.hide = function(){
		var args = arguments[0]?arguments[0]:'default';
		if(!gewa.util.container[args])return;
		if(gewa.util.container[args]){
			container.morph(gewa.util.container[args],function(){
				if(gewa.util.container[args])gewa.util.container[args].coreDisable.hide();
			});
		}
	}
	container.dispose = function(){
		var args = arguments[0]?arguments[0]:'default',args2 = arguments[1];
		if(!gewa.util.container[args])return;
		if(gewa.util.container[args]){//销毁对象
			container.morph(gewa.util.container[args],function(){
				if(gewa.util.container[args] && $(gewa.util.container[args].options.content))if(args2)$(gewa.util.container[args].options.content).dispose(); else $(gewa.util.container[args].options.content).hide().inject(document.body);
				if(gewa.util.container[args] && gewa.util.container[args].coreDialog)gewa.util.container[args].coreDialog.dispose();
				if($('dailogCoreDisable') && gewa.util.container[args].options.isEsc){
					$('dailogCoreDisable').hide();
				}else{
					if(gewa.util.container[args] && gewa.util.container[args].coreDisable)gewa.util.container[args].coreDisable.dispose();
				}
				gewa.util.container.erase(args);//销毁缓存
			});
		}
	}
	container.morph = function(element,fun){
		if(!element) return;
		if(element.coreDialog){
			var pos = element.coreDialog.getPosition(),wpos = window.getScroll(),wid = element.coreDialog.getDimensions();
			var sk = element.coreFloor.retrieve('key');
			if(sk){
				if(!element.options.bgel.match('body')){
					pos.x = pos.x==0?sk.l:pos.x+wpos.x;
					pos.y = pos.y==0?sk.t:pos.y+wpos.y;
				}
				if(!container.options.isFlag){
					var vp = container.options.bgel.retrieve('vp');
				}
				element.coreDialog.setStyle('overflow','hidden');
				element.coreDialog.set('morph',{
				duration: container.options.isFlag?260:200,
				transition:Fx.Transitions.linear,
				link:'cancel',
				onComplete:function(){
					if(fun && typeof fun == 'function')fun();
				}}).morph({
					'opacity':[1,0],
					'width':[wid.width,0],
					'height':[wid.height,0],
					'top':[container.options.isFlag?pos.y:vp.top-container.coreDialog['h']/2,(!container.options.isFlag)?vp.top:wid.height/2+pos.y],
					'left':[container.options.isFlag?pos.x:vp.left-container.coreDialog['w']/2,(!container.options.isFlag)?vp.left:wid.width/2+pos.x],
					'font-size':[12,4]
				});
				if(element.coreDialog.getElement('table')){
					element.coreDialog.getElement('table').set('morph',{
						duration:300,
						transition:Fx.Transitions.linear,
						link:'cancel'
					}).morph({
						'margin-left':[0,-wid.width/5],
						'margin-top':[0,-wid.height/5],
						'width':[wid.width,wid.width/5],
						'height':[wid.height,wid.height/5],
						'font-size':[12,4]
					});
				}
			}else fun();
		}
	}
	container.disposeTips = function(){
		if(gewa.util.container[this] && !gewa.util.container[this].isAttach)container.dispose(this,true);
	}
	container.sanim = function(){
		var args0 = arguments[0],args1 = arguments[1];
		container.options.counter = { count: args1 };
		var addCount = (function(){
			if(this.count==0){
				if(container.options.callback) container.options.callback();
				container.dispose(def);
				clearInterval(addCount);
			}
			args0.setStyle('width','80px');
			args0.value = container.options.sureBt+'(' + this.count + ')';
			this.count--;
		}).periodical(1000, container.options.counter);
	}

	if(container.options.issure){
		container.buttonBox = new Element('div',{'styles':{'width':'94%','height':'100%','overflow':'hidden'}}).inject(
			new Element('div',{'styles':{
				'height':'32px',
				'padding':'0 0 15px 0',
				'width':'100%',
				'background':'#fff',
				'overflow':'hidden'
			}}).inject(container.options.isFlag?container.coreTD:container.coreDialog))
		if(!container.options.isAlert){
			new Element('input',{'type':'button','value':container.options.cancelBt}).addEvents({
				'click':function(){
					container.options.cancelCallback.call();
					container.dispose(def);
				}
			}).inject(new Element('label',{'styles':{'float':'right','margin':'0 0 0 15px'}}).addClass('bigWhiteBt bigBt button').addEvents({
				'mouseenter':function(){this.addClass('bg_hover');},
				'mouseleave':function(){this.removeClass('bg_hover');}
			}).inject(container.buttonBox));
		}
		container.cancel = new Element('input',{'type':'button','value':container.options.sureBt}).addEvents({
			'click':function(){
				if(container.options.isConfirm && container.options.callback){
					container.options.callback();
					container.dispose(def);
				}else{
					if(container.options.counter){
						container.options.counter.count=0;
					}else{
						if(container.options.callback)
							container.options.callback();
					}
				}
			}
		}).inject(new Element('label',{'styles':{'float':'right'}}).addClass('button redBt bigBt').addEvents({
			'mouseenter':function(){this.addClass('bg_hover');},
			'mouseleave':function(){this.removeClass('bg_hover');}
		}).inject(container.buttonBox));
		if(container.options.isAlert || container.options.isConfirm){
			container.content.setStyles({
				'padding':'20px 20px 20px 60px',
				'background-image':'url('+gewara.util.icon+')',
				'background-repeat':'no-repeat',
				'font-size':'16px',
				'background-position':container.options.isAlert?'6px -742px':'6px -447px'
			})
		}
		if(container.options.isAlert)container.sanim(container.cancel,4);
	}
	//自调节宽度
	container.coreDialog['w'] = container.options.width?container.options.width:container.coreDialog.clientWidth>360?360:container.coreDialog.clientWidth
	container.coreDialog['h'] = container.coreDialog.offsetHeight;
	//弹出效果
	var isbg = '';
	if(!container.options.isFlag)isbg = container.options.tipsBgColor;
	else if(container.options.isAlert || container.options.isConfirm)isbg = '#fff';
	else isbg = container.options.bgcolor;
	var defpos = '';
	if(container.options.point == 'up' || container.options.point == 'down'){
		var defp = container.options.bgel.getPosition(),defw = container.options.bgel.getDimensions(),opl = (window.getSize().x-container.options.allowmax)/2;
		if((defp.x + defw.width + container.coreDialog['w']) > (opl + container.options.allowmax)){
			defpos = 'right';
		}
	}
	container.coreFloor = new Element('div',{'styles':{
		'border':'1px solid #dcdcdc',
		'width':1,
		'height':1,
		'position':'absolute',
		'overflow':'hidden',
		'background-image':(!container.options.isAlert || !container.options.isConfirm)?'':'url('+gewara.util.cdnPath+'css/images/loading.gif)',
		'background-position':'center center',
		'background-repeat':'no-repeat',
		'background-color':isbg,
		'z-index':container.options.zIndex
	}}).inject(document.body).position($extend({
		relativeTo:container.options.bgel
	}, container.getPositionSettings(defpos)));
	container.coreDialog['l'] = container.coreFloor.getPosition().x;
	container.coreDialog['t'] = container.coreFloor.getPosition().y;
	if(container.coreFloor.retrieve('key') == null)container.coreFloor.store('key',{'x':container.coreDialog['w'],'y':container.coreDialog['h'],'t':container.coreDialog['t'],'l':container.coreDialog['l']});
	container.coreDialog.setStyle('width',container.coreDialog['w']);
	container.coreFloor.set('morph',{duration: container.options.isFlag?260:200, transition:Fx.Transitions.linear,link:'cancel',onComplete:function(){
		try{
			container.coreDialog.setStyles({'opacity':1});
			container.coreDialog.position($extend({
				relativeTo:container.options.bgel
			}, container.getPositionSettings(defpos)));
			if(container.options.bgel == document.body && !container.options.isPin && !navigator.userAgent.match(/Windows NT 6.1/i) && !navigator.userAgent.match(/rv:11/i))container.coreDialog.pin();
			//Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; rv:11.0) like Gecko
			container.coreFloor.dispose();
			if(navigator.userAgent.match(/Windows NT 6.1/i) && navigator.userAgent.match(/rv:11/i))(function(){
				container.coreDialog.setStyles({
					top:container.coreDialog['t']-container.coreDialog['h']/2,
					left:container.coreDialog['l']-container.coreDialog['w']/2
				})
			}).delay(10);
			if(container.options.isFlag && (container.options.isEsc || container.options.isAlert || container.options.isConfirm)){
				document.addEvent('keypress',function(event){
					if(event.key == 'esc'){
						container.dispose(def,true);
					}
					if(event.key == 'enter'){
						if(container.options.isConfirm && container.options.callback){
							container.options.callback();
							container.dispose(def);
						}else{
							if(container.options.counter){
								container.options.counter.count=0;
							}else{
								if(container.options.callback)
									container.options.callback();
							}
						}
					}
					document.removeEvent('keypress',arguments.callee);
				})
			}
			container.options.initCallback.call();
		}catch(e){}
	}})

	if(container.options.isFlag){
		container.coreFloor.morph({
			'opacity':[0,1],
			'width':[0,container.options.width?container.options.width:container.coreDialog.clientWidth>360?360:container.coreDialog.clientWidth],
			'height':[0,container.coreDialog.offsetHeight],
			'left':[container.coreDialog['l'],container.coreDialog['l']-container.coreDialog['w']/2],
			'top':[container.coreDialog['t'],container.coreDialog['t']-container.coreDialog['h']/2]
		});
	}else{
		var vp = {};
		vp.chlid = container.options.bgel.getDimensions();
		if(container.options.point == 'left'){
			vp.left = container.coreDialog['l'] + container.coreDialog['w']/2 + 10;
			vp.top = container.coreDialog['t'] + container.coreDialog['h']/2;
			container.los.setStyles({'left':'-9px','top':'12px','background-position':'0 -11px'})
		}else if(container.options.point == 'right'){
			vp.left = container.coreDialog['l'] - container.coreDialog['w']/2 - 10;
			vp.top = container.coreDialog['t'] + container.coreDialog['h']/2;
			container.los.setStyles({'right':'-9px','top':'12px','background-position':'-33px -11px'})
		}else if(container.options.point == 'up'){
			if(defpos == ''){
				container.los.setStyles({'bottom':'-9px','left':'20px','background-position':'-9px -32px'});
				vp.left = container.coreDialog['l'] + container.coreDialog['w']/2;
			}else{
				container.los.setStyles({'bottom':'-9px','right':'20px','background-position':'-9px -32px'});
				vp.left = container.coreDialog['l'] - container.coreDialog['w']/2;
			}
			vp.top = container.coreDialog['t'] - container.coreDialog['h']/2 + defw.y/2;
		}else{
			if(defpos == ''){
				container.los.setStyles({'top':'-9px','left':'20px','background-position':'-13px 0'});
				vp.left = container.coreDialog['l'] + container.coreDialog['w']/2;
			}else{
				container.los.setStyles({'top':'-9px','right':'10px','background-position':'-13px 0'});
				vp.left = container.coreDialog['l'] - container.coreDialog['w']/2;
			}
			vp.top = container.coreDialog['t'] + container.coreDialog['h']/2 + 10;
		}
		container.options.bgel.store('vp',vp);
		container.coreFloor.morph({
			'width':[0,container.options.width?container.options.width:container.coreDialog.clientWidth>360?360:container.coreDialog.clientWidth],
			'height':[0,container.coreDialog.offsetHeight],
			'left':[vp.left,vp.left-container.coreDialog['w']/2],
			'top':[vp.top,vp.top-container.coreDialog['h']/2]
		});
	}
}

gewa.util.mask = function(optionz){
	this.options = $extend({
		mid:'mskid_defined_',
		table:'',
		content:'',
		title:'',
		element:document.body,
		opacity:'0.2',
		zindex:600,
		bgcolor:'#fff'
	}, optionz || {});//arguments
	if($(this.options.element)) this.options.element = $(this.options.element);
	else this.options.element = document.body;
	this.dialog = new Element('div',{'styles':{
		'width':'130px',
		'height':'30px',
		'position':'absolute',
		'z-index':this.options.zindex+1,
		'background':'#eee',
		'padding':'2px',
		'border':'1px solid #aaa'
		}}).inject(document.body);
	this.dialog.set('id',this.options.mid+'maskDialog');
	this.dialog.position({
   	relativeTo:this.options.element,
   	position:"center",
   	edge:'center'
	})
	this.winSize = this.options.element.getScrollSize();
	this.winfacebox = new Element('div',{styles:{
		'position':'absolute',
		'width':this.winSize.x+'px',
		'height':this.winSize.y+'px',
		'top':'0',
		'left':'0',
		'z-indent':'9',
		'opacity':this.options.opacity,
		'background-color':this.options.bgcolor,
		'z-index':this.options.zindex
	}}).inject($(document.body));
	this.winfacebox.set('id',this.options.mid+'winfacebox');
	gewara.util.toCenter(this.winfacebox,this.options.element);
	this.loadUrl = gewara.util.cdnPath+'css/home/load.gif';
	new Element('h2',{'text':this.options.title?this.options.title:'请稍等...','styles':{
		'height':'22px',
		'width':'100%',
		'line-height':'22px',
		'color':'#333',
		'font-size':'12px',
		'font-weight':'normal',
		'text-indent':'8px',
		'background':'#eee',
		'display':'block'
	}}).inject(this.dialog)
	new Element('div',{'styles':{
		'height':'8px',
		'width':'100%',
		'background':'#eee url('+this.loadUrl+') center center no-repeat'
	}}).inject(this.dialog)
}

gewa.util.mask2 = function(optionz){
	this.options = $extend({
		mid:'mskid_defined_',
		table:'',
		content:'',
		title:'',
		element:document.body,
		opacity:'0.4',
		zindex:600,
		bgcolor:'#000',
		height:''
	}, optionz || {});//arguments
	if($(this.options.element)) this.options.element = $(this.options.element);
	else this.options.element = document.body;
	this.dialog = new Element('div',{'styles':{
		'width':'130px',
		'height':'30px',
		'position':'absolute',
		'z-index':this.options.zindex+1
		}}).inject(document.body);
	this.dialog.set('id',this.options.mid+'maskDialog');
	this.dialog.position({
		relativeTo:this.options.element,
		position:"center",
		edge:'center'
	})
	this.winSize = this.options.element.getScrollSize();
	this.winfacebox = new Element('div',{styles:{
		'position':'absolute',
		'width':this.winSize.x+'px',
		'height':this.options.opacity? this.options.opacity : this.winSize.y+'px',
		'top':'0',
		'left':'0',
		'z-index':'9',
		'opacity':this.options.opacity,
		'background-color':this.options.bgcolor,
		'z-index':this.options.zindex
	}}).inject($(document.body));
	this.winfacebox.set('id',this.options.mid+'winfacebox');
	gewara.util.toCenter(this.winfacebox,this.options.element);
	this.loadUrl = gewara.util.cdnPath+'css/images/loading4.gif';
	new Element('div',{'styles':{
		'height':'8px',
		'width':'100%',
		'background':'url('+this.loadUrl+') center center no-repeat'
	}}).inject(this.dialog)
}

gewa.util.clearMask = function(){
	var args = arguments[0] && $defined(arguments[0])?arguments[0]:'mskid_defined_',
		 el = args+'maskDialog',
		 wel = args+'winfacebox';
	if($(el) && $(wel)){
		$(el).set('tween',{duration: 1000,onComplete:function(){
			document.getElements('*[id='+wel+']').dispose();
			document.getElements('*[id='+el+']').dispose();
		}}).tween('opacity','0');
	}
}

//this中带有源this[0]、父类this[1]、和事件this[2]、隐藏函数this[3](callback),移除的函数this[4]
gewa.util.popoFlag = function(e){
	e = new Event(e);
	var minel = this[0],bigel = this[1];
	if(minel != e.target && !minel.hasChild(e.target) && !bigel.hasChild(e.target) && bigel != e.target){
		if(this[3])this[3]();
		document.removeEvents(this[2],this[4]);
	}
}

gewa.util.loadData = function(){//传参顺序,id加载,url路径,value{值类型},callback
	var mid = "T" + Date.now();
	var eId = arguments[0] ? arguments[0] : "";
	GewaraUtil.mask(eId,mid);
	gewara.util.sendLoad(arguments[0], arguments[1], arguments[2], function(){
		GewaraUtil.unmask(mid);
		this(arguments[0]);
	}.bind(arguments[3] && typeof(arguments[3]) == 'function'?arguments[3]:$empty), arguments[4]);
};

gewa.util.dispose = function(){//传参id
	gewa.util.hide(arguments[0],function(){
		this.dispose();
	}.bind($(arguments[0])));
};

gewa.util.hide = function(){//传参顺序id,callback
	var arge = $(arguments[0]);
	if(arge.retrieve('fx') == null){
		var fx = new Fx.Reveal(arge, {duration: 500,transition: 'linear',onComplete:function(){
			if(typeof(this) == 'function')this();
		}.bind(arguments[1]?arguments[1]:this)});
		arge.store('fx',fx);
		fx.dissolve();
	}else{arge.retrieve('fx').dissolve();}
};
gewa.util.show = function(){//传参顺序id,callback
	var arge = $(arguments[0]);
	if(arge.retrieve('fx') == null){
		var fx = new Fx.Reveal(arge, {duration: 500,transition: 'linear',onComplete:function(){
			if(typeof(this) == 'function')this();
		}.bind(arguments[1]?arguments[1]:this)});
		arge.store('fx',fx);
		fx.reveal();
	}else{arge.retrieve('fx').reveal();}
};
gewa.util.shutOpen = function(element,maxH,self,minH){
	var args = $(element),height = maxH,self = $(self),v1='收起',v2='展开';
	if(args){//gewaString.defH为默认高度参数
		if(self){
			if(self.hasClass('shut')){
				self.removeClass('shut');
				self.set('text',self.get('text').replace(v1,v2));
				$(args).tween('height', minH);
				return;
			}else{
				self.addClass('shut');
				self.set('text',self.get('text').replace(v2,v1));
			}
		}
		$(args).tween('height', height);
	}
};

var HoverGroup = new Class({
	Implements: [Options, Events],
	Binds: ['enter','leave','remain'],
	options:{
		//onEnter: $empty,
		//onLeave: $empty,
		elements: [],
		delay: 300,
		start: ['mouseenter'],
		remain: [],
		end: ['mouseleave']
	},
	initialize: function(options) {
		this.setOptions(options);
		this.attachTo(this.options.elements);
		this.addEvents({
			leave: function(){
				this.active = false;
			},
			enter: function(){
				this.active = true;
			}
		});
	},
	elements: [],
	attachTo: function(elements, detach){
		var starters = {}, remainers = {}, enders = {};
		this.options.start.each(function(start) {
			starters[start] = this.enter;
		}, this);
		this.options.end.each(function(end) {
			enders[end] = this.leave;
		}, this);
		this.options.remain.each(function(remain){
			remainers[remain] = this.remain;
		}, this);
		if (detach) {
			elements.each(function(el) {
				el.removeEvents(starters).removeEvents(enders).removeEvents(remainers);
				this.elements.erase(el);
			});
		} else {
			elements.each(function(el){
				el.addEvents(starters).addEvents(enders).addEvents(remainers);
			});
			this.elements.combine(elements);
		}
		return this;
	},
	detachFrom: function(elements){
		this.attachTo(elements, true);
	},
	enter: function(e){
		this.isMoused = true;
		this.assert(e);
	},
	leave: function(e){
		this.isMoused = false;
		this.assert(e);
	},
	remain: function(e){
		if (this.active) this.enter(e);
	},
	assert: function(e){
		$clear(this.assertion);
		this.assertion = (function(){
			if (!this.isMoused && this.active) this.fireEvent('leave', e);
			else if (this.isMoused && !this.active) this.fireEvent('enter', e);
		}).delay(this.options.delay, this);
	}
});
var dwCheckboxes = new Class({
	Implements: [Options],
	options: {
		elements: 'input[type=checkbox]', //checkboxes to use
		mode: 'toggle', //toggle|check|uncheck
		relativ:''
	},
	initialize: function(options) {
		this.setOptions(options);
		document.ondragstart = function () { return false; }
		this.options.elements = $$(this.options.elements);
		this.manage();
	},
	manage: function() {
		var active = 0;
		this.options.elements.each(function(el) {
			el.addEvents({
				'mousedown': function(e) {
					e.stop();
					active = 1;
					el.checked = !el.checked;
				},
				'mouseenter': function(e) {
					if(active === 1) {
						el.checked = ('toggle' == this.options.mode ? !el.checked : 'check' == this.options.mode);
					}
					this.allManager();
				}.bind(this),
				'click': function(e) {
					el.checked = !el.checked;
					active = 0;
					this.allManager();
				}.bind(this)
			});
			var label = $$('label[for=' + el.get('id') + ']');
			if(label.length) {
				label[0].addEvent('click',function() {
					el.checked = !el.checked;
				});
			}
		}.bind(this));
		window.addEvent('mouseup',function() {
			active = 0;
			this.allManager();
		}.bind(this));
	},
	allManager:function(){
		if(this.options.relativ){
			if(this.options.elements.filter(function(ipt){return ipt.checked}).length == this.options.elements.length)this.options.relativ.checked = true;
			else this.options.relativ.checked = false;
		}
	}
});

//String扩展
String.implement({
	'equals':function(object){return (this == object || JSON.encode(this) == JSON.encode(object));}
});
//Element扩展
Element.implement({
	'click': function(fn) {
		return this.addEvent('click',fn);
	},
	hasEvent: function(eventType,fn) {//判断事件
	  var myEvents = this.retrieve('events');
	  return myEvents && myEvents[eventType] && (fn == undefined || myEvents[eventType].keys.contains(fn));
	},
	definedHight:function(callback){
		if(this.retrieve('height') == null)this.store('height',this.getDimensions().y);
		this.setStyles({'height':0,'opacity':0,'display':'block'});
		if(this.retrieve('fx') == null){
			this.set('morph',{
				duration:240,
				transition:Fx.Transitions.linear,
				link:'cancel',
				onComplete:function(){if(callback && typeof callback == 'function')callback();}
			}).morph({height:this.retrieve('height'),opacity:1});
			this.store('fx',true);
		}else this.morph({height:this.retrieve('height'),opacity:1});
	},
	zeroHight:function(){
		this.morph({height: 0,opacity:0});
	},
	hasProperty:function(item){//判断元素属性
		return this.getProperty(item)?true:false;
	},
	toggleDisplay:function(){//隐藏或显示
		if(this.getStyle("display")=="none")
			this.show();
		else
			this.hide();
	},
	PlayPicture:function(src, maxWidth, maxHeight,collback){//项目相册
		var param = {},el = this.getElement('.selected'),self = this,els = this.getElements('.selected');
		if($defined(src) && this.retrieve(src) == null){
			var loadImg = new Element('img',{src: gewara.util.cdnPath+'css/images/loading3.gif','styles':{'top':'46%','left':'46%'}}).inject(this);
			param.img = Asset.image(src, {'styles':{'opacity':0},
				onLoad: function(){
					if(this.width > maxWidth || this.height > maxHeight){
						rateWidth = this.width / maxWidth;
						rateHeight = this.height / maxHeight;
						if(rateWidth > rateHeight){
							param.width = maxWidth;
							param.height = this.height / rateWidth;
						}else{
							param.width = this.width / rateHeight;
							param.height = maxHeight;
						}
					}else{
						param.width = this.width;
						param.height = this.height;
					}
					param.left = (maxWidth - param.width) / 2;
					param.top = (maxHeight - param.height) / 2;
					if(el != null && el != this){
						if(gewa.util.container['pic'])gewa.util.container['pic'].dispose('pic');
						els.removeClass('selected');
						el.morph({height:0,width:0,opacity:0,'left':el.width/2,'top':el.height/2});
					}
					loadImg.dispose();
					this.setStyles({'height':0,'width':0,'left':param.width/2,'top':param.height/2});
					this.addClass('selected').morph({height:param.height,opacity:1,width:param.width,'left':0,'top':0});
					self.morph({height:param.height,width:param.width,'margin-left':param.left,'margin-top':param.top});
					if(typeof(collback) == 'function')collback(true);
				}
			}).inject(this);
			this.store(src,param);
		}else{
			var param = this.retrieve(src);
			el.morph({height:0,width:0,opacity:0,'left':el.width/2,'top':el.height/2});
			if(param != null && $defined(src)){
				if(gewa.util.container['pic'])gewa.util.container['pic'].dispose('pic');
				els.removeClass('selected');
				param.img.addClass('selected').morph({height:param.height,opacity:1,width:param.width,'left':0,'top':0});
				self.morph({height:param.height,width:param.width,'margin-left':param.left,'margin-top':param.top});
			}else{
				if(!gewa.util.container['pic'])gewa.util.maskContent(self,'没有图片了...','',220,'pic');
			}
			if(typeof(collback) == 'function')collback(true);
		}
	},
	hover:function(element,fn,afterCallback,beforeCallback,time,ajaxCallback){//popo提示绑定事件元素
		if(!$(element))return null;
		element = $(element);
		if(element.retrieve('hover') == null){
			var hover = new HoverGroup({
				elements: [this,element],
				delay: $defined(time)?time:300,
				onEnter: function(){
					if(afterCallback && typeof afterCallback == 'function')afterCallback();
					element.definedHight(fn);
					if(ajaxCallback && typeof ajaxCallback == 'function')ajaxCallback();
				},
				onLeave: function(){
					element.zeroHight();
					if(beforeCallback && typeof beforeCallback == 'function')beforeCallback();
				}
			});
			element.store('hover',hover);
			this.store('hover',hover);
		}
	},
	mousehover:function(fn1,fn2) {
		return this.addEvents({
			'mouseenter': function(e) {
				fn1.attempt(e,this);
			},
			'mouseleave': function(e) {
				fn2.attempt(e,this);
			}
		})
	},
	toPos:function(element,point,x,y){//定位到某元素
		x = $defined(x)?x:0;
		y = $defined(y)?y:10;
		this.position({
			relativeTo:element,
			position:point,
			offset: {x:x, y: y}
		});
	},
	autoTips:function(options){
		options = options || {};
		if(document.body.retrieve('autotips') == null){
			var win = {};
			win.child ={};
			win.child.width= options.width;
			win.ispoint = options.ispoint || false;
			win.child.height = window.getSize().y;
			win.o = this.getPosition();
			win.point = "upperRight"
			options.border = options.border || '#cdcdcd';
			win.inject = new Element('div',{
				'styles':{
					'width':win.child.width,
					'height':win.child.height,
					'position':'fixed',
					'bottom':0,
					'left':0,
					'opacity':0,
					'overflow':'hidden',
					'background':options.bgColor,
					'z-index':100,
					'border-left':'1px solid '+options.border
				}
			}).inject(document.body);
			win.html = new Element('div',{'styles':{'width':win.child.width-1,'height':'100%','overflow':'hidden','border-left':'1px solid #ffffff'}}).inject(win.inject);
			if(!win.ispoint){
				win.pl = new Element('div',{
					'styles':{
						'width':'16px',
						'height':options.ch || '22px',
						'border-width':'1px 0',
						'border-style':'solid',
						'border-color':options.plborder || options.border,
						'position':'absolute',
						'z-index':options.plIndex || 101,
						'display':'none',
						'background':options.plBgcolor || options.bgColor
					}
				}).inject(document.body);
			}
			window.addEvents({
				"scroll":function() {
					var st = document.getScroll().y, winh = window.getSize().y;
					if (!window.XMLHttpRequest)win.inject.setStyles({"top":st,'position':'absolute'});
				},
				'resize':function(){
					win.child.height = window.getSize().y;
					win.inject.setStyle('height',window.getSize().y);
				}
			});
			win.property = {};
			win.property.content = function(content,el,callback){
				win.html.innerHTML = $(content)?$(content).innerHTML:content;
				win.property.go(el);
				if(callback && typeof callback == 'function')callback();
			};
			win.pos = win.inject.getPosition();
			win.isAttach = false;
			win.property.go = function(el){
				options.el = el;
				var w = !win.ispoint?10:0;
				win.inject.setStyle('left',el.getPosition().x + el.getDimensions().x + w);
				if(!win.ispoint){
					win.pl.position({
						relativeTo:el,
						position:win.point,
						offset: {x:-5,y:0}
					});
				}
			};
			win.isHide = function(){
				return win.isAttach;
			};
			win.inject.addEvents({
				'mouseenter':function(){win.isAttach = true;if(options.clazz && options.el)options.el.addClass(options.clazz);},
				'mouseleave':function(){
					win.isAttach = false;
					win.hide.delay(120,[options.clazz]);
				}
			});
			win.show = function(){
				win.inject.morph({
					'width':win.child.width,
					'opacity':1,
					onComplete:function(){
						win.isAttach = true;
						if(document.getElements('select').length>0 && !window.XMLHttpRequest)document.getElements('select').hide();
						if(!win.ispoint)win.pl.show();
						if(options.clazz && options.el)options.el.addClass(options.clazz);
					}.bind(win.inject)
				});
			};
			win.hide = function(){
				if(!win.isAttach){
					if(!win.ispoint)win.pl.hide();
					win.inject.morph({
						'width':0,
						'opacity':0,
						onComplete:function(){
							win.isAttach = false;
							if(document.getElements('select').length>0 && !window.XMLHttpRequest)document.getElements('select').show();
							if(options.clazz && options.el)options.el.removeClass(options.clazz);
						}.bind(win.inject)
					});
				}
			};
			document.body.store('autotips',win);
			return win;
		}else return document.body.retrieve('autotips');
	}
});
var Widget = new Class({
    Implements: [Class.Occlude],
    initialize: function(element){
      if (this.occlude('widget', element)){
      	return this.occluded;
      }
    }
});
var Collapsable = new Class({
	Extends: Fx.Reveal,
	initialize: function(clicker, section,obj,objectFun, options) {
		this.clicker = $(clicker);
		this.section = $(section);
		this.f = objectFun;
		this.parent(options);
		this.obj = obj;
		this.addEvents();
	},
	addEvents: function(){
		this.clicker.addEvent('click', function(e){
			var self = $(e)?$(e):$(e.target);
			if(!self.hasClass('AC'))self = self.getParent('.AC');
			if($defined(this.obj) && this.obj != null){
				checkLogin(true, function(){
					var sum = this.obj.elements.indexOf(self);
					this.obj.options.count = sum;
					this.element = this.obj.loadElements[sum];
					this.obj.replay();
					if(self.retrieve(self.get('lang')) == null){
						this.obj.getReplay(self,this.obj.loadElements[sum].getElement('ul').getNext('._replayList'),self.get('id'));
					}
					if(typeof(this.f) == 'function')this.f();
					this.toggle();
				}.bind(this));
			}else{
				this.element = this.section;
				if(typeof(this.f) == 'function')this.f();
				this.toggle();
			}
		}.bind(this));
	}
});
var modifyDefiend = new Class({
	Extends: Fx.Reveal,
	initialize: function(clicker, options) {
		this.selectSwitchDis = $$('select'+clicker);
		this.radioSwitchDis = $$('input'+clicker);
		this.parent(this.section,options);
		if(this.options.address && $(this.options.address))this.address = $(this.options.address);
		this.elementTo = $(this.options.to);
		this.cookieCitycode = this.options.cookieCitycode
		this.select();
		this.radio();
	},
	addEvents: function(filter,flag){
		if(filter.get('lang') == null || filter.get('lang') == ''){
			if(this.elementTo.getElement('div'))this.elementTo.getElement('div').show();
			this.elementTo.getElement('input[type="radio"]').checked = true;
			if($defined(this.dialog) && this.dialog != null){
				this.hide();
				this.clearChoice();
			}
		}else{
			this.elementPlugs(filter);
			this.element = this.dialog;
			gewa.util.mask({'element':this.elementTo,'title':'正在加载,请稍候...'});
			this.selection(filter,flag);
			this.update(filter.get('lang'),function(){
				this.loadElement.getElements("input[type='text']").each(function(item){
					if(!$('myScript'+item.get('name'))){
						var self = this,date = new Date();
						new Asset.javascript(gewara.util.basePath+'activity/getConst.xhtml?citycode='+this.cookieCitycode+'&tag='+filter.get('lang')+'&v='+date.getMilliseconds(), {
						    id: 'myScript'+item.get('name'),
						    onLoad: function(){
						      self.autoChoice(filter,item);
						    }
						});
					}else{
						this.autoChoice(filter,item);
					}
				}.bind(this));
			}.bind(this));
			this.reveal();
		}
		if(this.choice && this.elementTo){
			this.choice.store('relatedid',null);
			this.choice.store('categoryid',null);
			this.elementTo.store('relatedid',null);
			this.elementTo.store('categoryid',null);
		}
		OverText.update();
	},
	autoChoice:function(filter,item){
		var tokens = eval(filter.get('lang')+item.get('lang'));
		new Autocompleter.Local(item, tokens, {
			'delay': 100,
			'maxChoices': 10,
			'ipt':item,
			'relatedFun':this.objectRelated.bind(this),
			'filter': function() {
				var values = this.queryValue.split(/ +/);
				return this.tokens.filter(function(token){
					var result = values.every(function(v){
						var reg = new RegExp(v.escapeRegExp(),'i');
						return reg.test(token.skey);
					});
					return result;
				});
			},
			'injectChoice': function(choice){
				modifyPlug(this,choice,item.get('name'),item.get('lang'));
			},
			addChoiceEvents: function(el) {
				return el.addEvents({
					'mouseover': this.choiceOver.bind(this, [el]),
					'click': this.choiceSelect.bind(this, [el])
				});
			}
		});
	},
	selection:function(filter,flag){
		this.elementTo.getElement('div').hide();
		this.clearChoice();
		this.elementTo.getElements('input[type="radio"]').each(function(item){
			this.showChoice.show();
			if(item.value.trim() == filter.get('lang').trim()){
				item.checked = true;
				new Element('span',{'text':'请选择关联的'+item.get('title'),'styles':{'padding-right':'8px','cursor':'pointer'}}).inject(new Element('span').addClass('releBt releHover').addEvent('click',function(){
					this.addEvents(item,false);
					this.dialog.show();
				}.bind(this)).inject(this.showChoice));
				if(!flag){
					new Element('img',{'src':gewara.util.cdnPath+'css/images/blank.gif'}).addEvent('click',function(){
						this.elementTo.getElement('input[type="radio"]').checked = true;
						this.elementTo.getElement('div').show();
						this.dialog.hide();
						this.clearChoice();
						if(this.address){
							this.address.value = "";
							this.address.fireEvent('blur',[this.address]);
						}
						item.checked = "";
						OverText.update();
					}.bind(this)).inject(new Element('span',{'text':item.getParent().get('text')}).inject(new Element('span',{'class':'releBt releHover'}).inject(this.showChoice,'top')));
				}
				GewaraUtil.unmask();
			}else{item.checked='';}
		}.bind(this));
		OverText.update();
	},
	create:function(filter){
		this.dialog = new Element('div',{'class':'plugpanel','styles':{'width':'600px','display':'none','visibility':'visible'}}).inject(document.body);
		this.inner = new Element('div',{'class':'inner'}).inject(this.dialog);
		new Element('img',{'src':gewara.util.cdnPath+'css/home/min_pt.gif','styles':{'position':'absolute','top':'-5px','left':'20px'}}).inject(this.inner);
		this.close = new Element('span',{'class':'more','styles':{
			'background':'url('+gewara.util.cdnPath+'css/home/del.gif) no-repeat',
			'width':'10px',
			'height':'10px',
			'display':'inline-block',
			'top':'10px',
			'cursor':'pointer'
		}}).addEvent('click',function(){
			this.dialog.hide();
			this.choice.empty();
			if(Browser.ie6)document.getElements('select').fade(1);
		}.bind(this)).inject(this.inner);
		this.loadElement = new Element('div').inject(this.inner);
		new Element('span',{'class':'gr-r'}).inject(new Element('span',{'class':'gr-l'}).inject(new Element('div',{'class':'line mt10'}).inject(this.inner)),'after');
		this.choice = new Element('dd').inject(new Element('dl',{'class':'ui_80 clear relePlugs mt10'}).inject(this.inner));
		new Element('b',{'text':'你已选择'}).inject(new Element('dt').inject(this.choice,'before'));
		this.footer = new Element('div',{'class':'plugFooter mt10'}).inject(this.inner);
		this.sure = new Element('label',{'class':'button redBt minBt ml20'}).addEvents({
			'mouseenter':function(){this.addClass('hover')},
			'mouseleave':function(){this.removeClass('hover');},
			'click':function(){
				this.confirmChoice('relatedid','categoryid');
			}.bind(this)
		}).inject(this.footer);
		new Element('input',{'type':'button','value':'确认，添加'}).inject(this.sure);
		this.cancel = new Element('label',{'class':'button whiteBt minBt ml10'}).addEvents({
			'mouseenter':function(){this.addClass('hover')},
			'mouseleave':function(){this.removeClass('hover');},
			'click':function(){
				this.choice.empty();
				this.dialog.hide();
				if(Browser.ie6)document.getElements('select').fade(1);
			}.bind(this)
		}).inject(this.footer);
		new Element('input',{'type':'button','value':'取消'}).inject(this.cancel);
		this.dialog.toPos(this.elementTo,'bottomLeft',0,0);
		var object = {'dialog':this.dialog,'close':this.close,'loadEm':this.loadElement,'choice':this.choice,'sure':this.sure,'cancel':this.cancel};
		this.dialog.store(filter.get('lang'),object);
	},
	elementPlugs:function(filter){
		if(!$defined(this.dialog) && this.dialog == null){
			this.create(filter);
		}else{
			if(this.dialog.retrieve(filter.get('lang')) != null){
				var obj = this.dialog.retrieve(filter.get('lang'));
				this.dialog = obj.dialog;
				this.close = obj.close.addEvent('click',function(){
					this.dialog.hide();
				}.bind(this));
				this.loadElement = obj.loadEm;
				this.choice = obj.choice;
				this.sure = obj.sure.addEvent('click',function(){
					this.confirmChoice('relatedid','categoryid');
				}.bind(this));
				this.cancel = this.cancel.addEvent('click',function(){
					this.dialog.hide();
				}.bind(this));

			}else this.create(filter);
		}
	},
	select:function(){
		this.selectSwitchDis.addEvent('change',function(e){
			if(this.dialog)this.dialog.hide();
			this.addEvents($(e.target).getElements('option').filter(function(item){
				return item.get('selected');
			})[0],true);
		}.bind(this));
	},
	radio:function(){
		this.radioSwitchDis.addEvent('click',function(e){
			if($(e.target).checked = true)this.addEvents($(e.target),false);
		}.bind(this));
	},
	clearChoice:function(){
		if(this.elementTo.getElements('div.relePlugs').length > 0){
			this.showChoice = this.elementTo.getElement('div.relePlugs');
			this.showChoice.hide().empty();
		}else{
			this.showChoice = new Element('div',{'class':'relePlugs clear'}).inject(this.elementTo,'bottom');
		}
		if(Browser.ie6)document.getElements('select').fade(0);
	},
	update:function(obj,objFun){
		var url = gewara.util.basePath+'ajaxLoadUserFav.xhtml';
		var values = {'tag':obj, 'citycode':this.cookieCitycode};
		if(this.loadElement.retrieve(obj) == null){
			GewaraUtil.sendLoad(this.loadElement, url, values, function(){
				objFun();
				this.loadElement.store(obj,this.loadElement.get('html'));
				this.switchobject();
				gewaUtil.textOver('.text');
			}.bind(this));
		}else{
			this.loadElement.innerHTML = this.loadElement.retrieve(obj);
			objFun();
			this.switchobject();
			gewaUtil.textOver('.text');
		}
	},
	switchobject:function(){
		var self = this;
		this.loadElement.getElements('a').addEvent('click',function(e){
			e.preventDefault();
			var val = {'rel':this.get('rel'),'id':this.get('id'),'name':this.get('name'),'text':this.get('text'),'address':this.get('config')?this.get('config'):''};
			self.objectRelated(val);
		});
	},
	objectRelated:function(val,flag,lang){
		if(!this.choice)return;
		var self = this;
		if(this.choice.retrieve(val.rel) == null){
			var hideInput = new Element('span').addClass('releBt releHover _plugC').inject(flag?this.showChoice:this.choice);
			if(self.address && val.address != '' && val.address != null){
				self.address.value = val.address;
				self.address.fireEvent('focus',[self.address]);
			}
			var category = new Element('input',{'type':'hidden','name':val.rel,'value':val.id}).inject(new Element('img',{'src':gewara.util.cdnPath+'css/images/blank.gif'}).addEvent('click',function(){
				if(self.address && val.rel == "relatedid"){
					self.address.value = "";
					self.address.fireEvent('blur',[self.address]);
				}
				self.choice.store(val.rel,null);
				self.elementTo.store(val.rel,null);
				if(lang == '' && self.showChoice.getElements('._plugC').length<2){
					self.elementTo.getElement('input[type="radio"]').checked = true;
					self.elementTo.getElement('div').show();
					self.dialog.hide();
					OverText.update();
					self.clearChoice();
				}
				this.getParent('.releBt').dispose();
				if(self.elementTo.retrieve('relatedid') == null && self.elementTo.retrieve('categoryid') == null){self.showChoice.getLast().show();}
			}).inject(new Element('span',{'text':val.text}).inject(hideInput)),'before');
			if(val.rel == 'categoryid')new Element('input',{'type':'hidden','name':'category','value':val.name}).inject(category,'before');
			self.choice.store(val.rel,hideInput);
			if(flag){
				self.elementTo.getElement('.releBt').hide();
				self.elementTo.store(val.rel,hideInput);
			}
		}else{
			var me = self.choice.retrieve(val.rel).getElement('span'),son = me.getElements('input'),next = son.getNext();
			me.set('text',val.text);
			son.each(function(input){
				if(input.name == 'category')input.value = val.name;
				else if(input.name == 'categoryid')input.value = val.id;
				else input.value = val.id;
				input.inject(me);
			})
			next.inject(me);
		}
	},
	confirmChoice:function(rel,cat){
		var mp = $('plugChoose'),showEl = $('plug_show');
		this.elementTo.store(rel,this.choice.retrieve(rel));
		this.elementTo.store(cat,this.choice.retrieve(cat));
		if(this.choice)this.choice.getElements('._plugC').inject(this.showChoice.getElement('.releBt'),'after');
		if(this.elementTo.retrieve(rel) == null && this.elementTo.retrieve(cat) == null)this.showChoice.getLast().show()
		else this.showChoice.getLast().hide();
		this.dialog.hide();
		if(Browser.ie6)document.getElements('select').fade(1);
	},
	reset:function(filter){
		if(filter.lang != ''){
			this.selection(filter,true);
			this.create(filter);
		}
		var val = {'rel':filter.rel,'id':filter.id,'name':filter.name,'text':filter.text,'address':filter.get('config')};
		this.objectRelated(val,true,filter.lang);
	}
});

gewa.util.removeBodyClick = function(element,self,callback){
	element = $(element);
	document.addEvent('click',function(e){
		var target = $(e.target);
		if(target != element && !element.contains(target) && target != self && !self.contains(target)){
			document.removeEvent('click',arguments.callee);
			element.hide();
			if(callback)callback();
		}
	});
};
(function() {
	var walkUntil = function(element, walk, match, nocash) {
		var el = element[walk];
		var elements = [];
		while (el) {
			if (el.nodeType == 1) {
				if (!match || Element.match(el, match)) {
					break;
				} else {
					elements.push(el);
				}
			}
			el = el[walk];
		}
		return new Elements(elements, { ddup: false, cash: !nocash });
	};
	var walkUtil = function(element,match,count){
		var i=0;
		var elements = [];
		while(i<count){
			elements.push(element.getElements(match)[i]);
			i++;
		}
		return new Elements(elements, {ddup: false});
	};
	Element.implement({
		getAllPreviousUntil: function(match, nocash) {
			return walkUntil(this, 'previousSibling', match, nocash);
		},
		getAllNextUntil: function(match, nocash) {
			return walkUntil(this, 'nextSibling', match, nocash);
		},
		getParentsUntil: function(match, nocash) {
			return walkUntil(this, 'parentNode', match, nocash);
		},
		getElementsByCount:function(tag,count){
			return walkUtil(this,tag,count);
		}
	});
})();
Fx.implement({
	initStyles: function() {
		this.init = {};
		$A(arguments).each(function(a) {
			if(a == 'opacity') this.init['opacity'] = this.element.get('opacity');
			else (this.element.getStyle(a).test('px')) ? this.init[a] = this.element.getStyle(a).toInt() : this.init[a] = this.element.getStyle(a);
		}, this);
		return this;
	},
	removeAuto: function() {
		if(!this.init) this.init = {};
		$A(arguments).each(function(a) {
			if(this.element.getStyle(a) == 'auto') {
				this.element.setStyle(a, '0px');
				this.init[a] = 0;
			}
		}, this);
		return this;
	},
	setPosition: function() {
		if(this.element.getStyle('position') == 'static') this.element.setStyle('position', 'relative');
		return this;
	}
});
Fx.Toggle = new Class({
	Extends: Fx.Tween,
	initialize: function(element, options) {
		this.parent(element, options);
		this.initStyles('height', 'width', 'opacity');
		this.element.setStyle('overflow', 'hidden');
	},
	toggleHeight: function(ckh,callback) {
		var doms = this.element.getChildren().getDimensions(),domh = this.init.height;
		ckh = ckh || 0;
		if(domh == ckh && doms.length > 0)doms.each(function(item){domh = item.y + domh;});
		domh = domh=='auto'?ckh:domh;
		(this.element.getStyle('height').toInt() > ckh) ? this.start('height', ckh) : this.start('height', domh);
		if(callback && typeof(callback) == 'function')callback();
		return this;
	},
	toggleHeightValue:function(ckh){
		ckh = ckh || 0;
		this.start('height', ckh);
		return this;
	},
	toggleWidth: function() {
		(this.element.getStyle('width').toInt() > 0) ? this.start('width', 0) : this.start('width', this.init.width);
		return this;
	},
	toggleOpacity: function() {
		(this.element.getStyle('opacity').toInt() > 0) ? this.start('opacity', 0) : this.start('opacity', this.init.opacity);
		return this;
	},
	toggleDisplay: function() {
		this.toggleProperty('display', 'none', 'block');
		return this;
	},
	toggleVisibility: function() {
		this.toggleProperty('visibility', 'hidden', 'visible');
		return this;
	},
	toggleStyle:function(){

	},
	toggleProperty: function(property, from, to, fx) {
		if($string(from) && $string(to)) {
			if(!fx)
				(this.element.getStyle(property) == from.toLowerCase()) ? this.element.setStyle(property, to) : this.element.setStyle(property, from);
			else
				(this.element.getStyle(property) == from.toLowerCase()) ? this.start(property, to) : this.start(property, from);
		}
		else if($int(from) && $int(to)) {
			if(!fx)
				(this.element.getStyle(property).toInt() == from) ? this.set(property, to) : this.set(property, from);
			else
				(this.element.getStyle(property).toInt() == from) ? this.start(property, to) : this.start(property, from);
		}
		return this;
	},
	toggle: function(property) {
		switch(property){
			case 'height': this.toggleHeight();
						break;
			case 'width': this.toggleWidth();
						break;
			case 'opacity': this.toggleOpacity();
						break;
			case 'display': this.toggleDisplay();
						break;
			case 'visibility': this.toggleVisibility();
						break;
		}
		return this;
	}
});
Fx.Grow = new Class({
	Extends: Fx.Morph,
	initialize: function(element, options, values) {
		this.parent(element, options);
		this.values = values || {height: 200, width: 200, fontsize: 10};
		this.element.setStyle('overflow', 'hidden');
	},
	start: function(values) {
		var values = values || this.values,w = this.element.getDimensions().x,h = this.element.getDimensions().y;
		this.parent({
			'top':(h>0)?[(this.element.getParent().clientHeight-this.values.height)/2,this.values.height/2]:[this.values.height/2,(this.element.getParent().clientHeight-this.values.height)/2],
			'left':(w>0)?[(this.element.getParent().clientWidth-this.values.width)/2,this.element.getParent().clientWidth-this.values.width/2]:[this.values.width/2,(this.element.getParent().clientWidth-this.values.width)/2],
			'height':(h>0)?[this.values.height,0]:[0,this.values.height],
			'width':(w>0)?[this.values.width,0]:[0,this.values.width],
			'opacity':(h>0 && w>0)?[1,0]:[0,1]
		});
	}
});
/**
 *页面定位,两种方式。
 *自动定位：如(http://www.gewara.com?topos=element&ux=11&g=22,页面js中的domread内加上gewa.util.pagePos(),自动定位到element的区域)
 *传参定位：如gewa.util.pagePos('element')
 * **/
gewa.util.pagePos = function(el){
	var element;
	if(el){
		element = $(el);
	}else{
		var pos = gewa.util.getRequestParams('topos');
		element = $(pos.trim());
	}
	if(element)$(window).scrollTo(0,element.getPosition().y);
};
/***
 * 获取当前访问地址中的参数(传key)
 * **/
gewa.util.getRequestParams = function(name,link) {
	var url = window.location.search || link;
	if(url && url.indexOf(name) > 0){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"),
			r = url.substr(1).match(reg);
		return (r!=null)? r[2] : '';
	}else return "";
};
gewa.util.getUrlParams = function(link){
	var url = window.location.search || link;
	if(url){
		array = url.substr(1).split("&");
		var values = {};
		if(array){
			array.each(function(item){
				keyValue = item.split("=");
				var key = keyValue[0];
				if($chk(key)){
					values[key] = keyValue[1]?keyValue[1]:'';
				}
			});
		}
		return values;
	}else return {};
};
gewa.util.setInterval = function(){

};

var Icon = new Class({
	Implements: [Options,Events],
	options: {
		unit:['32','20'],//表情尺寸
		dir:{'xg':'格小拉','jd':'经典'},//路径文件夹名称和默认标题
		icon:new Object(),
		path:GewaraUtil.cdnPath+'img/minFace/',
		isLoad:[0,0]//是否加载过标识，0未加载，1加载过
	},
	initialize: function(options){
		this.setOptions(options);
		this.getIconTitle();
	},
	getIconTitle:function(){
		this.options.icon = [{
			'01':'点头','02':'发飙','03':'发呆','04':'呵呵','05':'黑线','06':'贱贱','07':'惊讶','08':'可怜','09':'哭','010':'酷',
			'011':'狂汗','012':'喷','013':'期待','014':'亲亲','015':'色眯眯','016':'微笑','017':'笑','018':'笑cry','019':'疑问','020':'晕'
		},
		{
			'01':'害羞','02':'可爱','03':'呵呵','04':'花心','05':'嘻嘻','06':'亲亲','07':'噢耶','08':'懒得理你','09':'抱抱','010':'鄙视',
			'011':'汗','012':'晕','013':'泪','014':'悲伤','015':'闭嘴','016':'吃惊','017':'酷','018':'哈哈','019':'困','020':'花','021':'伤心','022':'邮件','023':'电话','024':'干杯',
			'025':'调谢','026':'握手','027':'good','028':'唱歌','029':'得意','030':'疑问','031':'便便','032':'呆','033':'河蟹','034':'囧','035':'咖啡','036':'礼花','037':'礼物',
			'038':'篮球','039':'骷髅','040':'闪电','041':'弱','042':'怒','043':'衰','044':'失望','045':'生病','046':'睡觉','047':'太阳','048':'下雨','049':'心','050':'星','051':'药',
			'052':'月亮','053':'钟','054':'抓狂','055':'足球'
		}]
	},
	innerHTML:function(_this,input){
		_this = $(_this);input = $(input);
		var html = '', iconTags = '', iconConts = '';
		Object.each(this.options.dir,function(value,key){
			iconTags += this.replaceTabs(key,value);
		}.bind(this));
		var domIcon = new Element('div',{'html':html,'class':'dalogIcon uidialog clear','id':'uidialog'});
		var domIconTags = new Element('ul',{'class':'dalogIconTags clear','html':iconTags,'id':'dalogIconTags'}).inject(domIcon);
		for(var i=0; i < Object.getLength(this.options.dir); i++){
			if(i == 0){
				iconConts += "<div class='dalogIconBox clear'></div>";
			}else{
				iconConts += "<div class='dalogIconBox none clear'></div>";
			}
		}
		new Element('div',{'html':iconConts,'class':'dalogIconConts clear','id':'dalogIconConts'}).inject(domIconTags,'after');
		gewa.util.tips(_this,domIcon,422,'icon','',function(){
			var that = this;
			var tags = domIconTags.getElements('a');
			tags.each(function(item,index){
				item.addEvent('click',function(){
					if(that.options.isLoad[index] === 0){
						that.loadImg(index,input);
					}
					$('uidialog').getElements('.dalogIconBox').addClass('none');
					$('uidialog').getElements('.dalogIconBox')[index].removeClass('none');
				});
			});
			tags.addEvent('click',function(){
				tags.each(function(item){
					item.getParent('li').removeClass('select');
				});
				this.getParent('li').addClass('select');
			});
			document.addEvent('click',function(e){
				var target = $(e.target),myObject = gewa.util.container['icon'];
				if(target != myObject.coreDialog && !myObject.coreDialog.contains(target) && target != _this && !_this.contains(target)){
					document.removeEvent('click',arguments.callee);
					myObject.dispose(['icon'],true);
				}
			});
		}.bind(this),'','0');
		this.loadImg(0,input);
	},
	/*构建tab菜单列表*/
	replaceTabs:function(key,value){
		return "<li class='$2'><a href='javascript:void(0);'>$1</a></li>".replace(/\$1|\$2/g,function(text){
			if(text == '$2'){
				if(key == 'xg'){
					return text = 'select';
				}else{
					return text = '';
				}
			};
			return text = value;
		}.bind(this));
	},
	/*加载表情包*/
	loadImg:function(index,input){
		var node = $('uidialog').getElements('.dalogIconBox')[index];
		var html = '';
		Object.each(this.options.icon[index],function(value,key){
			html += this.replaceHTML(key,value,index);
		}.bind(this));
		node.innerHTML = html;
		this.bindEvent(input);
		this.options.isLoad[index] = 1;
	},
	replaceHTML:function(key,value,index){
		return "<a href='' rel='[$3]'><img src='$1' width='$4' height='$4' title='$2'/></a>".replace(/\$1|\$2|\$3|\$4/g,function(text){
			if(text == '$1')return text = this.options.path+Object.keys(this.options.dir)[index]+'/'+key+'.gif';
			else if(text == '$3') return text = Object.keys(this.options.dir)[index]+key;
			else if(text == '$4') return text = this.options.unit[index];
			else return text = value;
		}.bind(this));
	},
	bindEvent:function(input){
		$('dalogIconConts').getElements('a').each(function(b){
			if(b.hasEvent('click'))return;
			b.addEvent('click',function(e){
				e.preventDefault();
				try{
					input.focus();
					if(input.hasEvent('focus') && Browser.ie)input.fireEvent('focus');
					//input.insertAtCursor(this.get('rel'));
					input.value += this.get('rel');
				}catch(e){}
			})
		});
	}
});

var IconOld = new Class({
	Implements: [Options,Events],
	options: {
		icon:new Object(),
		path:GewaraUtil.cdnPath+'/img/minFace/'
	},
	initialize: function(options){
		this.setOptions(options);
		this.getIconTitle();
	},
	getIconTitle:function(){
		this.options.icon = {'01':'害羞','02':'可爱','03':'呵呵','04':'花心','05':'嘻嘻','06':'亲亲','07':'噢耶','08':'懒得理你','09':'抱抱','010':'鄙视',
		'011':'汗','012':'晕','013':'泪','014':'悲伤','015':'闭嘴','016':'吃惊','017':'酷','018':'哈哈','019':'困','020':'花','021':'伤心','022':'邮件','023':'电话','024':'干杯',
		'025':'调谢','026':'握手','027':'good','028':'唱歌','029':'得意','030':'疑问','031':'便便','032':'呆','033':'河蟹','034':'囧','035':'咖啡','036':'礼花','037':'礼物',
		'038':'篮球','039':'骷髅','040':'闪电','041':'弱','042':'怒','043':'衰','044':'失望','045':'生病','046':'睡觉','047':'太阳','048':'下雨','049':'心','050':'星','051':'药',
		'052':'月亮','053':'钟','054':'抓狂','055':'足球'}
	},
	innerHTML:function(_this,input){
		_this = $(_this);input = $(input);
		var html = "";
		Object.each(this.options.icon,function(value,key){
			html += this.replaceHTML(key,value);
		}.bind(this));
		var domIcon = new Element('div',{'html':html,'class':'dalogIcon uidialog clear','id':'uidialog'});
		gewa.util.tips(_this,domIcon,396,'icon','',function(){
			domIcon.getElements('a').addEvent('click',function(e){
				e.preventDefault();
				try{
					input.focus();
					if(input.hasEvent('focus') && Browser.ie)input.fireEvent('focus');
					input.insertAtCursor(this.get('rel'));
				}catch(e){}
			})
			document.addEvent('click',function(e){
				var target = $(e.target),myObject = gewa.util.container['icon'];
				if(target != myObject.coreDialog && !myObject.coreDialog.contains(target) && target != _this && !_this.contains(target)){
					document.removeEvent('click',arguments.callee);
					myObject.dispose(['icon'],true);
				}
			});
		},'','0');
	},
	replaceHTML:function(key,value){
		return "<a href='' rel='[$3]'><img src='$1' width='20' height='20' title='$2'/></a>".replace(/\$1|\$2|\$3/g,function(text){
			if(text == '$1')return text = this.options.path+key+'.gif';
			else if(text == '$3') return text = key;
			else return text = value;
		}.bind(this));
	}
});

//添加关注
gewa.util.makeRelation = function(memberid,obj){
	checkLogin(true, function(){
		obj = $(obj);
		GewaraUtil.sendRequest(GewaraUtil.basePath + "micro/addMicroAttention.xhtml",{'memberid':memberid},function(resText){
			if(resText.success){
				obj.hide();
				var span = new Element('span',{'text':'|','styles':{
					'background':'#EFEFEF',
					'border':'1px solid #cccccc',
					'display':'inline-block',
					'height':'22px',
					'line-height':'22px',
					'padding':'0 8px',
					'float':'left'
				}}).inject(obj,'before');
				new Element('span',{'text':'取消','styles':{'color':'#C03B0C','margin-left':'5px','cursor':'pointer'}}).addEvent('click',function(){
					gewaUtil.cancelRelation(memberid,this.getParent(),obj);
				}).inject(span);
				new Element('span',{'text':'已关注','styles':{'color':'#666666','margin-right':'5px'}}).inject(span,'top');
			}else gewaUtil.alert(resText.msg);
		})
	});
}

//取消关注
gewa.util.cancelRelation = function(memberid,cancelObj,apendObj){
	checkLogin(true, function(){
		if($(cancelObj))cancelObj = $(cancelObj);
		GewaraUtil.sendRequest(GewaraUtil.basePath +"micro/cancelAttention.xhtml", {'memberid':memberid}, function(result){
			if(result.success){
				gewaUtil.alert("取消成功！",function(){
					if($(cancelObj))cancelObj.dispose();
					if($(apendObj)){
						$(apendObj).show();
						$(apendObj).removeClass('none');
					}
				});
			}else{
				gewaUtil.alert(result.msg);
			}
		}, 'get');
	});
}

gewa.util.dialogSingleUpdate = function(forid,tag,formId){//上传图片组件；forid触发源、tag关联图片类型、formId在那个form下执行确认
	forid = {'id':$(forid)}
	if(forid.id.retrieve('iframe') == null){
		forid.html = new Element('div',{'styles':{'display':'none'}}).inject(document.body);
		new Element('iframe',{'src':'blank.html','name':'iframe_async_upload','id':'iframe_async_upload','styles':{'display':'none'}}).inject(forid.html);
		forid.form = new Element('form',{'action':GewaraUtil.basePath+'common/uploadPicture.xhtml','method':'post','target':'iframe_async_upload'}).inject(forid.html);
		if(Browser.ie6 || Browser.ie7)forid.form.setAttribute('encoding', 'multipart/form-data');
		else forid.form.setAttribute('enctype', 'multipart/form-data');
		new Element('input',{'type':'hidden','name':'callback','value':formId}).inject(forid.form);
		new Element('input',{'type':'hidden','name':'callbackUrl','value':GewaraUtil.basePath+'common/afterUploadPicture.xhtml?uploadtag=micro&callbackf=gewa.util.updateCallback'}).inject(forid.form);
		forid.t = new Element('div',{'text':'支持上传 .gif .jpg .png 格式图片，最大不超过2M。','styles':{
			'width':'100%',
			'height':'22px',
			'overflow':'hidden',
			'text-indent':'10px',
			'color':'#999'
		}}).inject(forid.form);
		forid.pic = new Element('div',{'id':'async_upload','styles':{
			'width':'290px',
			'height':'120px',
			'overflow':'hidden',
			'position':'relative',
			'margin-top':'10px'
		}}).inject(forid.form)
		forid.tl = new Element('div',{'id':'async_upload_file','styles':{
			'width':'76px',
			'height':'24px',
			'overflow':'hidden',
			'position':'absolute',
			'left':'95px',
			'top':'49px'
		}}).inject(forid.pic);
		forid.input = new Element('input',{'type':'file','name':'headlogo','id':'file_async_upload','styles':{
			'background':'transparent',
			'outline':'none',
			'hide-focus':'expression(this.hideFocus=true)',
			'opacity':0,
			'position':'absolute',
			'z-index':2,
			'left':'-60px',
			'width':150,
			'top':'-2px',
			'font-size':'20px',
			'visibility':'visible',
			'cursor':'pointer'
		}}).addEvent('change',function(){
			checkLogin(true, function(){
				forid.form.submit();
			});
		}).inject(forid.tl);
		new Element('span',{'text':'上传图片'}).inject(
		new Element('a',{'for':'file_async_upload','class':'button minBt redBt','href':'javascript:void(0);'}).addEvent('click',function(){
			forid.input.fireEvent('focus');
		}).inject(forid.tl),'top');
		forid.id.store('iframe',forid.html);
	}else forid.html = forid.id.retrieve('iframe');
	gewa.util.tips(forid.id,forid.html,340,'dailogpic','',function(){
		document.addEvent('click',function(e){
			var target = $(e.target),myObject = gewa.util.container['dailogpic'];
			if(target != myObject.coreDialog && !myObject.coreDialog.contains(target) && target != forid.id && !forid.id.contains(target)){
				document.removeEvent('click',arguments.callee);
				myObject.dispose(['dailogpic'],true);
			}
		});
	},'','0');
};

gewa.util.updateCallback = function(args){
	var caches = {};
	caches.img = Asset.image(GewaraUtil.cdnPath+args.picpath,{
		onLoad: function(){
			if(this.width > 290 || this.height > 120){
				rateWidth = this.width / 290;
				rateHeight = this.height / 120;
				if(rateWidth > rateHeight){
					this.width = 290;
					this.height = this.height / rateWidth;
				}else{
					this.width = this.width / rateHeight;
					this.height = 120;
				}
				this.setStyles({
					'margin-left':(290 - this.width) / 2,
					'margin-top':(120 - this.height) / 2
				})
			}
		}
	}).inject('async_upload');
	$('async_upload_file').hide();
	caches.input = new Element('input',{'type':'hidden','name':'bodypic','id':'bodypic','value':args.picpath}).inject(args.callback,'before');
	$(args.callback).value = $(args.callback).value + "分享图片"
	if($('wala_defV'))$('wala_defV').hide();
	new Element('span',{'text':'删除图片','styles':{
		'display':'inline-block',
		'background':'#fff',
		'border-radius':'3px',
		'height':'20px',
		'line-height':'20px',
		'padding':'0 6px',
		'cursor':'pointer',
		'color':'#DD9966',
		'border':'1px solid #ddd',
		'position':'absolute',
		'*line-height':'21px',
		'left':115,
		'top':49,
		'z-index':1
	}}).addEvent('click',function(){
		GewaraUtil.sendRequest(GewaraUtil.basePath+'micro/delMicroBlogPic.xhtml',{'picpath':args.picpath}, function(result){
			this.dispose();
			caches.img.dispose();
			caches.input.dispose();
			$('async_upload_file').show();
		}.bind(this));
	}).inject('async_upload');
};

gewa.util.replay = new Class({
	Implements: [Options,Events],
	options:{},
	initialize: function(options) {
		this.setOptions(options);
	},
	createMessageDialog:function(options){
		if(options.id.contains('img')){
			options.id = options.id.substring(3);
			showtext = '回复';
			var _this = this;
		}else{
			var _this = this,
			istext = (options._this.get('lang')=='f')?true:false,//判断回复或转发
			showtext = istext?'转发':'回复';
		}
		if(options.element.retrieve('dom') == null){
			var messagedom = new Element('dl',{'class':'isFirstNode'}).inject(options.element,'top');
			new Element('img',{'class':'picmin','src':(GewaraUtil.cdnPath + (GewaraUtil.member.headUrl != '' ? GewaraUtil.member.headUrl : 'cw30h30/img/default_head.png')),width:30,height:30}).inject(new Element('span',{'class':'picmin'})).inject(new Element('dt').inject(messagedom));
			var dd = new Element('dd').inject(messagedom);
			options.atmemberid = new Element('input',{'type':'hidden','name':'atmemberid'}).inject(dd,'top');
			options.replyid = new Element('input',{'type':'hidden','name':'replyid'}).inject(dd,'top');
			var dat = new Date().getTime() + options.id;
			options.replayBt = new Element('button',{'html':showtext,'class':'button'}).addEvent('click',function(){//回复按钮
				if(options.textarea.value.trim() == '')options.textarea.highlight('#ffcc99', '#fff');
				else{
					_this.datas = this.getParent('dd').toQueryString().parseQueryString();
					_this.datas.commentid = options.id;
					//if(showtext == '评论')_this.datas.type = 'albumcomment';
					_this.criteDom = new Element('div').hide().inject(messagedom,'after');
					checkLogin(true, function(){
						//if(_this.datas.type == 'r' || _this.datas.type == 'albumcomment'){
							GewaraUtil.sendLoad(_this.criteDom,GewaraUtil.basePath+'activity/ajax/sns/oldReplyComment.xhtml',_this.datas,function(result){
								if(result.success){
									options.textarea.value = '';
									_this.criteDom.reveal();
								}else{
									gewaUtil.alert(result.json.msg);
								}
							});
						/*}else{
							GewaraUtil.sendRequest(GewaraUtil.basePath+'activity/ajax/sns/oldReplyComment.xhtml', _this.datas, function(result){
								options.textarea.value = '';
								if(result.success){
									gewaUtil.alert('转发成功');
								}else{
									gewaUtil.alert(result.msg);
								}
							}, 'get');
						}*/
					});
				}
			}).inject(dd);
			var icon = new Element('div',{'class':'review'}).inject(dd);
			new Element('input',{type:'checkbox',checked:istext?'checked':'',name:'isMicro',id:dat,'styles':{'margin-right':'3px'}}).addEvent('click',function(){
				if(istext)this.checked = istext;
			}).inject(new Element('label',{'html':'转发到我的哇啦','class':'left ui_wala_rzf','for':dat}).inject(icon),'top');
			//new Element('input',{type:'hidden',name:'type',value:istext?'f':'r'}).inject(dd);
			var count = new Element('b',{'html':140,styles:{'float':'right','font-family':'Constantia,Georgia','font-size':'14px','color':'#CC3300','margin-right':'70px'}}).inject(icon);
			options.textarea = new Element('textarea',{name:'body',id:'body','root':'text','alt':'请输入'+showtext+'内容...','styles':{'color':'#666'}}).inject(dd,'top');
			options.textarea.addEvent('focus', function(){
				this.addClass('onFocus');
		    });
		    options.textarea.addEvent('blur', function(){
		    	this.removeClass('onFocus');
		    });
			options.textarea.addEvent('keyup',function(){//发表回复
				this.value = this.value.replace(/\n/g,'');
				if(this.value.length > 0)options.replayBt.addClass('onButton');
				else options.replayBt.removeClass('onButton');
				if(140 - this.value.length >= 0){
					_this.values = this.value;
					count.innerHTML = 140 - this.value.length;
					this.setStyle('height',this.getScrollSize().y);
				}else{
					this.value = _this.values;
					count.innerHTML = 0;
					this.highlight('#ffcc99', '#fff');
				}
			}).inject(dd,'top');
			if(options._this.hasProperty('form')){
				options.textarea.set('value',(options._this.hasProperty('form'))?options._this.get('form'):'');
				if(options._this.hasProperty('data-atmid'))options.atmemberid.set('value',options._this.get('data-atmid'));
				if(options._this.hasProperty('data-replyid'))options.replyid.set('value',options._this.get('data-replyid'));
			}
			//options.updateText = new OverText(options.textarea);
			new Element('em',{'class':'dmore'}).inject(
			new Element('span',{'class':'iserm','text':'表情'}).addEvent('click',function(){
				options.icon.innerHTML(this,options.textarea);
			}).inject(icon,'top'));
			if(typeof options.callback == 'function'){
				options.callback.run();
			}
			options.element.store('dom',messagedom);
		}else{//修改用户操作状态
			options.node = options.element.retrieve('dom');
			//options.type = options.node.getElement('input[type=hidden]');
			options.button = options.node.getElement('button');
			options.textArea = options.node.getElement('textArea');
			options.checkbox = options.node.getElement('input[type=checkbox]');
			options.atmemberid = options.node.getElement('input[name=atmemberid]');
			options.replyid = options.node.getElement('input[name=replyid]');
			options.checkbox.removeEvents('click');
			/*if(istext){//转发
				options.type.value = 'f';
				options.button.set("text","转发");
				options.textArea.set('alt','请输入转发的内容...');
				options.checkbox.checked = true;
				options.checkbox.addEvent('click',function(){this.checked = true;})
			}else{*/
				options.button.checked = "";
				options.button.set("text","回复");
				//options.type.value = 'r';
				options.checkbox.checked = "";
				if(options._this.hasProperty('form')){//@某人
					options.textArea.value = options._this.get('form');
					if(options._this.hasProperty('data-atmid')) options.atmemberid.value = options._this.get('data-atmid');
					if(options._this.hasProperty('data-replyid')) options.replyid.value = options._this.get('data-replyid');
				}else{//回复数据源
					options.textArea.set('alt','请输入回复的内容...');
				}
			//}
			if(typeof options.callback == 'function'){
				options.callback.run();
			}
			//options.updateText.update();
		}
	}
});

function logout(){
   var url = GewaraUtil.basePath + 'cas/logout.xhtml?ptn=smp';
   new Request({url:url,method:'get',
	onComplete:function(){
		gewaUtil.alert('成功退出！',refreshPage);
		}
	}).send();
};

gewa.util.messageInit = function(){
	var options ={};
	options.tgs= document.getElements('*[lang=r],*[lang=f]');
	if(options.tgs.length > 0){
		if(!$('walasCss'))Asset.css(GewaraUtil.cdnPath+'css/readwala.css',{'id':'walasCss'});
		options.replay = new gewa.util.replay();
		options.icon = new Icon();
		options.tgs.addEvent('click',function(e){
			e.preventDefault();
			options.url = this.get('rel');
			options.element = this.getParent('*[data=isvalid] div[root=replay]');
			options.id = this.id;
			//options.httplink = this.get('rel');
			options._this = this;
			options.replay.createMessageDialog(options);
		})
	}
};
var RatingGroup = new Class({
   /*gId:groupId, vrating: 评分值, isRating:是评分还是结果*/
   initialize: function(gId, vrating, tag, relatedid,marks,callback){
      this.groupId = gId;//针对谁评分的id
      this.itemList = $(gId).getElements('li');
      this.rating = vrating.toInt();
      this.tag = tag;//关联的版块
      this.relatedid = relatedid;//关联id
      this.desc = $(this.groupId+'Desc');//评分描述id
      this.group_id = $(this.groupId+'Point');//显示分值的id
      this.marks = $defined(marks) && typeof(marks) == 'object'?marks:false;
      this.callback = callback || '';
      var count = 1;
      var My = this;
      this.starList = [];
      if(this.rating == 0 && this.marks)this.marks[this.groupId] = 0;
      this.itemList.each(function(item,index){
      	if(index%2 != 0)item.set('class','no');
         if(index<this.rating){
         	if(index%2 != 0)item.set('class','on');
         	else item.set('class','half');
         	if(this.desc)this.desc.set('text', item.get('lang'));
         	if(this.group_id)this.group_id.set('text',item.id+'.0');
         	if(this.marks)this.marks[this.groupId] = item.id;
         }
         this.starList[index] = item.get('class');
         item.addEvents({
            'mouseover':function(){
               this.showStatus(item.id);
               if(this.desc)this.desc.set('text', item.get('lang'));
               if(this.group_id)this.group_id.set('text',item.id+'.0');
            }.bind(this),
            'mouseout':function(){this.resetStatus()}.bind(this),
            'click':function(){this.vote(item);}.bind(this)
         });
         count ++;
      }.bind(this));
   },
   resetStatus:function(){
      var count = 1;
      this.itemList.each(function(item,index){
    	if(index >= 10)return;
         if(this.starList[index] == 'on' || this.starList[index] == 'half'){
        	 if(this.desc)this.desc.set('text', item.get('lang'));
         	if(this.group_id)this.group_id.set('text',item.id+'.0');
         	//item.removeClass('no');
         	if(index%2 != 0)item.set('class','on');
         	else item.set('class','half');
         }else{
         	if(item.hasClass('on') || index%2 != 0)item.set('class','no');
         	else item.set('class','');
         }
         count++;
      }.bind(this));
      if(!this.itemList.some(function(item){
      	return (item.hasClass('on') || item.hasClass('half'));
      })){
      	if($(this.groupId+'Desc'))$(this.groupId+'Desc').set('text', '');
      	if(this.group_id)this.group_id.set('text','');
      }
   },
   showStatus:function(starnum){
      var i = 1;
      this.itemList.each(function(item,index){
    	if(index >= 10)return;
   		if(i<=starnum){
         	if(index%2 != 0 || item.hasClass('on'))item.set('class','on');
         	else item.set('class','half');
         }else{
         	if(item.hasClass('on') || index%2 != 0)item.set('class','no');
         	else item.set('class','');
         }
         i++;
      }.bind(this))
   },
   vote:function(item){
		checkLogin(true,function(){
		  var markname = this.groupId;
	      var My = this;
	      this.showStatus(item.id);
	      if(this.marks){
	      	this.marks[this.groupId] = item.id;
	      	this.rating = item.id;
				this.itemList.each(function(el,index){
					this.starList[index] = el.get('class');
				}.bind(this));
				if(this.callback && typeof this.callback == 'function'){
					this.callback();
				}else	if(typeof(showMovieMark) == 'function' && this.groupId == 'generalmark')showMovieMark();
	      }else{
				var mkurl=GewaraUtil.basePath+"ma/common/addComment.xhtml",
				mkvalues={"tag":this.tag,"relatedid":this.relatedid, "marks":markname+"="+item.id};
				GewaraUtil.sendRequest(mkurl, mkvalues, function(result){
					if(result.success){
						this.rating = item.id;
						this.itemList.each(function(el,index){
							this.starList[index] = el.get('class');
						}.bind(this));
						if(typeof(showMovieMark) == 'function' && this.groupId == 'generalmark')showMovieMark();
					}else gewaUtil.alert(result.msg);
		      }.bind(this));
		   }
      }.bind(this));
   },
   fixStar:function(starnum){
      this.itemList.each(function(item){
         item.removeEvents('mouseover');
         item.removeEvents('mouseout');
         item.removeEvents('click');
      });
   }
});

gewa.util.deleteReComment = function(id){
	checkLogin(true,function(){
		gewaUtil.confirm("确认要删除吗?", function(){
			var url = GewaraUtil.basePath +'activity/ajax/sns/deleteMicroReComment.xhtml?r=' + GewaraUtil.rtime();
			var values = {'id':id};
			GewaraUtil.sendRequest(url, values , function(result){
				if(result.success){
					document.getElement('div[id='+id+']').set('dissolve', {duration: 'long',onComplete:function(){
						this.dispose()
					}.bind(document.getElement('div[id='+id+']'))}).dissolve();
				}else{
					gewaUtil.alert(result.json.msg);
				}
			});
		});
	});
};

gewa.util.affix = function(elements){
    var position = function(element){
        var top = element.getPosition().y, pos = element.getStyle("position"),objH = element.getDimensions().y,warp = $$('.index_wrap')[0], warpH = $$('.index_wrap')[0].getDimensions().y, warpTop = $$('.index_wrap')[0].getPosition().y
        window.addEvent("scroll", function() {
            var scrolls = this.getScroll().y;
            if (scrolls > top){
                if (window.XMLHttpRequest) {
                    element.setStyles({
                        position: "fixed",
                        top: 0
                    });
                }else{
                    element.setStyles({
                        top: scrolls
                    });
                }
            }else{
                element.setStyles({
                    position: "absolute",
                    top: top
                });
            }
            if(warp){
            	if(objH+Document.getScrollTop() >= warpH+warpTop){
               	 warp.setStyles({
               		 position:"relative"
               	 })
               	 element.setStyles({
                        position: "absolute",
                        bottom:"0",
                        top:""
                    });
               }else{
               	warp.setStyles({
              		 position:"static"
              	 })
               }
            }
        });
    };
    if($type(elements) === "array"){
        return elements.each(function(items){
            position(items);
        });
    }else if($type(elements) === "element"){
        position(elements);
    }
};
var GewaOverText = new Class({

	Implements: [Options, Events, Class.Occlude],

	Binds: ["reposition","assert","focus","hide","keypress"],

	options: {/*
		textOverride: null,
		onFocus: function(){},
		onTextHide: function(textEl, inputEl){},
		onTextShow: function(textEl, inputEl){}, */
		element: 'label',
		labelClass: 'overTxtLabel',
		positionOptions: {
			position: 'upperLeft',
			edge: 'upperLeft',
			offset: {
				x: 4,
				y: 2
			}
		},
		poll: false,
		pollInterval: 250,
		wrap: false
	},

	property: 'GewaOverText',

	initialize: function(element, options){
		element = this.element = document.id(element);

		if (this.occlude()) return this.occluded;
		this.setOptions(options);

		this.attach(element);
		GewaOverText.instances.push(this);

		if (this.options.poll) this.poll();
	},

	toElement: function(){
		return this.element;
	},

	attach: function(){
		var element = this.element,
			options = this.options,
			value = options.textOverride || element.get('alt') || element.get('title');

		if (!value) return this;
		var text = this.text = Element(options.element,{
			"class":options.labelClass,
			styles:{
				lineHeight:this.element.getDimensions().y,
				height:this.element.getDimensions().y,
				position:"absolute",
				cursor:"text",
				color:"#ccc",
				width:this.element.getDimensions().x,
				'text-indent':6
			},
			html:value,
			events:{
				click:function(){this.element.focus()}.bind(this)}
			}).inject(element,"after");
		if (options.element == 'label'){
			if (!element.get('id')) element.set('id', 'input_' + String.uniqueID());
			text.set('for', element.get('id'));
		}
		if (options.wrap){
			this.textHolder = new Element('div.overTxtWrapper', {
				styles: {
					lineHeight: 'normal',
					position: 'relative'
				}
			}).grab(text).inject(element, 'before');
		}
		return this.enable();
	},

	destroy: function(){
		this.element.eliminate(this.property); // Class.Occlude storage
		this.disable();
		if (this.text) this.text.destroy();
		if (this.textHolder) this.textHolder.destroy();
		return this;
	},

	disable: function(){
		this.element.removeEvents({
			focus:this.focus,blur:this.assert,keypress:this.keypress,keyup:this.assert,change:this.assert
		});
		window.removeEvent('resize', this.reposition);
		this.hide(true, true);
		return this;
	},

	enable: function(){
		this.element.addEvents({
			focus:this.focus,blur:this.assert,keypress:this.keypress,keyup:this.assert,change:this.assert
		});
		window.addEvent('resize', this.reposition);
		this.reposition();
		return this;
	},

	wrap: function(){
		if (this.options.element == 'label'){
			if (!this.element.get('id')) this.element.set('id', 'input_' + String.uniqueID());
			this.text.set('for', this.element.get('id'));
		}
	},

	startPolling: function(){
		this.pollingPaused = false;
		return this.poll();
	},

	poll: function(stop){
		//start immediately
		//pause on focus
		//resumeon blur
		if (this.poller && !stop) return this;
		if (stop){
			clearInterval(this.poller);
		} else {
			this.poller = (function(){
				if (!this.pollingPaused) this.assert(true);
			}).periodical(this.options.pollInterval, this);
		}

		return this;
	},

	stopPolling: function(){
		this.pollingPaused = true;
		return this.poll(true);
	},

	focus: function(){
		this.text.setStyle('color','#dedede');
		return this;
	},

	hide: function(suppressFocus, force){
		if (this.text && (this.text.isDisplayed() && (!this.element.get('disabled') || force))){
			this.text.hide();
			this.fireEvent('textHide', [this.text, this.element]);
			this.pollingPaused = true;
			if (!suppressFocus){
				try {
					this.element.fireEvent('focus');
					this.element.focus();
				} catch(e){} //IE barfs if you call focus on hidden elements
			}
		}
		return this;
	},

	show: function(){

		if (this.text && !this.text.isDisplayed()){
			this.text.show();
			this.reposition();
			this.fireEvent('textShow', [this.text, this.element]);
			this.pollingPaused = false;
		}
		return this;
	},

	test: function(){
		return !this.element.get('value');
	},
	keypress:function(){return this["hide"](true)},
	assert: function(suppressFocus){
		this.text.setStyle('color','#ddd');
		return this[this.test() ? 'show' : 'hide'](suppressFocus);
	},

	reposition: function(){
		this.assert(true);
		if (!this.element.isVisible()) return this.stopPolling().hide();
		if (this.text && this.test()){
			this.text.position(Object.merge({
			position: 'upperLeft',
			edge: 'upperLeft',
			offset:{x:0,y:1}
		}, {
				relativeTo: this.element
			}));
		}
		return this;
	}

});
GewaOverText.instances = [];
Object.append(GewaOverText, {
	each: function(fn){
		return GewaOverText.instances.each(function(ot, i){
			if (ot.element && ot.text) fn.call(GewaOverText, ot, i);
		});
	},
	update: function(){

		return GewaOverText.each(function(ot){
			return ot.reposition();
		});

	},
	hideAll: function(){

		return GewaOverText.each(function(ot){
			return ot.hide(true, true);
		});

	},
	showAll: function(){
		return GewaOverText.each(function(ot){
			return ot.show();
		});
	}

});
gewa.util.textOver = function(input,flag){
	try{
		if($$("input"+input+" ,textarea"+input).length > 0)input = $$("input"+input+" ,textarea"+input);
		else return;
		input.each(function(item,index){
			var ipos = item.getPosition();
			if(item.hasProperty('alt') && ipos.x > 0 && ipos.y > 0 && item.value == ""){
				(function(){
					if(item.retrieve('label') == null){
						var label = new GewaOverText(item);
						item.store('label',label);
					}else	GewaOverText.update();
				}).delay(500);
			}
		})
	}catch(e){};
};

gewa.util.fixIE = function(){
	if(Browser.ie && 9 > parseInt(Browser.version, 10)){
		var a = function(){
			1300 > (document.documentElement.clientWidth || document.body.clientWidth) ? document.body.addClass('wrap_mini'):document.body.removeClass('wrap_mini');
		}
		a();
	}
};
