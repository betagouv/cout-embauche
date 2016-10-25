import { number } from './validators'

/*
 Here are common formats that can be attached to Form components
*/

export class Percentage {
	suffix = '%'
	human = value => value + ' ' + '%'
	validator = number
}

export class Euro {
	suffix = '€'
	human = value => value + ' ' + '€'
	validator = number
}
