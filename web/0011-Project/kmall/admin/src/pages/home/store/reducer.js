/*
* @Author: TomChen
* @Date:   2019-08-12 10:29:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-15 15:13:26
*/

import * as types  from './actionTypes.js'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    usernum:1,
    ordernum:2,
    productnum:4  
})

export default (state=defaultState,action)=>{
    if(action.type == types.SET_COUNT){
        return state.merge({
            usernum:action.payload.usernum,
            ordernum:action.payload.ordernum,
            productnum:action.payload.productnum,  
        })
    }
    return state
}