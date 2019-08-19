import axios from 'axios'

import { SERVER,API_CONFIG } from './config.js'
import { saveUsername  } from 'util'
const getApiObj = (apiConfig)=>{
    const apiObj = {}

    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            //处理请求参数
            let url = apiConfig[key][0] || ''
            url = SERVER + url
            let method = apiConfig[key][1] || 'get'
            return request(url,method,data)
        }
    }

    return apiObj
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method: method,
            url:url,
            withCredentials:true,
            data:data
        })
        .then(result=>{
            const data  = result.data
            resolve(data)
            saveUsername()
            reject()
        })
        .catch(err=>{
            reject(err)
        })
    })
}


export default getApiObj(API_CONFIG)
