/*
See
"Accessing nested JavaScript objects with string key"
http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#answer-22129960
*/

export default function(obj, path) {
    return path.split('.').reduce(function(prev, curr) {
        return (prev ? prev[curr] : undefined)
    }, obj || self)
}
