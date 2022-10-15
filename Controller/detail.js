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
							.map(item => {
								return `
                  <li class="profile-size-item">${item}</li>
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
          <button class="btn-detail" id="btnAddProd">Add to cart</button>
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
	//
};
