const handelIncrease = () => {
	var value = Number.parseInt(
		document.querySelector('.profile-numb').innerHTML,
		10,
	);
	value = isNaN(value) ? 0 : value;
	value++;
	document.querySelector('.profile-numb').innerHTML = value;
};
const handelDecrease = () => {
	var value = Number.parseInt(
		document.querySelector('.profile-numb').innerHTML,
		10,
	);
	value = isNaN(value) ? 0 : value;
	if (value <= 0) {
		value = 0;
	} else {
		value--;
	}
	document.querySelector('.profile-numb').innerHTML = value;
};
const handelClick = idx => {
	const eleSize = document.querySelectorAll('.profile-size-item');
	for (let i = 0; i < eleSize.length; i++) {
		eleSize[i].className = 'profile-size-item';
		if (i === +idx) {
			eleSize[i].className = 'profile-size-item active';
			sizeProds = eleSize[i].textContent;
		}
	}
};
// generate uid
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
// Add product to cart
const addToCart = param => {
	const eleSize = document.querySelectorAll('.profile-size-item.active');
	const amount = +document.querySelector('.profile-numb').textContent;
	if (amount <= 0) {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Vui lòng nhập số lượng',
			showConfirmButton: false,
			timer: 1500,
		});
	} else {
		if (eleSize.length !== 0) {
			let size = eleSize[0].textContent;
			const URL_ID = `https://shop.cyberlearn.vn/api/Product/getbyid?id=${param}`;
			axios({
				url: URL_ID,
				method: 'GET',
			})
				.then(res => {
					const product = res.data.content;
					let { id, name, image, price } = product;
					const productItem = {
						id,
						name,
						image,
						price,
						amount: amount,
						size: size,
					};
					// Check cart contains localStorage
					if (!localStorage.getItem('cart')) {
						localStorage.setItem('cart', '[]');
					}
					let cart = JSON.parse(localStorage.getItem('cart'));
					// Check cart is empty
					if (cart.length === 0) {
						cart.push(productItem);
					} else {
						let res = cart.find(ele => ele.id === id);
						if (res === undefined) {
							cart.push(productItem);
						}
					}
					localStorage.setItem('cart', JSON.stringify(cart));
					for (const item of cart) {
						if (item.id === id) {
							item.amount = amount;
						}
					}
					localStorage.setItem('cart', JSON.stringify(cart));
					// Reload cart after adđ product
					window.location.reload();
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Vui lòng chọn size giày',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}
};

window.onload = () => {
	// Get param form url
	const urlParam = new URLSearchParams(window.location.search);
	const param = urlParam.get('product_id');
	// Render profile product by id
	const BASE_URL_ID = `https://shop.cyberlearn.vn/api/Product/getbyid?id=${param}`;
	axios({
		url: BASE_URL_ID,
		method: 'GET',
	})
		.then(res => {
			let product = res.data.content;
			let { name, description, price, size, image } = product;
			const eleProfile = document.querySelector('.profile-content');
			eleProfile.innerHTML = `
        <div class="col-5 profile-left">
							<a
								data-fancybox
								data-src=${image}
								data-caption='${description}'
                 data-sizes="(max-width: 600px) 480px, 800px"
							>
								<img src=${image} alt=${name} style="
                  width: 75%;
                  height: 100%;
                  object-fit: cover;
              "/>
							</a>
				</div>
				<div class="col-7 profile-right">
          <h4 class="profile-prodName">${name}</h4>
          <p class="profile-desc">${description}</p>
          <span class="profile-titleSize text-success">Available size</span>
          <ul class="profile-size d-flex align-items-center">
            ${size
							.map((item, idx) => {
								return `
                  <li class="profile-size-item" onclick="handelClick('${idx}')">${item}</li>
                `;
							})
							.join('')}
          </ul>
          <span class="profile-price">${price}$</span>
          <div class="profile-addOrRemove">
            <button
              type="button"
              class="btn btn-info mr-2 increase"
              style="font-size: 15px"
              onclick="handelIncrease()"
            >
              +
            </button>
            <span class="profile-numb">0</span>
            <button
              type="button"
              class="btn btn-info ml-2 decrease"
              style="font-size: 15px"
              onclick="handelDecrease()"
            >
              -
            </button>
          </div>
          <button class="btn-detail" id="btnAddProd" onclick="addToCart('${param}')">Add to cart</button>
				</div>
      `;
		})
		.catch(err => {
			console.log(err);
		});
	// Render list product
	let content = '';
	const listProduct = JSON.parse(localStorage.getItem('product'));
	// Filter product feature
	const productListClone = [...listProduct];
	const productFeature = productListClone.filter(
		item => item.id !== Number(param),
	);
	content = productFeature
		.map(item => {
			let { id, name, description, shortDescription, image, price } = item;
			return `
        <div class="col-12 col-lg-4">
          <div class="pro-card-primary">
            <a
              data-fancybox="gallery"
              data-src=${image}
              data-caption='${description}'
            >
              <img src=${image} alt="" />
            </a>
            <div class="card-text-primary">
              <h4>${name}</h4>
              <p>${
								shortDescription.length > 40
									? shortDescription.substr(0, 40) + '...'
									: shortDescription
							}</p>
              <div class="card-button">
                <div
                  class="w-50 d-flex justify-content-center align-items-center"
                >
                  <a
                    class="btn-buy d-flex justify-content-center align-items-center"
                    href="./details.html?product_id=${id}"
                  >
                    <span>Buy now</span>
                  </a>
                </div>
                <div class="w-50">
                  <div
                    class="btn-price d-flex justify-content-center align-items-center"
                  >
                    <span class="priceText">${price}$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
				</div>
      `;
		})
		.join('');
	document.getElementById('proFeature').innerHTML = content;
	// get amount product add to cart
	if (!localStorage.getItem('cart')) {
		document.querySelector('.amount-product').innerHTML = '(0)';
	} else {
		const cartProd = JSON.parse(localStorage.getItem('cart'));
		let amountProd = cartProd.reduce((total, item) => {
			return (total += item.amount);
		}, 0);
		document.querySelector('.amount-product').innerHTML = `(${amountProd})`;
	}
};
