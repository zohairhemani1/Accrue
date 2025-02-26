(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            startdegree: 0,
            fgcolor: "#556b2f",
            bgcolor: "#eee",
            fill: false,
            width: 0,
            dimension: 200,
            fontsize: 15,
            percent: 50,
            bpercent:50,
            animationstep: 1.0,
            iconsize: '20px',
            iconcolor: '#999',
            border: 'default',
            complete: null,
            bordersize: 15
        }, options);

        return this.each(function () {

            var customSettings = ["fgcolor", "bfgcolor","bgcolor", "fill", "width", "dimension", "fontsize", "animationstep", "endPercent", "icon", "iconcolor", "iconsize", "border", "startdegree", "bordersize"];

            var customSettingsObj = {};
            var icon = '';
            var endPercent = 0;
            var obj = $(this);
            var fill = false;
            var text, info;
            var calcPer=0;
            obj.addClass('circliful');

            checkDataAttributes(obj);

            if (obj.data('text') != undefined) {
                text = obj.data('text');

                if (obj.data('icon') != undefined) {
                    icon = $('<i></i>')
                    .addClass('fa ' + $(this).data('icon'))
                    .css({
                        'color': customSettingsObj.iconcolor,
                        'font-size': customSettingsObj.iconsize
                    });
                }

                if (obj.data('type') != undefined) {
                    type = $(this).data('type');

                    if (type == 'half') {
                        addCircleText(obj, 'circle-text-half', (customSettingsObj.dimension / 1.45));
                    } else {
                        addCircleText(obj, 'circle-text', customSettingsObj.dimension);
                    }
                } else {
                    addCircleText(obj, 'circle-text', customSettingsObj.dimension);
                }
            }

            if ($(this).data("total") != undefined && $(this).data("part") != undefined) {
                var total = $(this).data("total") / 100;

                percent = (($(this).data("part") / total) / 100).toFixed(3);
                endPercent = ($(this).data("part") / total).toFixed(3)
                
            } else {
                if ($(this).data("percent") != undefined) {
                    percent = $(this).data("percent") / 100;
                    endPercent = $(this).data("percent")+($(this).data("percent")-$(this).data("bpercent"));
                    bpercent=$(this).data("bpercent");
                    var calcPer=(percent*100).toFixed(0);
                } else {
                    percent = settings.percent / 100
                }
                
            }


            if ($(this).data('info') != undefined) {
                info = $(this).data('info');

                if ($(this).data('type') != undefined) {
                    type = $(this).data('type');

                    if (type == 'half') {
                        addInfoText(obj, 0.9);
                    } else {
                        addInfoText(obj, 1.25);
                    }
                } else {
                    addInfoText(obj, 1.25);
                }
            }

            $(this).width(customSettingsObj.dimension + 'px');

            var canvas = $('<canvas></canvas>').attr({
                width: customSettingsObj.dimension,
                height: customSettingsObj.dimension
            }).appendTo($(this)).get(0);

            var context = canvas.getContext('2d');
            var container = $(canvas).parent();
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var degrees = customSettingsObj.percent * 360.0;
            var radians = degrees * (Math.PI / 180);
            var radius = canvas.width / 2.5;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var counterClockwise = false;
            var curPerc = customSettingsObj.animationstep === 0.0 ? endPercent : 0.0;
            var curStep = Math.max(customSettingsObj.animationstep, 0.0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var type = '';
            var fireCallback = true;
            var additionalAngelPI = (customSettingsObj.startdegree / 180) * Math.PI;
            var i=1;
            var fixedPer=0.0;
            if ($(this).data('type') != undefined) {
                type = $(this).data('type');

                if (type == 'half') {
                    startAngle = 2.0 * Math.PI;
                    endAngle = 3.13;
                    circ = Math.PI;
                    quart = Math.PI / 0.996;
                }
            }

            //Run function when browser resizes
            $(window).resize(respondCanvas);

            function respondCanvas() {
                $(canvas).attr('width', $(container).width()); //max width

                if(type == 'half') {
                    $(canvas).attr('height', $(container).height() / 2); //max height
                } else {
                    $(canvas).attr('height', $(container).height()); //max height
                }

                //Call a function to redraw other content (texts, images etc)
            }

            //Initial call 
            respondCanvas();

            /**
             * adds text to circle
             *
             * @param obj
             * @param cssClass
             * @param lineHeight
             */
             function addCircleText(obj, cssClass, lineHeight) {
                $("<span></span>")
                .appendTo(obj)
                .addClass(cssClass)
                .text(text)
                .prepend(icon)
                .css({
                    'line-height': lineHeight + 'px',
                    'font-size': customSettingsObj.fontsize + 'px'
                });
            }

            /**
             * adds info text to circle
             *
             * @param obj
             * @param factor
             */
             function addInfoText(obj, factor) {
                $('<span id="time_txt"></span>')
                .appendTo(obj)
                .addClass('circle-info-half')
                .css(
                    'line-height', (customSettingsObj.dimension * factor) + 'px'
                    )
                .text(info);
            }

            /**
             * checks which data attributes are defined
             * @param obj
             */
             function checkDataAttributes(obj) {
                $.each(customSettings, function (index, attribute) {
                    if (obj.data(attribute) != undefined) {
                        customSettingsObj[attribute] = obj.data(attribute);
                    } else {
                        customSettingsObj[attribute] = $(settings).attr(attribute);
                    }

                    if (attribute == 'fill' && obj.data('fill') != undefined) {
                        fill = true;
                    }
                });
            }

            /**
             * animate foreground circle
             * @param current
             */
             function animate(current) {
                
                //context.clearRect(0, 0, canvas.width, canvas.height);

                context.beginPath();
                context.arc(x, y, radius, endAngle, startAngle, false);

                context.lineWidth = customSettingsObj.bordersize;

                context.strokeStyle = customSettingsObj.bgcolor;
                context.stroke();

                


                if(i==calcPer){
                   fixedPer=((circ) * current) - quart + additionalAngelPI;
               }

               else if(i>calcPer)
               {
                context.beginPath();
                
                context.arc(x, y, radius, -(quart) + additionalAngelPI, fixedPer, false);


                if (customSettingsObj.border == 'outline') {
                    context.lineWidth = customSettingsObj.width + 13;
                } else if (customSettingsObj.border == 'inline') {
                    context.lineWidth = customSettingsObj.width - 13;
                }
                
                context.strokeStyle = customSettingsObj.bfgcolor;
                context.stroke();
                
                context.beginPath();
                
                context.arc(x, y, radius, fixedPer, (fixedPer+6.28)-((i-calcPer)*0.0628), true);
                if (customSettingsObj.border == 'outline') {
                    context.lineWidth = customSettingsObj.width + 13;
                } else if (customSettingsObj.border == 'inline') {
                    context.lineWidth = customSettingsObj.width - 13;
                }
                
                
                context.strokeStyle = customSettingsObj.fgcolor;
                context.stroke();
                
                
                
            }else{
                
               context.beginPath();
               
               context.arc(x, y, radius, -(quart) + additionalAngelPI, ((circ) * current) - quart + additionalAngelPI, false);

               if (customSettingsObj.border == 'outline') {
                context.lineWidth = customSettingsObj.width + 13;
            } else if (customSettingsObj.border == 'inline') {
                context.lineWidth = customSettingsObj.width - 13;
            }
            context.strokeStyle = customSettingsObj.bfgcolor;	
            context.stroke();
            
            
        }
        
        i++;
        

        if (curPerc < endPercent) {
            curPerc += curStep;
            requestAnimationFrame(function () {
                animate(Math.min(curPerc, endPercent) / 100);
            }, obj);
        }

        if (curPerc == endPercent && fireCallback && typeof(options) != "undefined") {
            if ($.isFunction(options.complete)) {
                options.complete();

                fireCallback = false;
            }
        }
    }

    animate(curPerc / 100);

});
};
}(jQuery));
