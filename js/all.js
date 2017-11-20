
var list = document.querySelector('.list');
var stock = JSON.parse(localStorage.getItem('memory')) || [];

var updateList = function (item) {
    var str = '';
    var len = item.length;
    for (var i = 0; i < len; i++) {
        if(item[i].finish == true){
            str += '<li class="clearfix end"><div class="check"><span class="fa fa-check fa-2x" data-val="' + i + '"></span></div><del class="delete" style="text-decoration: line-through; text-decoration-color: #000;">' + item[i].content + '</del><div class="cancel"><a href="#" data-num="' + i + '">&#xf00d;</a></div></li>';
        }else{
            str += '<li class="clearfix standby"><div class="check"><span class="fa fa-2x" data-val="' + i + '"></span></div><del class="delete">' + item[i].content + '</del><div class="cancel"><a href="#" data-num="' + i + '">&#xf00d;</a></div></li>';
        }
    }
    list.innerHTML = str;
};

updateList(stock);

// ↑↑↑ --- localStorage content loading --- ↑↑↑

var add = document.querySelector('.btn');
var enter = document.querySelector('.text');

var addList = function (e) {
    e.preventDefault();
    var thing = document.querySelector('.text').value;
    var file = { content: thing, finish: false };
    stock.push(file);
    updateList(stock);
    localStorage.setItem('memory', JSON.stringify(stock));
};

var enterList = function (e) {
    if(e.keyCode == 13){
        e.preventDefault();
        var thing = document.querySelector('.text').value;
        var file = { content: thing, finish: false };
        stock.push(file);
        updateList(stock);
        localStorage.setItem('memory', JSON.stringify(stock));
        e.currentTarget.value = '';
    }
}

add.addEventListener('click', addList, false);
enter.addEventListener('keypress', enterList, false);

// ↑↑↑ --- todos addition, update localStorage --- ↑↑↑

window.addEventListener('pageshow', function () {
    if (this.innerWidth < 400) {
        add.value = '+';
    } else {
        add.value = 'add';
    }
}, false);

window.addEventListener('resize', function () {
    if (this.innerWidth < 400) {
        add.value = '+';
    } else {
        add.value = 'add';
    }
}, false);

// ↑↑↑ --- button change (based on innerWidth) --- ↑↑↑

var control = {
    'all': true,
    'active': false,
    'completed': false
};

$(document).ready(function(){
    
    $('.btn').click(function () {
        $('.text').val('');
    });
    
    // ↑↑↑ --- input clear --- ↑↑↑

    $('.active').click(function(){
        $('.end').hide();
        $('.standby').show();
        $('.active').removeClass('on');
        $('.active').addClass('off'); 
        $('.completed').removeClass('off');
        $('.completed').addClass('on');
        $('.all').removeClass('off');
        $('.all').addClass('on');
        control.all = false;
        control.active = true;
        control.completed = false;   
    });
    $('.completed').click(function(){
        $('.standby').hide();
        $('.end').show();
        $('.completed').removeClass('on');
        $('.completed').addClass('off');
        $('.active').removeClass('off');
        $('.active').addClass('on'); 
        $('.all').removeClass('off');
        $('.all').addClass('on');
        control.all = false;
        control.active = false;
        control.completed = true;  
    });
    $('.all').click(function(){
        $('.end').show();
        $('.standby').show();
        $('.all').removeClass('on');
        $('.all').addClass('off');
        $('.active').removeClass('off');
        $('.active').addClass('on');
        $('.completed').removeClass('off');
        $('.completed').addClass('on');
        control.all = true;
        control.active = false;
        control.completed = false;  
    });

    // ↑↑↑ --- footer button functions (show/hide)--- ↑↑↑
    
    $('.list').click(function(e){
        e.preventDefault();
        if (e.target.nodeName == 'A') {
            var num = e.target.dataset.num;
            stock.splice(num, 1);
        } else if (e.target.nodeName == 'SPAN') {
            var val = e.target.dataset.val;
            if (stock[val].finish) {
                stock[val].finish = false;
            } else {
                stock[val].finish = true;
            }
        } else { return; }
        localStorage.setItem('memory', JSON.stringify(stock));
        updateList(stock);
        if (control.active == true) {
            $('.end').hide();
        } else if (control.completed == true) {
            $('.standby').hide();
        } else { return; }
    });
    
    // ↑↑↑ --- check/delete list --- ↑↑↑

});


