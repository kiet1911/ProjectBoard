
export const ResizeObserverLargerUtility = (x:number,setToggle:void):ResizeObserver=>{
    const observer = new ResizeObserver((entries)=>{
        for(const entry of entries){
            const width = entry.contentRect.width;
            if(width > x){
                setToggle;
            }
        }
    })
    return observer;
}