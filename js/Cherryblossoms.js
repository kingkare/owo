//樱花
 
var stop, staticx;
var img = new Image();
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8xMy8xNLiUmXMAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAADhklEQVQ4jbWUz2scVRTHP+fOvTNZd5OujVtMW0qsRolKnEpBPwiiYCEtWkqRglgQxQ/wIroTBcGriXgQ/LOyi3YuCtZFSxZK/FKEiHYh2uImVmxtN9ndzM7OfTwzt5M222w7i97VAwPz3r3f87n3nHvve/g/j00x+38B7gHeB04Ad4FfgeuA18v8vwH3gF8y2e5j40/vYnZ+lu8v/4IA14FPgJeA8f8K+G42233q6IkTvPLyMcanJjh85DDVapWFhQfMzd1hYf4uU1NTrK6u8uOPP/LpZ58yO/s1X371Jc+cPs3ExAT37t3j7t27XF1aZHx8nFqtxtraGg8ePOCEbw8w0263f3/++ec5d+4clUqFKIpIkoRyuUy9XufYsWO88MILXLhwgVdffZWD4+NMTk6yubnJ0tISW1tbbG1t8cEH7/Pee+/RarVotVpcuXKFMAzZ2dkZAF4HfgT6A/Dk5UuXmJmZ4cKFCwRBQLlcplwuk2UZcRyTZZdJkgTf9ymVShQKBUEQcObMGSqVCr7v4/s+YRhSKpUYHR0lDEMajQZ112V3d/f7vV7vM+BBf2J+fv4y8H61WqVarVKtVqlUKhQKBXzfJ0kSCoWC/KxYLOI4DkmSkCQJQRAQBAGFQoE4jgmCgDiOKRaLBEFAHMdEUUSr1eLKlSs/A98AP/Qnfnn58hV3eHisMj4+zubmJq7r4rouWZahqiqKomCaJpqmYZomqqqiqiqapqFpGqZpYts2tm1jmibFYhHDMNA0DVVV0TSNzc1Nzp8//x3wDfDdgO+7u7s/WJa1t7e3h23b2LaNZVkYhoFhGNi2jWEYWJaFZVkYhoFhGNi2TblcRlEUFEVBVVVUVUVVVUzTRFExtm1jGAaWZVGr1bi2tHQZ+BH4cQBcB75wHOeNMAwJwxDHcQjDkDAMCYKAOI7lZ0EQyM+CIMBxHIrFIlmWkScJcRyTJMkAdxzHBEFArVbj2rVrfwI/Aj8P6t63gS+CIAiSJCGOY3zfl58+vu/Lz4IgwPd94jgmiiL52fF9X36eJAnlcpkwDLl+/TpBEGwDfwL3B7X/GfC+53lPZFlGkiTy44g8S/i+jxMExHFMlmWy7D5JkpBlGVEUyc+O7/vy8yRJKJfLhGHIzMwMQRCsA38Cdwfo/gR86Hnes47j4DgOjuPIz+M4lqX3/wB8B9wBfgL+HAAa8G42233q6IkT/wT8KzEyWuk137uAAAAAAElFTkSuQmCC";
function Sakura(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn;
}
 
Sakura.prototype.draw = function(cxt) {
    cxt.save();
    var xc = 40 * this.s / 4;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, 35 * this.s, 35 * this.s)
    //樱花大小
    cxt.restore();
}
 
Sakura.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr');
        if (Math.random() > 0.4) {
            this.x = getRandom('x');
            this.y = 0;
            this.s = getRandom('s');
            this.r = getRandom('r');
        } else {
            this.x = window.innerWidth;
            this.y = getRandom('y');
            this.s = getRandom('s');
            this.r = getRandom('r');
        }
    }
}
 
SakuraList = function() {
    this.list = [];
}
SakuraList.prototype.push = function(sakura) {
    this.list.push(sakura);
}
SakuraList.prototype.update = function() {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
    }
}
SakuraList.prototype.draw = function(cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
    }
}
SakuraList.prototype.get = function(i) {
    return this.list[i];
}
SakuraList.prototype.size = function() {
    return this.list.length;
}
 
function getRandom(option) {
    var ret, random;
    switch (option) {
    case 'x':
        ret = Math.random() * window.innerWidth;
        break;
    case 'y':
        ret = Math.random() * window.innerHeight;
        break;
    case 's':
        ret = Math.random();
        break;
    case 'r':
        ret = Math.random() * 6;
        break;
    case 'fnx':
        random = -0.5 + Math.random() * 1;
        ret = function(x, y) {
            return x + 0.5 * random - 0.6;
            //x轴速度
        }
        ;
        break;
    case 'fny':
        random = 0.8 + Math.random() * 0.7
        //y轴速度
        ret = function(x, y) {
            return y + random;
        }
        ;
        break;
    case 'fnr':
        random = Math.random() * 0.03;
        ret = function(r) {
            return r + random;
        }
        ;
        break;
    }
    return ret;
}
 
function startSakura() {
 
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement('canvas'), cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
    canvas.setAttribute('id', 'canvas_sakura');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    var sakuraList = new SakuraList();
    for (var i = 0; i < 10; i++) {
        //樱花数量
        var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
        randomX = getRandom('x');
        randomY = getRandom('y');
        randomR = getRandom('r');
        randomS = getRandom('s');
        randomFnx = getRandom('fnx');
        randomFny = getRandom('fny');
        randomFnR = getRandom('fnr');
        sakura = new Sakura(randomX,randomY,randomS,randomR,{
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        sakura.draw(cxt);
        sakuraList.push(sakura);
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee);
    })
}
 
window.onresize = function() {
    var canvasSnow = document.getElementById('canvas_snow');
    canvasSnow.width = window.innerWidth;
    canvasSnow.height = window.innerHeight;
}
 
function stopp(e) {
    if (!e && document.getElementById("canvas_sakura")) {
        var child = document.getElementById("canvas_sakura");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
    } else if (e && !document.getElementById("canvas_sakura")) {
        startSakura();
    }
}
window.addEventListener("DOMContentLoaded",
startSakura);
