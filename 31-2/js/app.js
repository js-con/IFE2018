btn.onclick = function() {
    //每次点击重置table
    table.innerHTML = '';
    render(select());
}