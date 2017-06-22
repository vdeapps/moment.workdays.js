# moment.workdays.js
add easter and workdays for add and subtract functions

## Usage
### easter
m = moment('22/10/2017','DD/MM/YYYY', true);
console.info( m.easter().format('DD/MM/YYYY') )


### add workdays
m = moment('22/10/2017','DD/MM/YYYY', true);
console.info( m.add(2,'workdays').format('DD/MM/YYYY') )


### subtract workdays
m = moment('22/10/2017','DD/MM/YYYY', true);
console.info( m.subtract(2,'workdays').format('DD/MM/YYYY') )

