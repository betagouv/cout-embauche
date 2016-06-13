/*
 We have three levels of value formats :
 - human text : a friendly version to display as a form recap, e.g. 56,78 %
 - the form input : e.g. 56,78 captured in an <input> HTML tag
 - what should be sent to the API : 0.5678 (ratio and dot)

 Here are common formats that can be attached to Form components

*/

export class Percentage {
	suffix = '%'
	human = value => value + ' ' + '%'
	serialise = value => value / 100
}
