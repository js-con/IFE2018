'use strict'
let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
var region = document.getElementById('region-select'),
    table = document.createElement('table'),
    product = document.getElementById("product-select");

product.addEventListener('change', function() {
    table.innerHTML = '';
    render(select());
})
region.addEventListener('change', function() {
    table.innerHTML = '';
    render(select());
})

function select() {
    var data = [],
        regionArr = ['华东', '华北', '华南'],
        productArr = ['手机', '笔记本', '智能音箱'],
        regionKey = 0,
        productKey = 0;
    for (let i = 1; i < 4; i++) {
        if (region.options[i].selected) {
            for (let j = 0; j < sourceData.length; j++) {
                if (sourceData[j].region == regionArr[regionKey]) {
                    data.push(sourceData[j]);
                }
            }
        }
        regionKey++;
    }
    for (let i = 1; i < 4; i++) {
        if (product.options[i].selected) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].product != productArr[productKey]) {
                    data.splice(j--, 1);
                }
            }
        }
        productKey++;
    }
    return data;
}

function render(data) {
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
    for (let i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        var str1 = '<td>' + data[i].product + '</td>' + '<td>' + data[i].region + '</td>';
        var str2 = '';
        for (let j = 0; j < data[i].sale.length; j++) {
            str2 += '<td>' + data[i].sale[j] + '</td>';
        }
        tr.innerHTML = str1 + str2;
        table.appendChild(tr);
    }
}