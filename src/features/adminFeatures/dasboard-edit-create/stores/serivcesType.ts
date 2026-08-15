
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

export interface BoardGameDTO  {
    id:string,
    name:string,
    base_Price:number,
    stock_Quantity:number,
    reservation_Quantity:number,
    sold_Quantity:number,
    created_at:string,
    updated_at:string,
    status:number,
    weight:number,
    size_X:number,
    size_Y:number,
    size_Z:number,
    min_Player:number,
    max_Player:number,
    min_Time:number,
    max_Time:number,
    prefer_Player:number,
    complexity:number,
    rating:number,
    age_Requirement:number
}

export interface OrderDTO {
    id:string,
    public_id:string,
    totalPrice:number,
    created_at:string,
    paid_at:string,
    queryDb_at:string,
    status:number,
    isSuccessDelivery:boolean,
    nameRecipient:string,
    note:string,
    phone:string,
    address:string,
    merchantRefNo:string,
    urlVnPay:string,
    games: GamesOrderDTO[]
}

export interface BookingDTO {
    id:string,
    name:string,
    phoneNumber:string,
    email:string,
    minPlayers:number,
    maxsPlayers:number,
    bookingTime:string,
    gameReservation:string,
    gameType:string,
    note:string,
    status:number,
    isConfirmed:boolean,
    confirmedAt:string,
    rejectionReason:string,
    isDeleted:boolean,
    deleted_at:string,
}

interface GamesOrderDTO {
    id:string,
    name:string,
    quantity:number,
    unitPrice:number,
    created_at:string,
    boardgameImages: bgImageOrderDTO[]
}

interface bgImageOrderDTO{
    id:string,
    alt:string,
    bg_id:string,
    boardgame:any,
    img_Url:string,
    updated_at:string,
    created_at:string,
    is_Thumbnail:boolean,
}

export interface OrderTransactionStatus {
    time:string,
    vnp_ResponseCode:string,
    vnp_TransactionStatus:string,
    vnp_TransactionType:string
}