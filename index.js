class Pipeline {
	constructor() {
		this._filters = [];
	}

	halt() {
		this._halt = true;
	}

	_getExternallyCallableFn(fnName) {
		return () => {
			this[fnName].apply(this, arguments);
		}
	}

	start() {
		this._halt = false;

		var filterArgs = arguments.length ?
			arguments : [this._getExternallyCallableFn('halt'), this._getExternallyCallableFn('next')];

		this._filters.forEach((filter) => this._run(filter, filterArgs));
	}

	_run( filter, args ) {
		if(!this._halt) {
			return filter.apply(filter, args);
		}
	}

	addFilter(fn) {
		this._filters.push(fn);
	}

	addPreFilter(fn) {
		this._filters.unshift(fn);
	}

	addPostFilter(fn) {
		this.addFilter(fn);
	}
}

module.exports = Pipeline;