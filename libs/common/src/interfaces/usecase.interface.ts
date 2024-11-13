export interface IExecuteHandler<T = any> {
	execute(...args: any[]): T | Promise<T>;
}

export interface IQueryHandler<T = any> {
	query(...args: any[]): T | Promise<T>;
}
