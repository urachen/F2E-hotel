export const url = {
	baseUrl: process.env.BASEURL || 'https://challenge.thef2e.com/',
};

export const api = {
	ver: process.env.APIVER || 'api/thef2e2019/stage6/'
};

const constants = {
	url,
	api
};

export { constants as default };
