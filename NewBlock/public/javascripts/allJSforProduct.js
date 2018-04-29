// <!--ajax发布pic-->
function handleUpload() {
    let file = document.getElementById("choose").files[0];
    let formData = new FormData();
    formData.append("avatar", file);
    $.ajax({
        type: 'POST',
        url: '/uploadfile',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $(".newImg").attr("src", data.filePath);
        },
        error: function (err) {
            console.log(err.message);
        }
    })
}


function addProdcut() {
    let index = document.getElementById("newPic").src.search("uploads");

    let imgPath = document.getElementById("newPic").src.toString().substr(index-1);
    let productName =  document.getElementById("productName").value;
    let productInfo =  document.getElementById("productInfo").value;
    let productPrice =  document.getElementById("productPrice").value;
    console.log(imgPath);
    console.log(productName);
    console.log(productInfo);
    console.log(productPrice);
    product_json = {"productName":productName, "productInfo":productInfo, "productPrice":productPrice, "imgPath":imgPath};


    $.ajax({
        type: 'POST',
        url: '/addproductprocess',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(product_json),
        success: function (data) {
            console.log("add product success frontend!!!");
            if (data.msg){
                window.location.href="/single/showproduct?pid="+data.msg;
            }
        },
        error: function (err) {
            console.log(err.message);
        }
    })

}

function deleteProduct(){
    var delpid = document.getElementById("showpid").innerText;
    var pid = delpid.toString().substr(4);
    // console.log("delpid=");
    // console.log(pid);
    delete_json = {delpid:pid};
    $.ajax({
        type: 'POST',
        url: '/single/delete',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(delete_json),
        success: function (data) {
            // console.log("success delete frontend!!!");
            // console.log(data.msg);
            if (data.msg){
                window.alert("Delete product successfully. Redirect you to home page.");
                window.location.href = "/index";
            }
        },
        error: function (err) {
            console.log(err.message);
        }
    });

}

// 4.23 未完待续
function editProduct(){
    var editpid = document.getElementById("showpid").innerText;
    var pid = editpid.toString().substr(4);
    console.log("editpid=");
    console.log(pid);
}

function addToCart(){
    var rawpid = document.getElementById("showpid").innerText;
    var pid = rawpid.toString().substr(4).toLowerCase();

    var uid = document.getElementById("uid").innerText.toLowerCase();
    var selleruid = document.getElementById("selleruid").innerText.toLowerCase();
    console.log("addtoCartJS uid ="+ uid);
    console.log("addtoCartJS selleruid ="+ selleruid);

    var productName = document.getElementById("showproductName").innerText;
    var productInfo = document.getElementById("showproductInfo").innerText;
    var productPrice = document.getElementById("showproductPrice").innerText.toString().substr(2);

    let index = document.getElementById("showpimgPath").src.search("uploads");
    var imgPath = document.getElementById("showpimgPath").src.toString().substr(index-1)
    var number = 1;

    console.log("add pid =");
    console.log(pid);
    console.log(productName);
    console.log(productInfo);
    console.log(productPrice);
    console.log(imgPath);
    // 备注：因为没有session，so先模拟一个 uid
    // var uid = document.getElementById("uid").innerText;
    // console.log("add uid =");
    // console.log(uid);

    addToCart_json = {pid:pid, uid:uid, selleruid:selleruid, productName:productName, productInfo:productInfo,productPrice:productPrice,imgPath:imgPath,number:number};

    $.ajax({
        type: 'POST',
        url: '/single/addtocart',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(addToCart_json),
        success: function (data) {
            // console.log("success delete frontend!!!");
            // console.log(data.msg);
            if (data.msg){
                // 向 header的cart 加入 +1，加金额
                window.alert("add to cart successfully.");

                var itemNum = parseInt(document.getElementById("simpleCart_quantity").innerText) + 1;
                console.log("itemNum=",itemNum);
                document.getElementById("simpleCart_quantity").innerText = itemNum;

            }
        },
        error: function (err) {
            console.log(err.message);
        }
    });





}
