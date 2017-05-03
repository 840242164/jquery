
/*top search*/
	(function(){
		var $li = $('.h-t-m-left>ul>li');
		var $liveLi = $('.h-t-m-left .l4 .hide .hide-live .hide-live-list>li');
		var $rListLi = $('.r-list>li');
		var $show = $('.showImg');
		var $showImg = $('.showImg img');
		var $contribute = $('.h-contribute');
		var $search = $('.h-l-s-main .search');

		$li.hover(function(){
			$(this).find('.hide').show();
		},function(){
			$(this).find('.hide').hide();
		});
		$liveLi.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$rListLi.hover(function(){
			$show.show();
			var src = $(this).attr('dataImg');
			$showImg.prop('src' , src);
		},function(){
			$show.hide();
		});
		$contribute.hover(function(){
			$(this).css('background' , 'url(' + $(this).attr('dataHover') + ')');
			$(this).find('.h-c-hide').show();
		},function(){
			$(this).css('background' , 'url(' + $(this).attr('dataNormal') + ')');
			$(this).find('.h-c-hide').hide();
		});
		$search.focus(function(){
			$(this).parent().addClass('hover');
		});
		$search.blur(function(){
			$(this).parent().removeClass('hover');
		});
	})();

/*nav*/
	(function(){
		var $navLi = $('#h-nav .navLi');
		init();
		run();
		function init(){
			var iData = data.navData;
			for (var i=0;i<iData.length;i++ )
			{
				if ( iData[i].length )
				{
					var $hide = $('<div class="navHide"></div>');
					var $ul = $('<ul class="hideList"></ul>');
					for (var j=0;j<iData[i].length;j++ )
					{
						$ul.append('<li class="hideLi">' +
										'<a href="" class="nav-a2">'+
											'<span class="leftArrow"></span>'+
											'<span class="midTxt">'+ iData[i][j] +'</span>'+
											'<span class="rightArrow"><span></span></span>'+
										'</a>'+
									'</li>');
					};
					$hide.append( $ul );
					$navLi.eq(i).append($hide);
				}
			}
		};
		function run(){
			var $hideLi = $('#h-nav .navHide .hideList .hideLi');
			$hideLi.hover(function(){
				$(this).find('.nav-a2').stop().animate({
					paddingLeft : '15px',
					paddingRight : '10px' 
				},200);
				$(this).find('.rightArrow span').stop().animate({
					left : '5px',
					opacity : 1
				},200);
			},function(){
				$(this).find('.nav-a2').stop().animate({
					paddingLeft : '10px',
					paddingRight : '15px' 
				},200);
				$(this).find('.rightArrow span').stop().animate({
					left : '30px',
					opacity : 0
				},150);
			});
			$navLi.hover(function(){
				$(this).find('.navHide').show();
			},function(){
				$(this).find('.navHide').hide();
			});
		};
	})();

/*b-main*/
	(function(){
		
		var $bMain = $('#b-main');
		var $tabLi = $('#b-main .tab .tabList');
		var $picUl = $('#b-main .pic .p-ul');
		var $more = $('#b-main .more');
		var index = 0;
		var timer = null;

		$tabLi.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		}).click(function(){
			index = $(this).index();
			move();
		});
		auto();
		$bMain.hover(function(){
			clearInterval( timer );
			$more.fadeIn(200);
		},function(){
			auto();
			$more.fadeOut(200);
		});
		function auto(){
			timer = setInterval(function(){
				index ++;
				index %= $tabLi.length;
				move();
			},5000);
		};

		function move(){
			$tabLi.eq(index).addClass('on').siblings().removeClass('on');
			$picUl.stop().animate({
				marginLeft : -440*index + 'px'
			},200);
		};
	})();

/*b-show*/
	(function(){


		init();
		var $showUl = $('.showUl');
		var $showLi = $('#b-show .showList');
		var $showBtn = $('#b-show .b-s-btn div');
		var index = 0;
		var spanArr = ['一周' , '昨日' , '三日'];
		$showUl.hide();
		$showUl.eq(0).show();
		$showUl.each(function(){
			$(this).find('.showList').each(function(i){
				if ( i == 2 || i == 5 )
				{
					$(this).css('margin-right' , 0);
				}
			});
		});
		$showLi.hover(function(){
			$(this).find('.up').stop().fadeIn(200);
			$(this).find('.plays').stop().fadeIn(200);
		},function(){
			$(this).find('.up').stop().fadeOut(200);
			$(this).find('.plays').stop().fadeOut(200);
		});
		$showBtn.click(function(){
			var i = $(this).index();
			if (i)
			{
				index ++;
				index %= $showUl.length;
			}else{
				index --;
				if(index<0)index = 2;
			}
			$showUl.eq(index).show().siblings().hide();
			$showBtn.find('span').eq(1).html(spanArr[index]);
			var a = index+1;
			a %= $showUl.length;
			$showBtn.find('span').eq(0).html(spanArr[a]);
		}).find('span').mousedown(function(){
			return false;
		});

		function init(){
			var $tab = $(".b-s-tab");
			var bShowData = data.bShowData;
			for (var i=0;i<3;i++ )
			{
				var $ul = $('<ul class="showUl showUl'+(i+1)+'"></ul>');
				for (var j=0;j<bShowData[i].length;j++ )
				{
					var $li = $('<li class="showList"></li>');
					var title = '',up = '',plays='';
					if ( bShowData[i][j].title )
					{
						title = '【' + bShowData[i][j].title + '】'
					}
					title += bShowData[i][j].text;
					up = 'up主 : '+bShowData[i][j].up;
					plays = '播放 : '+bShowData[i][j].plays;

					$li.html('<a href="">'+
								'<img src="img/banner/right/'+(i+1)+'/'+(j+1)+'.jpg" alt="" />'+
								'<div class="showHide">'+
									"<p class='title'>"+title+"</p>"+
									"<p class='up'>"+up+"</p>"+
									"<p class='plays'>"+plays+"</p>"+
								'</div>'+
							'</a>');
					$ul.append($li);
				}
				$tab.append($ul);
			}
		};
	})();

/* promote */
	(function(){
		var $conImg = $('#promote .con-a1');
		var $Hide = $('#promote .p-c-conLiHide');
		var timer;
		init();
		$conImg.hover(function(){
			var dTime = $(this).find('.con-img1').attr('data-time');
			if ( dTime )
			{
				var $div = $('<div class="dTime">'+dTime+'</div>');
				$(this).find('.con-img1').append( $div );
			}
			$(this).siblings('.p-c-conLiHide').stop().delay(300).fadeIn();
			$(this).find('.BarrageDiv').show();
			barrage( $(this) );
		},function(){
			$(this).find('.con-img1').find('.dTime').remove();
			$(this).siblings('.p-c-conLiHide').stop().hide();
			$(this).find('.BarrageDiv').hide();
			clearInterval(timer);
			$(this).find('.BarrageDiv .barrage').stop().css('left' , '160px');
		});

		function barrage( obj ){
			var $bar = obj.find('.BarrageDiv .barrage');
			var index = -1;
			timer = setInterval(function(){
				var a = index-1;
				index ++;
				if ( a > -1 )
				{
					var pos = $bar.eq(a).position().left + $bar.eq(a).width();
					var pos2 = $bar.eq(index-1).position().left + $bar.eq(index-1).width();
					if ( pos < 170 )
					{
						$bar.eq(index).css('top' , $bar.eq(a).css('top') );
						fn();
					}else if ( pos2 < 170 )
					{
						$bar.eq(index).css('top' , $bar.eq(a).css('top') );
						fn();
					}else{
						index --;
					}
				}else if ( a == -2 )
				{
					$bar.eq(index).css('top' , '0px' );
					fn();
				}else if ( a == -1 )
				{
					$bar.eq(index).css('top' , '14px' );
					fn();
				}
				if ( index >= $bar.length )clearInterval(timer);
				function fn(){
					var time = 10000;
					if ( $bar.eq(index).width() > 150 )
					{
						time = 7000;
					}
					$bar.eq(index).stop().animate({
						left : '-500px'
					},time);
				};
			},1000, 'linear');
		};

		function init(){
			var pData = data.promoteData;
			for ( var i=0;i<pData.length;i++ )
			{
				var plays = pData[i].palys*1;
				var a = plays/10000;
				if ( a>=1 )plays = a.toFixed(1) + '万';

				$Hide.eq(i).append("<p class='p-c-c-title'>"+pData[i].title+"</p>"+
					"<p class='p-c-c-dec'>"+
						"<span class='up'>"+pData[i].up+"</span>|<span class='time'>"+pData[i].time+"</span>"+
					"</p>"+
					'<div class="p-c-c-detail">'+
						'<div class="p-c-c-d-left"><img src="img/promote/'+(i+1)+'.jpg" alt="" /></div>'+
						'<div class="p-c-c-d-right">'+pData[i].detail+'</div>'+
					'</div>'+
					"<p class='p-c-c-data'>"+
						"<span class='plays'>"+plays+"</span>"+
						"<span class='comment'>"+pData[i].comment+"</span>"+
						"<span class='collection'>"+pData[i].collection+"</span>"+
						"<span class='coin'>"+pData[i].coin+"</span>"+
					"</p>");
			}
		};
	})();

/*live*/
	(function(){
		init();
		var $liveLi = $('#live .l-l-content .liveLi');
		var $rightTopLi = $('#live .l-r-top li');
		var $rightContent = $('#live .l-r-content');
		$liveLi.hover(function(){
			$(this).find('.hide').stop().fadeIn();
		},function(){
			$(this).find('.hide').stop().fadeOut();
		});
		$rightTopLi.click(function(){
			var index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$rightContent.stop().animate({
				marginLeft : -260*index + 'px'
			},200);
		});
		function init(){
			var lData = data.liveData;
			var $liveUl = $('#live .l-l-content .liveUl');
			for (var i=0;i<lData.title.length;i++ )
			{
				var plays = lData.num[i]*1;
				var a = plays/10000;
				if ( a>=1 )plays = a.toFixed(1) + '万';
				$liveUl.append('<li class="liveLi">'+
					'<div class="img">'+
						'<img src="img/live/'+(i+1)+'.jpg" alt="" />'+
						'<div class="hide"><i></i><span>LIVE</span></div>'+
					'</div>'+
					'<div class="title">'+lData.title[i]+'</div>'+
					'<div class="info">'+
						"<p class='up'><i></i><span>"+lData.up[i]+"</span></p>"+
						"<p class='num'><i></i><span>"+plays+"</span></p>"+
					'</div>'+
					'<div class="avatar"><img src="'+lData.src[i]+'" alt="" /></div>'+
				'</li>');
			}
		};
		
	})();