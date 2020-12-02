const bcryptjs = require('bcryptjs')

const password = '12345'

const getHash = async(password)=>{
    const hash = await bcryptjs.hash(password,8)
    console.log(hash);
    return hash
}

console.log(password);
getHash(password)


const isRight = bcrypt.compare('123', getHash('12345'))