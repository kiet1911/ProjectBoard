


export function CurrencyConvert({value}:{value?:Number}) :string|undefined{
    if(value){
    const converValue = value?.toString().replaceAll(".","");
    const arrValue = converValue?.split("");
    arrValue?.reverse().forEach((v,k)=>{
        if(k%3==0 && k!=0 && k>2){
            arrValue[k] = arrValue[k] + '.';
        }
        // console.log(v,k)
    })
    const finalValue = arrValue?.reverse().join().replaceAll(",","");
    return converValue?finalValue:undefined;
    }
}