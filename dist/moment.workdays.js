(function (undefined) {
    /**
     * moment.easter
     * Source: https://github.com/zaygraveyard/moment-easter
     * License: MIT
     */
    moment.easter = function Easter20ops(year) {
        var a = (year / 100 | 0) * 1483 - (year / 400 | 0) * 2225 + 2613;
        var b = ((year % 19 * 3510 + (a / 25 | 0) * 319) / 330 | 0) % 29;
        var c = 148 - b - ((year * 5 / 4 | 0) + a - b) % 7;

        return moment({year: year, month: (c / 31 | 0) - 1, day: c % 31 + 1});
    };

    moment.fn.easter = function () {
        return moment.easter(this.year());
    };

    /**
     * moment.isWorkday
     * Comment: Load local workdays
     * License: MIT
     */
    moment.fn.isWorkday = function() {
        return true;
    };

    /**
     * moment.add/subtract workdays
     * Comment: Uses moment.isWorkday to determine if 
     * License: MIT
     */
    moment.fn.originAdd      = moment.fn.add;	//Keep original function
    moment.fn.add = function (input, val) {
        if (val === 'workdays') {
            var increment = input / Math.abs(input);
            this.originAdd(Math.floor(Math.abs(input) / 5) * 7 * increment, 'days');
            var remaining = input % 5;
            while(remaining != 0) {
            	this.originAdd(increment, 'days');
                if(this.isWorkday()) {
                    remaining -= increment;
                }
            }
            return this;
        }

        return this.originAdd(input, val);
    };

    moment.fn.originSubtract = moment.fn.subtract;	//Keep original function
    moment.fn.subtract = function (input, val) {
        if (val === 'workdays') {
            var decrement = input / Math.abs(input);
            this.originSubtract(Math.floor(Math.abs(input) / 5) * 7 * decrement, 'days');
            var remaining = input % 5;
            while(remaining != 0) {
            	this.subtract(decrement, 'days');
                if(this.isWorkday()) {
                    remaining -= decrement;
                }
            }
            return this;
        }

        return this.originSubtract(input, val);
    };
}).call(this);
