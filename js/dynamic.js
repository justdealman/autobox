$(document).ready(function() {
	if ( $('.slider').length > 0 ) {
		$('.slider').slides({
			generatePagination: true,
			generateNextPrev: false,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			play: 10000,
			pause: 2500
		});
	}
	$('.clear').css({
		'height': $('.footer').outerHeight()+'px'
	});
	$('.footer').css({
		'margin-top': -$('.footer').outerHeight()+'px'
	});
	$('.navigation h6 span').bind('click', function() {
		if ( $(this).html() == 'Развернуть' ) {
			$('.navigation > ul > li ul').css({
				'max-height': '10000px'
			});
			$('.navigation').addClass('opened');
			$(this).html('Свернуть');
		}
		else {
			$('.navigation > ul > li ul').css({
				'max-height': '456px'
			});
			$('.navigation').removeClass('opened');
			$(this).html('Развернуть');
		}
		return false;
	});
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	if ( $('.filter').length > 0 ) {
		var rangeFrom = 1750;
		var rangeTo = 3750;
		$('.filter .from').val(rangeFrom);
		$('.filter .to').val(rangeTo);
		$('.range').slider({
			range: true,
			min: 0,
			max: 10000,
			step: 50,
			values: [rangeFrom, rangeTo],
			slide: function(event, ui) {
				$('.filter .from').val(ui.values[0]);
				$('.filter .to').val(ui.values[1]);
			}
		});
		$('.filter .from').change(function() {
			if ( $(this).val() <= $('.range').slider('option', 'min') ) {
				$(this).val($('.range').slider('option', 'min'));
			}
			if ( $(this).val() >= $('.range').slider('values', 1) ) {
				$(this).val($('.range').slider('values', 1));
			}
			$('.range').slider('values', 0, $(this).val());
		});
		$('.filter .to').change(function() {
			if ( $(this).val() >= $('.range').slider('option', 'max') ) {
				$(this).val($('.range').slider('option', 'max'));
			}
			if ( $(this).val() <= $('.range').slider('values', 0) ) {
				$(this).val($('.range').slider('values', 0));
			}
			$('.range').slider('values', 1, $(this).val());
		});
	}
	$('.catalog .rb .method ul li').each(function() {
		$(this).prepend('<span class="down"></span>');
		$(this).prepend('<span class="up"></span>');
	});
	$('.catalog .rb .method ul li a').bind('click', function() {
		if ( $(this).parent().hasClass('active') ) {
			$(this).parent().find('span.active').removeClass('active').siblings().addClass('active');
		}
		else {
			$(this).parent().addClass('active').siblings().removeClass('active');
			$(this).parent().find('span.up').addClass('active').siblings('span').removeClass('active');
		}
		return false;
	});
	$('.catalog .rb .method ul li span').bind('click', function() {
		$(this).addClass('active').siblings('span').removeClass('active');
	});
	
	
	
	$('.catalog .rb .view ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	if ( $('.catalog .nav').length > 0 ) {
		$('.catalog .nav > li, .catalog .nav > li > ul > li, .catalog .nav > li > ul > li > ul > li').each(function() {
			if ( $(this).children('ul').length > 0 ) {
				$(this).addClass('sub');
				$(this).children('span').append('<em class="drop"></em>');
			}
		});
		$('.catalog .nav li.sub > span > em').bind('click', function() {	
			$(this).parent().parent().toggleClass('active');
			return false;
		});
	}
	if ( $('.product .gallery .preview').length > 0 ) {
		$('.product .gallery .preview').jcarousel({
			scroll: 1
		});
	}
	$('.modal').append('<span class="close"></span>');
	$('[data-target]').bind('click', function() {
		var target = $('.modal[data-modal="'+$(this).attr('data-target')+'"]');
		target.css({
			'top': $(document).scrollTop()+($(window).height()/2)-(target.outerHeight()/2)+'px'
		}).stop(true,true).fadeIn(250);
		$('.fade').stop(true,true).fadeIn(250);
		return false;
	});
	$('.modal .close, .fade').bind('click', function() {
		$('.modal, .fade').stop(true,true).fadeOut(250);
		return false;
	});
	$('input, textarea').each(function () {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.viewed ul li:nth-child(3n), .catalog .sections li:nth-child(4n), .catalog .grid li:nth-child(4n), .index .more .dealer ul li:nth-child(3n), .index .news ul li:nth-child(3n)').css({
		'margin-right': '-5px'
	});
	$('.product .tabs > ul > li > a').bind('click', function() {
		$(this).parents('.tabs').children('div[data-tab="'+$(this).attr('href')+'"]').show().siblings('div').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	}).filter(':first').click();
	$('.panel .sub').each(function() {
		var t = $(this);
		var s = t.find('.temp p').size();
		var o = Math.ceil(s/3);
		for ( var i = 0; i <= 2; i++ ) {
			for ( var j = 1; j<= o; j++ ) {
				t.find('li:nth-child('+eval(i+1)+')').append(t.find('.temp p:nth-child('+eval(i*o+j)+')').clone());
			}
		}
	});
	$('.panel .nav li a').mouseover(function() {
		$('.panel .sub[data-sub="'+eval($(this).parent().index()+1)+'"]').show().siblings('div.sub').hide();
			$(this).parent().siblings().removeClass('hover');
	});
	$('.panel .sub').mouseover(function() {
		$('.panel .nav li:nth-child('+$(this).attr('data-sub')+')').addClass('hover').siblings().removeClass('hover');
	});
	$('.panel').mouseleave(function() {
		$('.panel .sub').hide();
		$('.panel .nav li').removeClass('hover');
	});
	$('.product .jcarousel-item a').bind('click', function() {
		$(this).parents('.product').find('.gallery .big img').stop(true,true).fadeOut(100);
		$(this).parents('.product').find('.gallery .big img[data-big="'+$(this).attr('href')+'"]').stop(true,true).delay(100).fadeIn(100);
		return false;
	}).filter(':first').click();
	$('.catalog .filter div.drop h5').bind('click', function() {
		$(this).parent('.drop').toggleClass('active');
	});
	$('.catalog .filter div.drop').each(function() {
		if ( $(this).find('ul').children('li').size() > 6 ) {
			$(this).children('div').append('<h4><span>Развернуть</span></h4>');
			$(this).find('ul').children('li').hide();
			for ( var i=1; i<=6; i++ ) {
				$(this).find('ul').children('li:nth-child('+i+')').show();
			}
		}
	});
	$('.catalog .filter div.drop h4 span').bind('click', function() {
		if ( $(this).text() == 'Развернуть' ) {
			$(this).parents('.drop').find('ul').children('li').show();
			$(this).text('Свернуть');
		}
		else {
			$(this).parents('.drop').find('ul').children('li').hide();
			for ( var i=1; i<=6; i++ ) {
				$(this).parents('.drop').find('ul').children('li:nth-child('+i+')').show();
			}
			$(this).text('Развернуть');
		}
	});
});