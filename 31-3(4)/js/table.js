function tableRender(data) {
    //渲染table

    //渲染表头
    table.setAttribute("border", '1');
    document.getElementById('table-wrapper').appendChild(table);
    var head = document.createElement('tr');
    var line1 = '<th>商品</th><th>地区</th>';
    var line2 = '';
    for (let i = 0; i < 12; i++) {
        line2 += `<th>${i + 1}月</th>`;
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
        tr.setAttribute('row', `${i}`);
        //循环的第一轮设置rowspan,故对i进行了限制
        //产品和地区计数某个为1或都为1时，第一轮加入rowspan
        if (procount == 1 && regcount > 1 && i == 0) {
            var str1 = '<td rowspan="3" class="pro">' + data[i].product + '</td>' + '<td class="reg">' + data[i].region + '</td>';
        } else if (regcount == 1 && procount > 1 && i == 0) {
            var str1 = '<td rowspan="3" class="reg">' + data[i].region + '</td>' + '<td class="pro">' + data[i].product + '</td>';
        } else if (regcount == 1 && procount == 1) {
            var str1 = '<td class="pro">' + data[i].product + '</td>' + '<td class="reg">' + data[i].region + '</td>';
        }
        //产品和地区计数都不为1，需要把产品合并，故根据地区计数来限制i的大小
        else if (regcount > 1 && procount > 1 && i % regcount == 0) {
            var str1 = '<td rowspan = ' + regcount + ' class="pro">' + data[i].product + '</td>' + '<td class="reg">' + data[i].region + '</td>';
        }
        //三种情况对应的子逻辑，对应i行以外的行数渲染(若计数都为1则跳过此部分)
        else if (regcount == 1 && procount > 1) {
            var str1 = '<td class="pro">' + data[i].product + '</td>';
        } else if (regcount > 1 && procount > 1) {
            var str1 = '<td class="reg">' + data[i].region + '</td>';
        } else if (procount == 1 && regcount > 1) {
            var str1 = '<td class="reg">' + data[i].region + '</td>';
        }
        //月份数据的提取
        var str2 = '';
        for (let j = 0; j < data[i].sale.length; j++) {
            str2 += `<td class='month ${j+1}'> ${ data[i].sale[j]}  </td>`;
        }
        //dom合并
        tr.innerHTML = str1 + str2;
        table.appendChild(tr);
    }

    //表格编辑
    table.addEventListener("click", function(e) {
        let oEvent = e || event;
        let target = e.target || e.srcElement;
        let editTd = table.querySelector("#edit");
        if (target.nodeName == "TD" && target.classList.contains("month") !== -1) {
            if (editTd !== null) {
                if (target.id == "") { // 存在正在编辑TD 点击到了别的TD
                    target.className += ' data-attr';
                    editTd.id = "";
                    editTd.innerHTML = num;
                } else if (target.id == "edit") { // 存在正在编辑TD 点击到该TD
                    target.className += ' data-attr';
                    target.id = "";
                    target.innerHTML = num;
                }
            } else if (editTd == null) { // 没有正在编辑的TD 点击到TD
                target.className += ' data-attr';
                num = target.innerHTML;
                target.id = "edit";
                target.innerHTML = "<input type='text' value='" + num + "'><button id='confirm'>确定</button><button id='cancel'>取消</button>";

            }
        } else if (target.id == "confirm") { // 点击到TD的“确认”按钮
            let input = target.previousSibling,
                td = target.parentNode;
            // 判断输入是否位数字
            if (!/^[0-9]+$/.test(input.value.trim())) {
                alert('空气指数为数字');
            } else {
                td.id = "";
                // 取消input输入框和按钮
                td.innerHTML = input.value;
                // 保存所有
                store();
            }
        } else if (target.id == "cancel") { // 点击到TD的“取消”按钮
            target.parentNode.id = "";
            // 取消input输入框和按钮
            target.parentNode.innerHTML = num;
        }
    });

    //鼠标悬浮 绘制图形
    table.addEventListener('mouseover', function(e) {
        if (e.target.tagName == 'TD') {
            if (e.target.getAttribute('rowspan') == 3) {
                return false;
            }
            var count = Number(e.target.parentNode.getAttribute('row'));
            if (count == 0 || count % 3 == 0) {
                var num = 2;
            } else {
                var num = 1;
            }
            var data = [];
            for (i = num; i < table.rows[count + 1].cells.length; i++) {
                table.rows[count + 1].cells[i].style.background = 'blue';
                data.push(table.rows[count + 1].cells[i].innerHTML);
            }
            e.target.addEventListener('mouseout', function(ev) {
                for (i = num; i < table.rows[count + 1].cells.length; i++) {
                    table.rows[count + 1].cells[i].style.background = '';
                }
            })
            line(data);
            bar(data);
        }
    });
}

function store() {
    let attr = document.getElementsByClassName('data-attr'),
        jsonData = [],
        proData = [],
        regData = [],
        valueData = [],
        monthData = [];
    for (let i = 0; i < attr.length; i++) {
        let td1 = attr[i].parentNode.children[0],
            td2 = attr[i].parentNode.children[1];
        valueData.push(attr[i].innerHTML);
        if (td1.className == 'pro') {
            proData.push(td1.innerHTML);
            monthData.push(attr[i].className.replace(/[^0-9]/ig, ""));
            if (td2.className == 'reg') {
                regData.push(td2.innerHTML);
            } else {
                regData.push(attr[i].parentNode.parentNode.children[1].children[0].innerHTML);
            }
        } else if (td1.className == 'reg') {
            regData.push(td1.innerHTML);
            monthData.push(attr[i].className.replace(/[^0-9]/ig, ""));
            if (td2.className == 'pro') {
                proData.push(td2.innerHTML);
            } else {
                if (attr[i].parentNode.previousElementSibling.children[0].className == 'pro') {
                    proData.push(attr[i].parentNode.previousElementSibling.children[0].innerHTML);
                } else {
                    proData.push(attr[i].parentNode.previousElementSibling.previousElementSibling.children[0].innerHTML);
                }
            }
        }
    }
    for (let i = 0; i < proData.length; i++) {
        jsonData[i] = {};
        jsonData[i].product = proData[i];
        jsonData[i].region = regData[i];
        jsonData[i].month = monthData[i];
        jsonData[i].value = valueData[i].trim();
    }
    localStorage.setItem('data-attr', JSON.stringify(jsonData));
}