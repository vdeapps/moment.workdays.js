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
     * Comment: These are National Holidays for POLAND.
     * License: MIT
     */
    moment.fn.isWorkday = function() {
        var easter = moment().easter(this.year());
        /* Exclude constrant holidays */
        return !(this.isoWeekday() === 6)                       // exclude Saturday (Weekend)
            && !(this.isoWeekday() === 7)                       // exclude Sunday (Weekend)
            && !(this.dayOfYear() === 1)                        // exclude New Year's Day (National holiday)
            && !(this.date() === 1 && this.month() === 4)       // exclude 01/05
            && !(this.date() === 8 && this.month() === 4)       // exclude 08/05
            && !(this.date() === 14 && this.month() === 6)      // exclude 14/07
            && !(this.date() === 15 && this.month() === 7)      // exclude 15/08
            && !(this.date() === 1 && this.month() === 10)     // exclude 01/11
            && !(this.date() === 11 && this.month() === 10)     // exclude 11/11
            && !(this.date() === 25 && this.month() === 11)     // exclude Christmas First Day (National holiday)
        /* Exclude moveing holidays */
                                                                // no need to exclude Easter Day - it's always on Sunday
            && !(this.isSame(easter.clone().add(1, 'days')))    // exclude Lundi de paque
                                                                // no need to exclude Whit Sunday - it's always on Sunday
            && !(this.isSame(easter.clone().add(39, 'days')))    // exclude Assomption
                                                                // no need to exclude Whit Sunday - it's always on Sunday
            && !(this.isSame(easter.clone().add(50, 'days')))   // exclude Lundi de pentecote
        ;
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
