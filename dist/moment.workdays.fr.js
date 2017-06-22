(function (undefined) {
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
            && !(this.isSame(easter.clone().add(1, 'days')))    // exclude Lundi de paque
            && !(this.isSame(easter.clone().add(39, 'days')))    // exclude Assomption
            && !(this.isSame(easter.clone().add(50, 'days')))   // exclude Lundi de pentecote
        ;
    };
}).call(this);
