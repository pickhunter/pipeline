class Pipeline {
	constructor() {
		this._filters = [];
		this.halt = this._fnHalt.bind(this);
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

	set context(context) {
		this._context = context;
	}

	start() {
		this._halt = false;

		var filterArgs = arguments.length ?
			arguments : [this.halt];

		this._filters.forEach((filter) => this._run(filter, filterArgs));
	}

	_fnHalt() {
		this._halt = true;
	}

	_run( filter, args ) {
		if(!this._halt) {
			return filter.apply(this._context || this, args);
		}
	}
}

module.exports = Pipeline;