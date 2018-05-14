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
            //$(".newImg").attr("src", "/"+data.filePath);
            console.log("data.filePath =",data.filePath);
        },
        error: function (err) {
            console.log(err.message);
        }
    })
}


function addProdcut() {

    let imgPath = document.getElementById("newPic").src.toString();
    let productName =  document.getElementById("productName").value;
    let productInfo =  document.getElementById("productInfo").value;
    let productPrice =  document.getElementById("productPrice").value;
    let productStock = document.getElementById("productStock").value;
    console.log("cloud imgPath="+imgPath);
    console.log(productName);
    console.log(productInfo);
    console.log(productStock)

    product_json = {"productName":productName, "productInfo":productInfo, "productPrice":productPrice, "productStock":productStock,"imgPath":imgPath};


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
    var pid = delpid.toString().substr(4).toLowerCase();
    console.log("delpid=");
    console.log(pid);
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


function editProduct(){


    var pid = document.getElementById("pid").innerText;
    var selleruid = document.getElementById("selleruid").innerText;

    //let index = document.getElementById("newPic").src.search("uploads");
    //let imgPath = document.getElementById("newPic").src.toString().substr(index-1);
    let imgPath = document.getElementById("newPic").src.toString();
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").value;
    var productInfo = document.getElementById("productInfo").value;
    var productStock = document.getElementById("productStock").value;



    // // var pid = editpid.toString().substr(4);
    // console.log("pid="+pid);
    // console.log("-------------------- imgPath="+imgPath);
    // console.log("productName="+productName);
    // console.log("productPrice="+productPrice);
    // console.log("productInfo="+productInfo);
    console.log("edit productStock="+productStock);

    edit_json = {"pid":pid, "selleruid":selleruid,"productName":productName, "productInfo":productInfo, "productPrice":productPrice, "productStock":productStock,"imgPath":imgPath};


    $.ajax({
        type: 'POST',
        url: '/editproductprocess',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(edit_json),
        success: function (data) {
            console.log("Edit product success frontend");
            if (data.msg){
                window.location.href="/single/showproduct?pid="+data.msg;
            }
        },
        error: function (err) {
            console.log(err.message);
        }
    })

}

function addToCart(){
    var rawpid = document.getElementById("showpid").innerText;
    var pid = rawpid.toString().substr(4).toLowerCase();

    var uid = document.getElementById("uid").innerText.toLowerCase();
    var selleruid = document.getElementById("selleruid").innerText.toLowerCase();
    // console.log("addtoCartJS uid ="+ uid);
    // console.log("----------- addtoCartJS selleruid ="+ selleruid);


    var productName = document.getElementById("showproductName").innerText;
    var productInfo = document.getElementById("showproductInfo").innerText;
    var productPrice = document.getElementById("showproductPrice").innerText.toString();
    // console.log("addtoCartJS productPrice="+productPrice);

    //let index = document.getElementById("showpimgPath").src.search("uploads");
    var imgPath = document.getElementById("showpimgPath").src.toString();
    var number = document.getElementById("shownumber").value;
    // var number = 1;

    // console.log("add pid =");
    // console.log(pid);
    // console.log(productName);
    // console.log(productInfo);
    // console.log(productPrice);
    console.log("/***** addproduct number =" + number);


    addToCart_json = {
        pid:pid, 
        uid:uid, 
        selleruid:selleruid, 
        productName:productName, 
        productInfo:productInfo,
        productPrice:productPrice,
        imgPath:imgPath,
        number:number
    };

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

                var itemNum = parseInt(document.getElementById("simpleCart_quantity").innerText) + parseInt(number);
                console.log("itemNum=",itemNum);
                document.getElementById("simpleCart_quantity").innerText = itemNum;

                window.location='http://localhost:3000/single/showproduct?pid='+pid;

            }
        },
        error: function (err) {
            console.log(err.message);
        }
    });
}

function searchByPrice(){
    console.log("----- searchBy price")
    var min = parseFloat(document.getElementById("min").value);
    var max = parseFloat(document.getElementById("max").value);

    console.log(searchInfo);
    if (min>=max){
        window.alert("Invalid input. Min must larger than Max. ");
    }else{

        $.ajax({
            type: 'GET',
            url: '/search?searchInfo='+searchInfo+'&min='+min+'&max='+max,
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(),
            success: function (data) {
                // console.log("success delete frontend!!!");
                // console.log(data.msg);
                if (data.msg){
                    var searchresult = data.searchresult;
                    window.alert("Search min max successfully..");
                    window.location.href = '/search?searchInfo='+searchInfo+'&min='+min+'&max='+max;
                }
            },
            error: function (err) {
                console.log(err.message);
            }
        });


    }






}
