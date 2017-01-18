var ImageFactory = {
	// 源图像
	sourceImage: document.querySelector('#source_image'),
	// 屏幕中央的预览canvas
	previewImage: {},

	init: function () {
		$('#gray_level').on('click', this.grayLevelAdjust.bind(this));
	},

	// 通过源图像生成屏幕中央的预览canvas
	createCanvasImage: function () {
		var image = this.sourceImage;

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.id = 'preview_image';
		document.getElementById('image_wrapper').appendChild(canvas);
		ctx.drawImage(image, 0, 0);
		this.previewImage = canvas;
	},

	updateCanvasImage: function () {

	},

	grayLevelAdjust: function () {
		var adjustment = 10;  //可自定义增加值，加后大于255的系统视为255

		var canvas = this.previewImage;
		var ctx = canvas.getContext("2d");

		var getDat = ctx.getImageData(0,0,canvas.width,canvas.height);
		var d = getDat.data;
		for (var i=0; i<d.length; i+=4) {
			d[i] += adjustment;
			d[i+1] += adjustment;
			d[i+2] += adjustment;
		}
		ctx.putImageData(getDat,0,0);
	}
}

ImageFactory.init();
ImageFactory.createCanvasImage();





$('.toolbox_title').on('click', changeToolbox);

// toolbox导航栏设置
function changeToolbox() {
	var that = this;
	$('.toolbox_title').each(function () {
		$(this).find('ul').removeClass('toolbox_content_block');
		if (this == that) {
			$(this).closest('.toolbox').find('ul').addClass('toolbox_content_block');
			console.log($(this).closest('.toolbox').find('ul'));
		}
	});
	
}

$('#inputrange').on('change', function (e) {
	console.log(e);
})
