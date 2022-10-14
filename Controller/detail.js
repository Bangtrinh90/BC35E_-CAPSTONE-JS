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
              class="btn btn-info mr-2"
              style="font-size: 15px"
              id="btnIncrease"
            >
              +
            </button>
            <span class="profile-numb">0</span>
            <button
              class="btn btn-info ml-2"
              style="font-size: 15px"
              id="btnDecrease"
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
};
