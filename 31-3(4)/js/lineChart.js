function line(data) {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    //清空画布(重设宽高可清空画布)
    canvas.height = canvas.height;
    //画坐标轴
    ctx.beginPath();
    ctx.moveTo(50, 275);
    ctx.lineTo(550, 275);
    ctx.moveTo(50, 275);
    ctx.lineTo(50, 25);
    ctx.closePath();
    ctx.stroke();

    function Point(data, args) {
        //点类
        this.ctx = args.ctx;
        this.data = data;
        this.Xline = args.Xline;
        this.Yline = args.Yline;
        this.Xitv = args.Xline * 0.8 / data.length;
        this.itvWidth = args.itvWidth;
        this.itvHeight = args.itvHeight;
    }
    Point.prototype = {
        constructor: Point,
        render: function() {
            //渲染函数
            var Xpoint = [],
                Ypoint = [];
            for (let i = 0; i < this.data.length; i++) {
                //保存坐标
                Xpoint.push(this.Xitv * (i + 1) + this.itvWidth);
                Ypoint.push(this.Yline - this.data[i] * this.Yline / Math.max(...this.data) + this.itvHeight);
                //画圆
                this.ctx.arc(Xpoint[i], Ypoint[i], 5, 0, Math.PI * 2, true);
            }
            //坐标连线
            this.ctx.beginPath();
            for (let i = 0; i < this.data.length; i++) {
                this.ctx.moveTo(Xpoint[i], Ypoint[i]);
                this.ctx.lineTo(Xpoint[i + 1], Ypoint[i + 1]);
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }
    var argsObj = {
        Xline: 500,
        Yline: 250,
        ctx: ctx,
        itvWidth: 50,
        itvHeight: 25
    }
    var point = new Point(data, argsObj);
    point.render();
}