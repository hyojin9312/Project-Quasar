import Vue from 'vue'
import { Notify } from 'quasar';

/**
 * 데이터 null 처리
 */
export const isEmpty = (param) => {
    if(param == null || param == 'null' || param == undefined 
       || param == 'undefined' || param == ''){
        return true;
       }
    return false;   
}