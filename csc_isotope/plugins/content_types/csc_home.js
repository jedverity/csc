(function ($) {
  //Browser type    
  $.browser = {};
  $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
  $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
  $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
  $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
  
  //Transform prefix
  var prefix = '';
  if($.browser.msie)    prefix = '-ms-';
  if($.browser.webkit)  prefix = '-webkit-';

  //Build tiles layout
  function home_layout(){
    //Size of container
    var cWidth = $('#iso-container').width();
    
    //Number of tiles depending on container width
    if(cWidth >= 1200){
      var nCol = 4;
    }else if(cWidth >= 1000){
      var nCol = 3;
    }else if(cWidth >= 450){
      var nCol = 2;
    }else{
      var nCol =1
    }
    
    var tWidth =  Math.round(cWidth/nCol);
    if (nCol == 1 && tWidth < 300) tWidth = 300;
    
    //Var to save height of columns
    var tHeight = new Array();
    for(var i=0; i < nCol; i++) tHeight[i] = 0;
   
    var i = 0; posX = 0
    $('.isotope-item').each(function( index ) {
      if( !$(this).hasClass('hide-me') ){
        //Get smallest column
        minimumY = tHeight[0];   //Initialize min value
        shortCol = 0;
        for (var j=0; j < nCol; j++) {
          if( tHeight[j] < minimumY ) { minimumY = tHeight[j]; shortCol = j; }
        }    
      
        $(this).css('left', '0px');
        $(this).css('top', '0px');
        
        //Set tiles width. Make adjustment for last tile due to rounded issues
        var w = (i == nCol - 1 && nCol > 1) ? $('#iso-container').width() - posX: tWidth;
        $(this).css('width', w + 'px');
        //Move tiles to final position
        $(this).css(prefix + 'transform', 'translate('+ posX +'px,'+ tHeight[i] +'px)');
  
        //Update Column height and horizontal position
        tHeight[i] += $(this).height();
        posX += tWidth;
        
        //Reset tiles to next row
        i++;
        if(i == nCol){
          i = 0;
          posX=0;
        }
      }  
    });
    
    //Set containter to highest height
    maxH = 0;
    for(var i=0; i < nCol; i++) if (tHeight[i] > maxH) maxH = tHeight[i];
    $('#iso-container').css('height', maxH + 'px');
  }
  
  //Filter function
  function filter(el){
    selector = el.attr('data-filter');
    $('.isotope-item').filter(function(index){
      if( $(this).hasClass(selector) || selector == '*' )
        $(this).removeClass('hide-me');
      else
        $(this).addClass('hide-me');
    });

    home_layout();  
  }

  $(window).load(function() {    
    home_layout();
    
    //Filters
    $('#filters a').on('click', function(){
        filter( $(this) );
        return false;
    });        
  });
  
  //Resize event (only when resize ends)
  var doit;
  $(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(home_layout, 150);
  });
  
})(jQuery);