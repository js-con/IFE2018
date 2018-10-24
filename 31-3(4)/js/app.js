btn.onclick = function() {
    //每次点击重置table
    table.innerHTML = '';
    tableRender(select());
}
region.addEventListener('click', function(e) {
    checkbox(e, regbox, checkallreg);
});
product.addEventListener('click', function(e) {
    checkbox(e, probox, checkallpro);
});