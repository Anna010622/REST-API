export const handleSaveError = (error, data, next) => {
	error.status = error.code === 11000 ? 409 : 400;
	next();
};

export const handleUpdateValidate = function (next) {
	this.options.runValidators = true;
	next();
};
