const getValueInput = () => {
	let customer = new Customer();
	var validation = new Validation();
	let isValid = true;
	const _email = document.getElementById('email').value;
	const _name = document.getElementById('name').value;
	const _phone = document.getElementById('phone').value;
	const _pass = document.getElementById('password').value;
	const _rePass = document.getElementById('re-password').value;
	// Validation name
	isValid &=
		validation.hasEmptyInput(_name, 'errorName', `Vui lòng nhập tên`) &&
		validation.checkName(_name, 'errorName', `Tên không đúng định dạng`);
	// Validation email
	isValid &=
		validation.hasEmptyInput(_email, 'errorEmail', `Vui lòng nhập email`) &&
		validation.checkEmail(_email, 'errorEmail', `Email không đúng định dạng`);
	// Validation phone
	isValid &=
		validation.hasEmptyInput(
			_phone,
			'errorPhone',
			`Vui lòng nhập số điện thoại`,
		) &&
		validation.checkStrLength(
			_phone,
			'errorPhone',
			`Vui lòng nhập 10 ký tự`,
			0,
			10,
		);
	// Validation password
	isValid &=
		validation.hasEmptyInput(
			_pass,
			'errorPassword',
			`Vui lòng nhập mật khẩu`,
		) && validation.checkPass(_pass, 'errorPassword', `Mật khẩu không hợp lệ`);
	// Validation re-password
	isValid &=
		validation.hasEmptyInput(
			_rePass,
			'errorRePass',
			`Vui lòng nhập mật khẩu`,
		) && validation.checkPass(_rePass, 'errorRePass', `Mật khẩu không hợp lệ`);

	if (isValid) {
		customer.email = _email;
		if (_pass === _rePass) {
			customer.password = _pass;
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Password không trùng khớp',
				showConfirmButton: false,
				timer: 1500,
			});
		}
		customer.name = _name;
		customer.gender =
			document.querySelector('input[name = gender]:checked').value === 'male'
				? true
				: false;
		customer.phone = _phone;
		return customer;
	}
	return null;
};

document.getElementById('btnSubmit').addEventListener('click', e => {
	e.preventDefault();
	// Get value
	const customer = getValueInput();
	if (customer) {
		const formList = document.querySelectorAll('form');
		formList.forEach(item => {
			setTimeout(() => {
				item.reset();
			}, 3000);
		});
		axios({
			url: 'https://shop.cyberlearn.vn/api/Users/signup',
			method: 'POST',
			data: customer,
		})
			.then(res => {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Đăng ký thành công',
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	// Using methods post add customer
});
