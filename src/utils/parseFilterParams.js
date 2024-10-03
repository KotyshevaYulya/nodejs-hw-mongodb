

const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);

    if (isType(type)) return type;

};

const BOOLEANS = ['true', 'false'];

const parseBoolean = (value) => {
    if (!BOOLEANS.includes(value)) return;
    return value === 'true' ? true : false;
};


export const parseFilterParams = (query) => {
    const filter = {
        isFavourite: parseBoolean(query.isFavourite),
        contactType: parseContactType(query.contactType)
    }

    return filter;
}

// const parseContactType = (type) => {
//     const isString = typeof type === 'string';
//     if (!isString) return;
//     const isType = (type) => ['work', 'home', 'personal'].includes(type);

//     if (isType(type)) return type;

// };

// const BOOLEANS = ['true', 'false'];

// const parseBoolean = (value) => {
//     if (!BOOLEANS.includes(value)) return;
//     return value === 'true' ? true : false;
// };

// export const parseFilterParams = (query) => {
//     const filter = {
//         isFavourite: parseBoolean(query.isFavourite),
//         contactType: parseContactType(query.contactType)
//     }

//     return filter;
// }
