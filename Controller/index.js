const BASE_URL = 'https://shop.cyberlearn.vn/api/Product';

// call api product
const callAPI = async () => {
	return await axios({
		url: BASE_URL,
		method: 'GET',
		responseType: 'json',
	})
		.then(res => {
			return res.data.content;
		})
		.catch(err => {
			console.log(err);
		});
};

// Render product list

(async promise => {
	try {
		await promise.then(data => {
			localStorage.setItem('product', JSON.stringify(data));
			document.getElementById('prodLists').innerHTML = data
				.map(prod => {
					let { id, name, image, description, price } = prod;
					return `
        <div class="col-12 col-lg-4">
          <div class="pro-card-primary">
            <a
            data-fancybox="gallery"
            data-src=${image}
            data-caption='Name: ${name},&lt;br /&gt;Description: ${description}'
            >
              <img src=${image} alt=${name}  />
            </a>
            <div class="card-text-primary">
              <h4>${name}</h4>
              <p>${
								description.length > 45
									? description.substr(0, 45) + '...'
									: description
							}</p>
              <div class="card-button">
                <div class="w-50 d-flex justify-content-center align-items-center">
                  <a class="btn-buy d-flex justify-content-center align-items-center" href="./details.html?product_id=${id}">
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
		});
	} catch (error) {
		console.log(error);
	}
})(callAPI());

window.onload = () => {
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
