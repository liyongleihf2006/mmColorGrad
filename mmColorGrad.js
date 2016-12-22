/**
 * Created by Administrator on 2016/12/22.
 */
/*
 * 一个简单的根据传入的百分比值获取两个颜色之间的某个颜色的方法
 * fromColor和toColor是起始颜色和结束颜色,只支持RGB和HEX格式
 * percentageValue 是0~1之间的小数
 * targetType 是返回的颜色类型: HEX(hex) or RGB(rgb);default rgb;
 * */
function mmColorGrad(fromColor,toColor,percentageValue,targetType){
    var targetColors=[],
        fromColors=translate(fromColor),
        toColors=translate(toColor),
        targetType=(targetType||"").toLowerCase()||"rgb",
        length=Math.max(fromColors.length,toColors.length),
        i= 0;

    for(;i<length;i++){
        targetColors.push(getTargetValue(getValue(fromColors[i]),getValue(toColors[i]),percentageValue,i!=3));
    };
    switch (targetType){
        case "rgb":{
            if(length==4){
                return "rgba("+targetColors[0]+","+targetColors[1]+","+targetColors[2]+","+targetColors[3]+")";
            }
            return "rgb("+targetColors[0]+","+targetColors[1]+","+targetColors[2]+")";
        };
        case "hex":{
            return targetColors.reduce(function(previous,num,idx){
                return previous+(idx<3?num.toString(16):"");
            },"#");
        }
    };
    function getTargetValue(fromValue,toValue,percentageValue,shouldRound){
        var targetValue=fromValue*(1-percentageValue)+toValue*percentageValue;
        return shouldRound?Math.round(targetValue):targetValue;
    }
    function getValue(value){
        return typeof value=="undefined"?1:value
    }
    function translate(color){
        if(!/rgb|RGB/.test(color)){
            if(color.length==4){
                color=color.replace(/\w/g,function($1){
                    return $1+$1;
                });
            }
            return color.match(/\w{2}/g).map(function(str){
                return parseInt(str,16);
            })
        }else{
            return color.match(/[\.\d]+/g).map(function(str){
                return parseFloat(str,10);
            });
        }
    }
}