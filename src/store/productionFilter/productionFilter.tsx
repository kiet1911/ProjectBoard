import { create } from "zustand";
import type { BoardGames } from "../../types";

interface filterField {
  displayName: string;
  baseInput: "range" | "number" | "select";
  min: number;
  max: number;
  step: number;
  queryName: string;
  defaultValue: number | string;
  value: number | string;
}

interface productionFilter {
  config: {
    [key: string]: filterField;
  };
  pagination: {
    page: number;
    pageSize: number;
    isMaxRecord: boolean;
  };
  gameLists: BoardGames[] | [];
  setFilters: (key: string, newValue: number | string) => void;
  setGameLists: (games: BoardGames[] | []) => void;
  addGamesLists: (games: BoardGames[] | []) => void;
  setPagination: (isMax:boolean)=>void
  resetFilters: () => void;
  resetPagination: () => void;
  initialQuery: () => object;
}

const initialDefaultValues = {
  Price: 600000,
  PlayTime: 120,
  Rating: 7.0,
  Complexity: 3.5,
  Age: 10,
  Page: 0,
  PageSize: 5,
};

export const useProductionFilter = create<productionFilter>()((set, get) => ({
  config: {
    Price: {
      displayName: "Maximum price",
      baseInput: "range",
      min: 0,
      max: 15000000,
      step: 50000,
      queryName: "maxPrice",
      defaultValue: initialDefaultValues.Price,
      value: initialDefaultValues.Price,
    },
    PlayTime: {
      displayName: "Maximum playtime",
      baseInput: "range",
      min: 15,
      max: 360,
      step: 15,
      queryName: "maxTime",
      defaultValue: initialDefaultValues.PlayTime,
      value: initialDefaultValues.PlayTime,
    },
    Rating: {
      displayName: "Maximum rating",
      baseInput: "range",
      min: 0,
      max: 10,
      step: 0.5,
      queryName: "minRating",
      defaultValue: initialDefaultValues.Rating,
      value: initialDefaultValues.Rating,
    },
    Complexity: {
      displayName: "Maximum complexity",
      baseInput: "range",
      min: 1,
      max: 5,
      step: 0.1,
      queryName: "maxComplexity",
      defaultValue: initialDefaultValues.Complexity,
      value: initialDefaultValues.Complexity,
    },
    Age: {
      displayName: "Maximum age",
      baseInput: "range",
      min: 0,
      max: 21,
      step: 1,
      queryName: "ageRequirement",
      defaultValue: initialDefaultValues.Age,
      value: initialDefaultValues.Age,
    },
  },
  gameLists: [],
  pagination: {
    page: initialDefaultValues.Page,
    pageSize: initialDefaultValues.PageSize,
    isMaxRecord: false,
  },
  values: { ...initialDefaultValues },
  setFilters: (key: string, newValue: number | string) => {
    set((state) => ({
      config: {
        ...state.config,
        [key]: {
          ...state.config[key],
          value: newValue,
        },
      },
    }));
  },

  setGameLists: (games) => {
    set(()=>({
      gameLists: games
    }))
  },

  addGamesLists: (games) => {
    const currentGame = get().gameLists;
    const newGames = [...currentGame,...games];
    set(()=>({
      gameLists: newGames
    }))
  },

  setPagination:(isMax)=>{
    const p = get().pagination.page + 1;
    set((state)=>({
      pagination:{
        ...state.pagination,
        page : p,
        isMaxRecord: isMax
      }
    }))
  },

  resetFilters: () => {
    set((state) => {
      const keys = Object.keys(get().config);
      const updateConfig = { ...state.config };
      keys.forEach((key) => {
        updateConfig[key] = {
          ...updateConfig[key],
          value: updateConfig[key].defaultValue,
        };
      });
      return { config: updateConfig };
    });
  },

  resetPagination: () => {
    set(()=>({
      pagination:{
        page: 0,
        pageSize: initialDefaultValues.PageSize,
        isMaxRecord: false
      }
    }))
  },

  initialQuery: () => {
    const Config = get().config;
    const Page = get().pagination;
    const jsonQuery = {
      Price: Config["Price"]?.value ?? 0,
      PlayTime: Config["PlayTime"]?.value ?? 0,
      Rating: Config["Rating"]?.value ?? 0,
      Complexity: Config["Complexity"]?.value ?? 0,
      Age: Config["Age"]?.value ?? 0,
      Page: Page["page"] ?? 0,
      PageSize: Page["pageSize"] ?? 0,
    };
    return jsonQuery;
  },
}));

