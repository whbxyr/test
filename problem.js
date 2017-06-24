var path = require('path');

console.log(__dirname);

var path01 = path.join(__dirname, '../', 'hha');

var path02 = path.resolve(__dirname, '../', 'hha');

console.log(path01);

console.log(path02);

console.log(path.join('a', 'b1', '..', 'b2'));

console.log(path.resolve('a', 'b1', '..', 'b2'));

console.log(path.join(__dirname, '/name'));

console.log(path.resolve(__dirname, './name'));

console.log(path.resolve(__dirname, '/name'));


// 字符串转时间
function stringToDate(format, string) {
    if (null == format)
        format = "yyyy-MM-dd hh:mm:ss";
    var pattern = format.replace("yyyy", "(\\d{4})")
        .replace("MM", "(\\d{1,2})").replace("dd", "(\\d{1,2})").replace(
            " ", "(\\s{1})").replace("hh", "(\\d{1,2})").replace("mm",
            "(\\d{1,2})").replace("ss", "(\\d{1,2})");

    var returnDate;
    if (new RegExp(pattern).test(string)) {
        var yPos = format.indexOf("yyyy");
        var mPos = format.indexOf("MM");
        var dPos = format.indexOf("dd");
        var hPos = format.indexOf("hh");
        var mmPos = format.indexOf("mm");
        var sPos = format.indexOf("ss");
        var pos = new Array(yPos + " y", mPos + " m", dPos + " d", hPos + " h",
            mmPos + " mm", sPos + " s");
        var data = {
            y: 0,
            m: 0,
            d: 1,
            h: 0,
            mm: 0,
            s: 0
        };
        var m = string.match(pattern);
        var step = 1;
        for (var i = 1; i < m.length; i++) {
            if (i == 4) {
                step++;
                continue;
            }
            var _pos = pos[i - step];
            if (_pos) {
                var flag = pos[i - step].split(' ')[1];
                data[flag] = m[i];
            }
        }
        if (data.y.toString().length == 2) {
            data.y = parseInt("20" + data.y);
        }
        data.m = data.m - 1;
        returnDate = new Date(data.y, data.m, data.d, data.h, data.mm, data.s);
    } else {
        console.log("数据格式验证失败")
    }
    return returnDate;
}

var getUuid = function () {
    var uuids = [];

    function uuid() {
        var uuid = null;
        do {
            var d = new Date().getTime();
            uuid = d.toString(16) + '-xxxxxxyyxxxx';
            uuid = uuid.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
        } while (uuids.indexOf(uuid) != -1);
        uuids.push(uuid);
        return uuid;
    }

    getUuid = uuid;
    return getUuid();
}

///集合取交集
Array.intersect = function () {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            }
            else {
                obj[str]++;
                if (obj[str] == arguments.length) {
                    result.push(str);
                }
            }//end else
        }//end for j
    }//end for i
    return result;
}