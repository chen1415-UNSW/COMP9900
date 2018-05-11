function removeFromCart(i){
    console.log("i=");
    console.log(i);

    //1. 页面隐藏
    var pid = document.getElementById("pid"+i.toString()).innerText;
    console.log("pid=");
    console.log(pid);
    var uid = document.getElementById("uid").innerText;

    console.log("uid want remove ==> uid=");
    console.log(uid);

    delFromCart_json = {pid:pid,uid:uid};
    //2. 数据库删除
    $.ajax({
        type: 'POST',
        url: '/checkout/delfromcart',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(delFromCart_json),
        success: function (data) {
            if (data.msg){
                $(document).ready(function(){
                    $('.cart-header'+i.toString()).fadeOut('slow', function() {
                        $('.cart-header'+i.toString()).remove();
                    });
                });
                window.alert("delete from cart successfully.");
                window.location.href = "/checkout?uid="+uid;
            }
        },
        error: function (err) {
            console.log(err.message);
        }
    });
}

function placeorder(isSuccess, cartInfo_list) {
   // console.log("cartInfo_list=");
   // console.log(cartInfo_list);

    cartInof_json = {"flag":isSuccess, "cartInfo_list":cartInfo_list};
    $.ajax({

        type: 'POST',
        url: '/checkout',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(cartInof_json),
        success: function (data) {
            // console.log("success delete frontend!!!");
            // console.log(data.msg);
            if (data.msg){
                //
                window.alert(data.msg);
                // 未完成： 4.28 需要与订单一起

                //1.清空购物车
                //2.写入order history
                //3.跳转成功页

                // window.location.href = "/success?oid="+oid;
                // document.getElementById("simpleCart_quantity").innerText = itemNum;

            }
        },
        error: function (err) {
            console.log(err.message);
        }
});
}
// 放弃使用
function placeorder_POST(cartInfo_list) {
    
    var form = $("<form method='post'></form>");
    form.attr({"action":"/trade"});
   
    var input = $("<input type='hidden'>");
    input.attr({"name": "JSON"});
    input.val(JSON.stringify(cartInfo_list));
    form.append(input);
    console.log(cartInfo_list);
    $(document.body).append(form);
    form.submit();
}