function checkbox(e, box, checkall) {
    //如果点击的是checkbox
    if (e.target.type = 'checkbox') {
        //通过自定义属性判断点击的是否是全选
        if (e.target.getAttribute('checkbox-type') == 'all') {
            //如果是全选，则其他checkbox全部勾上
            for (let i = 0; i < box.length - 1; i++) {
                box[i].checked = e.target.checked;
            }
        }
        //若点击的是其他按钮
        else {
            var count = 0;
            //判断此时单选按钮勾上的个数
            for (let j = 0; j < box.length - 1; j++) {
                if (box[j].checked == true) {
                    count++;
                }
            }
            //若此时全部勾上，则把全选勾上，反之取消全选
            if (count == box.length - 1) {
                checkall.checked = true;
            } else if (count < box.length - 1) {
                checkall.checked = false;
            }
            //若点击的是最后一个勾上的按钮，使点击无效
            if (count == 0) {
                e.target.checked = true;
            }
        }
    }
}