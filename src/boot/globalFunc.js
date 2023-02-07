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
};

/**
 * 이미지 url file 객체로 변환
 */
export const dataURLtoFile = (dataurl, fileName) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], fileName, {type:mime});
};