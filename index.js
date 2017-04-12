class Pipeline {
	constructor() {
		this._filters = [];
		this.halt = this._getExternallyCallableFn('_fnHalt');
	}

	_fnHalt() {
		this._halt = true;
	}

	_getExternallyCallableFn(fnName) {
		return () => {
			debugger
			this[fnName].apply(this, arguments);
		}
	}

	start() {
		this._halt = false;

		var filterArgs = arguments.length ?
			arguments : [this.halt, this._getExternallyCallableFn('next')];

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