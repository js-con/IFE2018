function render(data) {
    //渲染table

    //渲染表头
    table.setAttribute("border", '1');
    document.getElementById('table-wrapper').appendChild(table);
    var head = document.createElement('tr');
    var line1 = '<th>商品</th><th>地区</th>';
    var line2 = '';
    for (let i = 0; i < 12; i++) {
        line2 += '<th>' + i + 1 + '月</th>';
    }
    head.innerHTML = line1 + line2;
    table.appendChild(head);

    //渲染表格

    //设置两个计数，统计两组checkbox的选择数量，写响应逻辑
    var regcount = 0,
        procount = 0;
    for (let i = 0; i < regbox.length - 1; i++) {
        if (regbox[i].checked == true) {
            regcount++;
        }
    }
    for (let i = 0; i < probox.length - 1; i++) {
        if (probox[i].checked == true) {
            procount++;
        }
    }
    //根据选项加入rowspan
    for (let i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        //循环的第一轮设置rowspan,故对i进行了限制
        //产品和地区计数某个为1或都为1时，第一轮加入rowspan
        if (procount == 1 && regcount > 1 && i == 0) {
            var str1 = '<td rowspan="3">' + data[i].product + '</td>' + '<td>' + data[i].region + '</td>';
        } else if (regcount == 1 && procount > 1 && i == 0) {
            var str1 = '<td rowspan="3">' + data[i].region + '</td>' + '<td>' + data[i].product + '</td>';
        } else if (regcount == 1 && procount == 1) {
            var str1 = '<td>' + data[i].product + '</td>' + '<td>' + data[i].region + '</td>';
        }
        //产品和地区计数都不为1，需要把产品合并，故根据地区计数来限制i的大小
        else if (regcount > 1 && procount > 1 && i % regcount == 0) {
            var str1 = '<td rowspan = ' + regcount + '>' + data[i].product + '</td>' + '<td>' + data[i].region + '</td>';
        }
        //三种情况对应的子逻辑，对应i行以外的行数渲染(若计数都为1则跳过此部分)
        else if (regcount == 1 && procount > 1) {
            var str1 = '<td>' + data[i].product + '</td>';
        } else if (regcount > 1 && procount > 1) {
            var str1 = '<td>' + data[i].region + '</td>';
        } else if (procount == 1 && regcount > 1) {
            var str1 = '<td>' + data[i].region + '</td>';
        }
        //月份数据的提取
        var str2 = '';
        for (let j = 0; j < data[i].sale.length; j++) {
            str2 += '<td>' + data[i].sale[j] + '</td>';
        }
        //dom合并
        tr.innerHTML = str1 + str2;
        table.appendChild(tr);
    }
}