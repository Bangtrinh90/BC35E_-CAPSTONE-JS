function Validation() {
	this.hasEmptyInput = (value, divError, mess) => {
		if (value.trim().length === 0) {
			document.getElementById(divError).style.display = 'block';
			document.getElementById(divError).innerHTML = mess;
			return false;
		}
		document.getElementById(divError).style.display = 'none';
		document.getElementById(divError).innerHTML = '';
		return true;
	};
	this.checkStrLength = (value, divError, mess, min, max) => {
		if (value.length >= min && value.length <= max) {
			document.getElementById(divError).style.display = 'none';
			document.getElementById(divError).innerHTML = '';
			return true;
		}
		document.getElementById(divError).style.display = 'block';
		document.getElementById(divError).innerHTML = mess;
		return false;
	};
	this.checkName = (value, divError, mess) => {
		const leter =
			'^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
			'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
			'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
		if (value.trim().match(leter)) {
			document.getElementById(divError).innerHTML = '';
			document.getElementById(divError).style.display = 'none';
			return true;
		}
		document.getElementById(divError).innerHTML = mess;
		document.getElementById(divError).style.display = 'block';
		return false;
	};
	this.checkEmail = (val, id, mess) => {
		if (val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	// Chack validation pass length from 6 digit to 10 digit
	this.checkPass = (val, id, mess) => {
		if (
			val.match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/,
			)
		) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	this.checkCustomer = function (id, divError, mess, customerList) {
		let exits = false;
		for (let i = 0; i < customerList.length; i++) {
			const sv = customerList[i];
			if (sv.id === id) {
				exits = true;
				break;
			}
		}
		if (exits) {
			document.getElementById(divError).style.display = 'block';
			document.getElementById(divError).innerHTML = mess;
			return false;
		}
		document.getElementById(divError).style.display = 'none';
		document.getElementById(divError).innerHTML = '';
		return true;
	};
	this.checkEmailExits = (val, divError, mess, arr) => {
		let isExits = false;
		for (let i = 0; i < arr.length; i++) {
			const emailItem = arr[i];
			if (emailItem.email === val) {
				isExits = true;
				break;
			}
		}
		if (isExits) {
			document.getElementById(divError).innerHTML = mess;
			document.getElementById(divError).style.display = 'block';
			return false;
		}
		document.getElementById(divError).innerHTML = '';
		document.getElementById(divError).style.display = 'none';
		return true;
	};
}
