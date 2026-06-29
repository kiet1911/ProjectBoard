// type operation
//boardgame
export type BoardGames = BoardGamesInformation &
  BoardGamesPhysicalSpecs &
  BoardGamesGamePlay &
  BoardGamesReference;
type BoardGamesInformation = {
  id: string;
  name: string;
  base_Price: number;
  sold_Quantity: number;
  stock_Quantity?: number;
  discount?: number;
  created_at: string;
  updated_at: string;
  status: string;
};
type BoardGamesPhysicalSpecs = {
  weight: string;
  size_X: number;
  size_Y: number;
  size_Z: number;
};
type BoardGamesGamePlay = {
  min_Player: number;
  max_Player: number;
  min_Time: number;
  max_Time: number;
  prefer_Player: number;
  complexity: number;
  rating: number;
  age_Requirement: number;
};
type BoardGamesReference = {
  categories: [{ category_Id: number; name: string }];
  creators: [{ id: string; name: string; type: number }];
  description: Pick<BoardGamesDescription,"short_Description"|"full_Description">;
  images: {id:string,alt:string,img_Url:string,is_Thumbnail:boolean}[]
};
type BoardGamesDescription = {
  boardGame_Id: string;
  created_at: string;
  full_Description: string;
  id: number;
  short_Description: string;
  updated_at: string;
};
export type BoardGameCreators = Record<
  string,
  { id: string; name: string; type: string; bio?: string }[]
>;

export type RecipientInfo = {
  fullName: string;
  phone: string;
  address: string;
  note: string;
};

export type VnPayRecipientInfo = RecipientInfo & {
  JWT:string,
}
export interface VnPayResult {
  vnp_TxnRef?: string;
  vnp_ResponseCode?: string;
  vnp_TransactionStatus?: string;
  vnp_Amount?: string;
  vnp_BankCode?: string;
  vnp_CardType?: string;
  vnp_OrderInfo?: string;
  vnp_PayDate?: string;
  vnp_TmnCode?: string;
  vnp_TransactionNo?: string;
}