function bar(data) {
    var svg = document.getElementsByTagName('svg')[0];

    //清空画布
    svg.innerHTML = '';

    function Rect(data, args) {
        //矩形类
        this.data = data;
        this.Xitv = args.Xitv;
        this.Yitv = args.Yitv;
        this.Xline = args.Xline;
        this.Yline = args.Yline;
        this.itvWidth = args.Xline * 0.8 / data.length * 0.4;
        this.width = args.Xline * 0.8 / data.length * 0.6;
        this.height = [];
        //根据纵轴长度与元素数组最大值计算出单个元素的相对高度
        for (let i = 0; i < data.length; i++) {
            this.height[i] = data[i] * args.Yline / Math.max(...data);
        }
    }
    Rect.prototype = {
        constructor: Rect,
        render: function() {
            var rect = ``;
            for (let i = 0; i < this.data.length; i++) {
                rect += `<rect x="${this.itvWidth*(i+1)+this.Xitv+this.width*i}" y="${this.Yitv+this.Yline-this.height[i]}" width="${this.width}" height="${this.height[i]}"
                style="fill:blue;stroke-width:2;
                fill-opacity:0.5;stroke-opacity:0.9"/>`
            }
            return rect;
        }
    }

    function Line(startX, startY, endX, endY, width) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.width = width;
    }
    Line.prototype = {
        constructor: Line,
        render: function() {
            var line = `<line x1="${this.startX}" x2="${this.endX}" y1="${this.startY}" y2="${this.endY}"
            style="stroke:rgb(99,99,99);stroke-width:${this.width}"/>`;
            return line;
        }
    }
    var lineX = new Line(50, 275, 550, 275, 2);
    var lineY = new Line(50, 275, 50, 25, 2);
    svg.innerHTML = lineX.render() + lineY.render();

    var rect1Args = {
        Xitv: 50,
        Yitv: 25,
        Xline: 500,
        Yline: 250
    }
    var rect1 = new Rect(data, rect1Args);
    svg.innerHTML += rect1.render();

}