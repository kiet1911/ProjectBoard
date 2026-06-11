import type { ReactNode } from "react";



export default function PageContainer({url,children}:{url:string,children?:ReactNode}){
    return <div className={`min-h-100 px-[10%] max-sm:px-0 pt-[1rem] bg-[url(${url})] bg-center bg-auto bg-origin-border flex flex-col items-center-safe gap-y-[2rem] pb-[2rem]`}>
            {children}
    </div>
}