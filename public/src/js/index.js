window.onload = function() {
    $('.btn').click(function() {
        //指定的手机号
        var phone = 13231089252;
        //获取到手机号
        var numvalu = $('.num').val();
        //如果相等
        if (numvalu == phone) {
            alert('成功注册');
            $('.num').val('');
        } else {
            alert('请输入指定的手机号');
            $('.num').val('')
        }
    })
}