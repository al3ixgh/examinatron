const jsonwebtoken = require('jsonwebtoken')

const payload = {_id: '123'}
const secretKey = 'estoessupersecreto'

const firmar = async (payload, secretKey) => {
    const jwt = jsonwebtoken.sign(payload,secretKey, {expiresIn: '2 days'})
    console.log(jwt);
} 

const verificar = async(jwt, secretKey) => {
    const decoded = await jsonwebtoken.verify(jwt, secretKey)
    console.log(decoded);
}

firmar(payload, secretKey)
verificar('JWTOKEN GOES HERE', secretKey)