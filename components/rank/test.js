const _ = require('lodash');
const test = [
    {
        name:"aaaa",
        age: 11,
        hobby: [
            {
                sport:"tennis",
                musinc:"pop"
            },
            {
                sport:"soccer",
                musinc:"k-pop"
            },
        ]
    },
    {
        name:"bbbb",
        age: 22,
        hobby: [
            {
                sport:"baseball",
                musinc:"j-pop"
            },
            {
                sport:"football",
                musinc:"c-pop"
            },
        ]
    }
]

const temp = [];

for (let i = 0; i < test.length; i++) {

    const copiedObj = _.cloneDeep(test[i]);
    temp.push(copiedObj)
}
console.log(temp)
console.log(temp[0].hobby)

