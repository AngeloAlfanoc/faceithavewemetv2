let cachedNameArr = []

export const alternativeCase = string => {
    let output = "";
    for (let i = 0; i < string.length; i++) {
        if (i % 2 != 0) {
            output += string[i].toUpperCase();
        }
        else {
            output += string[i].toLowerCase();
        }
    }
    return output;
}
export const ternativeCase = string => {
    let output = "";
    for (let i = 0; i < string.length; i++) {
        if (i % 2 != 0) {
            output += string[i].toLowerCase();
        }
        else {
            output += string[i].toUpperCase();
        }
    }
    return output;
}


export const createArrayOfVars = (input) => {

    //No Mutations
    checkForIndex(input)

    //Case Mutations
    checkForIndex(input.toUpperCase())
    checkForIndex(input.toLowerCase())
    checkForIndex(alternativeCase(input))
    checkForIndex(ternativeCase(input))
  

    return cachedNameArr
}

export const checkForIndex = (string) => {
        if (cachedNameArr.indexOf(string) === -1) {
            cachedNameArr.push(string)
        }
        // if 
        for (let i = 0; i < cachedNameArr.length; i++) {
            if(cachedNameArr[i].length !== string.length) {
                cachedNameArr.splice(i, 1)
            }
        }
        return cachedNameArr;
    }