import { api } from './_api';

// GET /store-product/
export const get = async (request) => {
	const response = await api(request, `user/store-product/1`);
	console.log(response.status);
	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};

