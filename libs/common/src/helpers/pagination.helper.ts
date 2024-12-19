export function getMeta(limit: number, page: number, totalItem: number) {
	const totalPage = totalItem < limit ? 1 : Math.floor(totalItem / limit);
	const prevPage = page === 1 ? null : page - 1;
	const nextPage = page === totalPage ? null : page + 1;

	return {
		limit,
		page,
		totalItem,
		totalPage,
		prevPage,
		nextPage
	};
}

export function getOffset(
	limit: number | string | null | undefined,
	page: number | string | null | undefined
) {
	return +(limit || '25') * (+(page || '1') - 1);
}
