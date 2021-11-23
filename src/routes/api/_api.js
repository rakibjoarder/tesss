
const base = 'https://ebazar.droidappbd.com/public/api/v1';

export async function api(request, resource, data) {
	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			Accept: 'application/ld+json',
			'Content-Type': 'application/ld+json',
			'X-Authorization': '9dZ24lz9WC7VkfeQhxpYM4Wn6sKaENxGxihZN2wqdBroK6f5FzuRIiFddRqaf2bgu'
		},
		body: data && JSON.stringify(data)

	});

	if (res.ok && request.method !== 'GET' && request.headers.accept !== 'application/json') {
		return {
			status: 303,
			headers: {
				location: '/todos'
			}
		};
	}

	return {
		status: res.status,
		body: await res.json()
	};
}
