const generate = (c) =>
    exports[c] = c

const generatePromise = (c) => {
    generate(`${c}_PENDING`)
    generate(`${c}_FULFILLED`)
    generate(`${c}_REJECTED`)
    generate(c)
}

generate('SET_AUTH_TOKEN')
generate('UNSET_AUTH_TOKEN')
generatePromise('GET_CONFIG')
