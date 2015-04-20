﻿$(document).ready(function() {
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
	}
	$('.catalog .rb .method ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	$('.catalog .rb .view ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	if ( $('.catalog .nav').length > 0 ) {
		$('.catalog .nav > li, .catalog .nav > li > ul > li').each(function() {
			if ( $(this).children('ul').length > 0 ) {
				$(this).addClass('sub');
			}
		});
		$('.catalog .nav li.sub > a').bind('click', function() {	
			$(this).parent().toggleClass('active');
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
});