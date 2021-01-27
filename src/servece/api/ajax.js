import axios from 'axios'

export default function ajax(url='',parmas={},type='GET'){
    let promise;
    //返回一个promise对象
    return new Promise((resolve,reject)=>{
        if(type.toUpperCase()==='GET'){
         let paramsStr='';
         Object.keys(parmas).forEach(key=>{
             //{
             // name:'wubao'
             //  age:22
             //  sex:'nan'
             //swqswq?name=wubao&age=22&sex=nan
             //    }
             paramsStr +=key+'='+parmas[key]+'&'
         });
         if(paramsStr){
             paramsStr=paramsStr.substr(0,paramsStr.lastIndexOf('&'))
         }
         url+='?'+paramsStr;
         promise=axios.get(url);

        }else if(type.toUpperCase()==='POST'){
          promise=axios.post(url,parmas);
        }

        promise.then((response)=>{
          resolve(response.data);
        }).catch(error=>{
            reject(error);
        })
    });

}

