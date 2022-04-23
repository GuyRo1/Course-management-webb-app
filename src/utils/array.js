export const areArraysTheSame = (type, array1, array2) => {
    if (array1 === array2) return true;
    if (array1.length !== array2.length) return false;
    switch (type) {
        case 'string': {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) return false;
            }
            return true;
        }
        case 'objectWithStringValue': {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i].value !== array2[i].value) return false;
            }
            return true;
        }
        default: {
            return false;
        }
    }

}



