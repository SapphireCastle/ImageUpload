var express = require('express');
var ejs = require('ejs');
var multer  = require('multer');
var bodyParser = require('body-parser');
var upload = multer({ dest: 'uploads/' });
var app = express();
var uuidV1 = require('uuid/v1');

// 设置视图文件的位置
app.set('views', './views');
// 设置视图加载引擎
app.set('view engine', 'ejs');
// 设置视图后缀
app.engine('html', ejs.renderFile);
app.use(bodyParser.json({
	limit: '10000kb'
}));
app.use(bodyParser.urlencoded({ extended: true }));

// 访问静态资源的规则
app.use(express.static(__dirname + '/public'));

app.post('/makeAlbum/uploadImg', function(req, res){
	var base64Data= req.body.pic.replace(/^data:image\/png;base64,/, '');
	var binaryData = new Buffer(base64Data,'base64').toString('binary');
	require('fs').writeFile(uuidV1() + '.png', binaryData, 'binary', function(err){
		if(err){
			console.log(err);
		}
	});
	res.send('saved.');
});

app.get('/*', function(req, res){
  	res.render('index.html', function(err, html) {
	  res.send(html);
	});
});

app.listen(3000);