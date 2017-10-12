const _ = require('lodash');

let users = {
    a: {
        stuff: 1,
        b: {
            moreStuff: 2,
            lol: 3,
            c: {
                cool: 4,
                dynamic: () => 'hey!!!'
            }
        }
    }
};

const _resolveDynamics = object => {
    Object.keys(object)
        .forEach(key => {
            let subject = object[key];
            if (typeof subject === 'function') {
                object[key] = subject();
            } else if (typeof subject === 'object') {
                _resolveDynamics(subject);
            }
        });
};
 
_resolveDynamics(users);

console.log(JSON.stringify(users, undefined, 4));
console.log(users.a.b.c);