function select() {
    //根据checkbox选择从sourceData中提取数据到渲染数组data中
    var data = [],
        regdata = [],
        prodata = [],
        regionArr = ['华东', '华南', '华北'],
        productArr = ['手机', '笔记本', '智能音箱'],
        regkey = 0,
        prokey = 0;
    //将地区选项放入匹配数组中
    for (let i = 0; i < regbox.length - 1; i++) {
        if (regbox[i].checked) {
            regdata.push(regionArr[i]);
        }
    }
    //将产品选项放入匹配数组中
    for (let i = 0; i < probox.length - 1; i++) {
        if (probox[i].checked) {
            prodata.push(productArr[i]);
        }
    }
    //若sourceData中有同时满足两个匹配数组的项，则把该项放入data中
    for (let i = 0; i < sourceData.length; i++) {
        if (regdata.indexOf(sourceData[i].region) != -1 && prodata.indexOf(sourceData[i].product) != -1) {
            data.push(sourceData[i]);
        }
    }
    return data;
}