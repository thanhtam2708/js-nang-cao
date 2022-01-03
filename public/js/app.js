window.app = {
    apiUrl: "http://localhost:3000/",
    getMenu: function () {

        fetch(this.apiUrl + "categories")
            .then((responseData) => responseData.json()
            )
            .then(data => {
                let menuContent = data.map(function (element) {
                    return `
                        <tr>
                            <td>${element.id}</td> 
                            <td>${element.name}</td>
                            <td>
                                <a href="editCate.html?id=${element.id}" onclick="app.getEditCate()" class="btn btn-sm btn-primary">Sửa</a>
                                <a onclick="app.removeCate(${element.id})" href="javascript:void(0);"
                                    class="btn btn-sm btn-danger">Xóa</a>
                            </td>
                         </tr>`;
                });

                document.querySelector('#cate_form').innerHTML = menuContent.join('');
            })
    },
    addCate: function () {
        var name = document.querySelector('#name').value;
        if (name == '') {
            document.querySelector('#error_name').innerText = "Hãy nhập tên";
        } else {
            fetch(this.apiUrl + "categories",
                {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name
                    }),
                })
                .then(responseData => responseData.json())
                .then((data) => {
                    window.location.href = 'cates.html';
                })
        }

    },
    removeCate: function (id) {
        fetch(`http://localhost:3000/categories/${id}`, {
            method: 'delete'
        }).then(reponseData => reponseData.json())
            .then(data => {
                window.location.href = 'cates.html';
            })
    },
    getEditCate: function () {
        const id = app.getQueryStringParam('id');
        console.log(id);
        fetch(`http://localhost:3000/categories/${id}`)
            .then(responseData => responseData.json())
            .then(data => {
                document.querySelector('#name').value = data.name;

            })
    },
    updateCate: function () {
        const id = app.getQueryStringParam('id');
        var name = document.querySelector('#name').value;
        fetch(this.apiUrl + `categories/${id}`,
            {
                method: 'put',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name
                }),
            })
            .then(responseData => responseData.json())
            .then(data => {
                window.location.href = 'cates.html';
            })
    },
    getProductData1: function () {
        //const productId = app.getQueryStringParam('id');
        fetch(`http://localhost:3000/products?_expand=category`)
            .then(response => response.json())
            .then(data => {
                let productContent = data.map(function (element) {
                    return ` 
                        <tr>
                            <td>${element.id}</td>
                            <td>${element.name}</td>
                            <td> ${element.category.name}</td>
                            <td>${element.price}</td>
                            <td><img src="${element.image}" alt="" width = '200' height ='200'></td>
                            <td>${element.detail}</td>
                            <td>
                            <a href="editPro.html?id=${element.id}" onclick="app.getEditProduct()" class="btn btn-primary">Sửa</a>
                                <a onclick="app.removeProduct(${element.id})" href="javascript:void(0);"
                                class="btn btn-danger">Xóa</a>
                            </td>
                        </tr> `;
                }).join('');
                document.querySelector('.products').innerHTML = productContent;

            })

    },
    removeProduct: function (id) {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'delete'
        }).then(reponseData => reponseData.json())
            .then(data => {
                window.location.href = 'products.html';
            })
    },
    getCate: function () {
        fetch(this.apiUrl + "categories")
            .then(responseData => responseData.json())
            .then(data => {
                let category = data.map(function (element) {
                    return `
                    <option value="${element.id}">${element.name}</option>
                        `;
                }).join('');
                document.querySelector('#categoryId').innerHTML = category;
            })
    },
    addProduct: function () {
        var name = document.querySelector('#name').value;
        var image = document.querySelector('#image').value;
        var categoryId = document.querySelector('#categoryId').value;
        var price = document.querySelector('#price').value;
        var detail = document.querySelector('#detail').value;
        // if(name == ''){
        //     document.querySelector('#tb_name').innerText = "Bạn chưa nhập tên";
        // }else if(image == ''){
        //     document.querySelector('#tb_image').innerText = "Bạn chưa nhập ảnh";
        // }else if(price == ''){
        //     document.querySelector('#tb_price').innerText = "Bạn chưa nhập giá";
        // }else if(detail == ''){
        //     document.querySelector('#tb_detail').innerText = "Bạn chưa nhập chi tiết";
        // }else{

        fetch(`http://localhost:3000/products`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, image, categoryId, price, detail
                }),

            })
            .then(reponseData => reponseData.json())
            .then(data => {

                window.location.href = 'products.html';
            })
        // }
    },
    getEditProduct: function () {
        const id = app.getQueryStringParam('id');
        console.log(id);
        fetch(`http://localhost:3000/products/${id}`)
            .then(responseData => responseData.json())
            .then(data => {
                document.querySelector('#name').value = data.name;
                document.querySelector('#categoryId').value = data.categoryId;
                document.querySelector('#detail').value = data.detail;
                document.querySelector('#image').value = data.image;
                document.querySelector('#price').value = data.price;
            })
    },
    updateProduct: function () {
        const id = app.getQueryStringParam('id');
        var name = document.querySelector('#name').value;
        var image = document.querySelector('#image').value;
        var categoryId = document.querySelector('#categoryId').value;
        var detail = document.querySelector('#detail').value;
        var price = document.querySelector('#price').value;
        fetch(this.apiUrl + `products/${id}`,
            {
                method: 'put',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    image,
                    categoryId,
                    detail,
                    price
                }),
            })
            .then(responseData => responseData.json())
            .then(data => {
                window.location.href = 'products.html';
            })
    },
    getProductData: function () {
        const productId = app.getQueryStringParam('product_id');
        fetch(`http://localhost:3000/products/${productId}`)
            .then(responseData => responseData.json())
            .then(data => {
                let dataPro = Array(data); console.log(dataPro);
                let productContent = dataPro.map(function (element) {
                    return `<div class="col-4">
                            <div class="card" style="width: 100%;">
                                <img src="${element.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">
                                    <a href="chi-tiet.html?product_id=${element.id}">${element.name}</a>    
                                </h5>
                                <p class="card-text">${element.detail}</p>
                                <p class="card-text">${element.price}</p>
                                <a href="chi-tiet.html?product_id=${element.id}" class="btn btn-primary">Chi tiết</a>
                                <a href="edit-san-pham.html?product_id=${data.id}">Sửa</a>
                                <a href="javascript:void(0);" onclick="removeProduct(${data.id})">Xóa</a>
                                </div>
                            </div>
                        </div>`;
                }).join('');
                document.querySelector('.list-products').innerHTML = productContent;

                fetch(`http://localhost:3000/products?categoryId=${data.categoryId}&id_ne=${productId}`)
                    .then(responseData1 => responseData1.json())
                    .then(data1 => {
                        console.log(data.categoryId)
                        let productContent1 = data1.map(function (element) {
                            return `<div class="col-4">
                            <div class="card" style="width: 100%;">
                                <img src="${element.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">
                                    <a href="chi-tiet.html?product_id=${element.id}">${element.name}</a>    
                                </h5>
                                <p class="card-text">${element.detail}</p>
                                <p class="card-text">${element.price}</p>
                                <a href="chi-tiet.html?product_id=${element.id}" class="btn btn-primary">Chi tiết</a>
                                </div>
                            </div>
                        </div>`;
                        }).join('');
                        document.querySelector('.list-products-data').innerHTML = productContent1;
                    })
            })
    },


    getQueryStringParam: function (name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    //lấy data index
    getListMenu: function () {
        fetch(this.apiUrl + "categories")
            .then(responseData => responseData.json())
            .then(data => {
                let listMenu = data.map(function (element) {
                    return `
                        <li><a href="#">${element.name}</a></li>`;
                }).join('');
                document.querySelector('#list_menu').innerHTML = listMenu;
            })
    },
    getListProduct: function () {
        fetch(`http://localhost:3000/products`)
            .then(responseData => responseData.json())
            .then(data => {
                console.log(data);
                let list_products = data.map(function (element) {
                    return ` <div class="col-lg-3 col-md-4 col-sm-6 mix women">
                                <div class="product__item">
                                    <img src="${element.image}" style="width:250px; height:250px;"/>
                                    <div class="product__item__text">
                                        <h6><a href="product_detail.html?product_id=${element.id}">${element.name}</a></h6>
                                        <div class="rating">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="product__price">${element.price}</div>
                                    </div>
                                </div>
                            </div>`;
                }).join('');
                document.querySelector('#list_products').innerHTML = list_products;
            })
    },
    getProductDetail: function () {
        const productId = app.getQueryStringParam('product_id');
        fetch(`http://localhost:3000/products/${productId}?_expand=category`)
            .then(responseData => responseData.json())
            .then(data => {
                let dataPro = Array(data); console.log(dataPro);
                let productContent = dataPro.map(function (element) {
                    return `<div class="col">
                                <img src="${element.image}" alt="">
                            </div>
                            <div class="col">
                                <h2 class="text-3xl font-bold">${element.name}</h2>
                                <span class="flex mt-5">
                                    <p class="text-2xl font-bold">${element.price}đ</p>
                                </span>

                                <span class="flex mt-2">
                                    <p><span class="text-gray-700">Danh mục :</span>${element.category.name}</p>
                                </span>

                                <span class="flex mt-2">
                                    <p class="text-gray-700">Share :</p>
                                    <div class="ml-5">
                                        <a href="" class="px-2"><i class="fab fa-facebook-f"></i></a>
                                        <a href="" class="px-2"><i class="fab fa-twitter"></i></a>
                                        <a href="" class="px-2"><i class="fab fa-linkedin-in"></i></a>
                                        <a href="" class="px-2"><i class="fab fa-pinterest-p"></i></a>
                                        <a href="" class="px-2"><i class="fab fa-reddit"></i></a>

                                    </div>
                                </span>
                                <hr class="mt-8">
                                <div class="mt-5 md:flex">
                                    <div class="flex">
                                       
                                            <input type="number" name="" id="" value="1" min="1" style="width:50px;">
                                            <button class="btn btn-warning" data-id="${element.id}" data-img="${element.image}" onclick="app.add2Cart(${element.id}, 
                                                '${element.name}', 
                                                '${element.image}', 
                                                ${element.price}, 
                                                ${element.categoryId}, 
                                                '${element.category.name}')">Thêm giỏ hàng</button>
                                       
                                        <a href="" class="p-4">
                                            <p class="text-lg border-b border-black">Description</p>
                                        </a>
                                        <p class="mt-10">${element.detail} </p>
                                    </div>
                                </div>
                            </div>`;
                }).join('');
                document.querySelector('#product_detail').innerHTML = productContent;
            })
    },
    add2Cart: function (id, name, image, price, cateId, cate_name) {

        let cartStorage = sessionStorage.getItem('cart');
        let screenCart = null;
        if (cartStorage == null) {
            screenCart = [];
        } else {
            screenCart = JSON.parse(cartStorage);
        }
        console.log(typeof cartStorage, typeof screenCart);

        let item = {
            id: id,
            name: name,
            image: image,
            price: price,
            cateId: cateId,
            cate_name: cate_name
        };

        let existed = screenCart.findIndex(ele => ele.id == item.id);


        if (existed == -1) {
            item.quantity = 1;
            screenCart.push(item);
        } else {
        }

        sessionStorage.setItem('cart', JSON.stringify(screenCart));
        // document.querySelector('a#menu_cart_total').innerText = `Giỏ hàng (${this.getTotalItemOnCart()})`;
        // alert("Cập nhật sản phẩm vào giỏ hàng thành công!");
    },
    getTotalItemOnCart: function () {
        let cartStorage = sessionStorage.getItem('cart');
        let screenCart = null;
        if (cartStorage == null) {
            screenCart = [];
        } else {
            screenCart = JSON.parse(cartStorage);
        }
        let totalItem = 0;
        screenCart.forEach(element => {
            totalItem += element.quantity;
        });

        return totalItem;
    },
    getCart: function () {
        let cartStorage = sessionStorage.getItem("cart");
        let screenCart = null;
        if (cartStorage == null) {
            screenCart = [];
        } else {
            screenCart = JSON.parse(cartStorage);
        }
        console.log(screenCart);
        const productContent = screenCart
            .map(function (element) {
                return `
            <tbody>
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-sm-2 hidden-xs"><img
                                    src="${element.image}"
                                    alt="Sản phẩm 1" class="img-responsive" width="100">
                            </div>
                            <div class="col-sm-10">
                                <h4 class="nomargin">${element.name}</h4>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">${element.price}đ</td>
                    <td data-th="Quantity"><input class="form-control text-center" value="1" type="number">
                    </td>
                    <td></td>
                    <td class="actions" data-th="">
                        <button class="btn btn-info btn-sm"><i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
            `;
            }).join('');
        document.querySelector('#cart').innerHTML = productContent;
    }
}