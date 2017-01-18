// 注册页面
var regPage = ['home', 'makeAlbum', 'personalInfo'];
// 样式依赖
var style = {
	'home': 'home.css',
	'makeAlbum': 'makeAlbum.css',
	'personalInfo': 'personalInfo.css'
};
// 脚本依赖
var script = {
	'home': 'home.js',
	'makeAlbum': 'makeAlbum.js',
	'personalInfo': 'personalInfo.js'
};
// 被渲染的外层元素
var wrapperBox = 'content';
// 被选中的元素变色
var tabEls = $('#tabs li');
$('#tabs li').on('click', function () {
	var that = this;
	for (var i = 0; i < tabEls.length; i ++) {
		tabEls[i] == that ? (tabEls[i].className = 'selected_page') : (tabEls[i].className = '');
	}
});

function loadStyle (url) {
	var linkTags = $('link');
	for (var i = 0; i < linkTags.length; i ++) {
		if (linkTags[i].href && linkTags[i].href.match(url)) {
			return;
		}
	}
	var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

function loadScript (url) {
	var scriptTags = $('script');
	for (var i = 0; i < scriptTags.length; i ++) {
		if (scriptTags[i].src && scriptTags[i].src.match(url)) {
			return;
		}
	}
	var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
}

// 页面渲染函数
function renderTmpl () {
	// 获取url的哈希
	var urlHash = window.location.hash;
	// 初始化获取hash的page名称
	var pageReg = /\#([^\/]*)/;
	// 得出结果
	var result = urlHash.match(pageReg);
	// url异常处理
	if (result == null || result[1] == '') {
		return ;
	}
	var page = result[1];
	// 页面存在则请求
	if (regPage.some((item) => item == page)) {
		// 获取远程页面并且加载
	 	var xhr = new XMLHttpRequest();
	 	xhr.open('GET', '/template/' + page + '.html', true);
	 	xhr.onload = function () {
		  	var tmpl = xhr.responseText;
		  	document.getElementById(wrapperBox).innerHTML = tmpl;
		  	//  加载样式
		  	var cssUrl = '/css/' + style[page];
		  	var jsUrl = '/js/' + script[page];

		  	loadStyle(cssUrl);
		  	loadScript(jsUrl);
		};
		$('a[href="#' + page + '"]').click();
		xhr.send(null);
	}
}

renderTmpl ();

window.addEventListener("hashchange", renderTmpl);
