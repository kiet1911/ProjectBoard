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
};
