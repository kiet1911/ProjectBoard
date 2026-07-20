
export type CategoryDTO = {
    id:number,
    name:String,
    description:String,
    status:number,
}

export type PublisherDTO = {
    id:string,
    name:string,
    bio:string,
    type:number,
    status:number,
}

export type GetImageBoardGameDTO = {
    id:string,
    name:string,
    images?: ImagesBoardGameDTO[]
}
export type ImagesBoardGameDTO = {
    id:string,
    alt:string,
    img_Url:string,
    is_Thumbnail:boolean
}