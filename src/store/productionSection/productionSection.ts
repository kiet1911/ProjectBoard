type sectionUri = {
  [id: number]: {
    contentSection: string;
    uriSection: string;
  };
};

export const productionSectionUri: sectionUri = {
    1:{contentSection:"Best Seller",uriSection:"/v1/BoardGames/BestSeller"},
    2:{contentSection:"Top New Game",uriSection:"/v1/BoardGames/NewReleasedGame"},
    3:{contentSection:"Top Rating",uriSection:"/v1/BoardGames/RatingGame"},
};
