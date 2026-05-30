import { create } from "zustand";

interface filteField {
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
    [key: string]: filteField;
  };
}

const initialDefaultValues = {
  Price: 600000,
  PlayTime: 120,
  Rating: 7.0,
  Complexity: 3.5,
  Age: 10,
};

export const useProductionFilter = create<productionFilter>()((set, get) => ({
  config: {
    Price: {
      displayName: "Giá tối đa",
      baseInput: "range",
      min: 0,
      max: 5000000,
      step: 50000,
      queryName: "maxPrice",
      defaultValue: initialDefaultValues.Price,
      value: initialDefaultValues.Price,
    },
    PlayTime: {
      displayName: "Thời gian chơi tối đa",
      baseInput: "range",
      min: 15,
      max: 360,
      step: 15,
      queryName: "maxTime",
      defaultValue: initialDefaultValues.PlayTime,
      value: initialDefaultValues.PlayTime,
    },
    Rating: {
      displayName: "Đánh giá tối thiểu",
      baseInput: "range",
      min: 0,
      max: 10,
      step: 0.5,
      queryName: "minRating",
      defaultValue: initialDefaultValues.Rating,
      value: initialDefaultValues.Rating,
    },
    Complexity: {
      displayName: "Độ phức tạp tối đa",
      baseInput: "range",
      min: 1,
      max: 5,
      step: 0.1,
      queryName: "maxComplexity",
      defaultValue: initialDefaultValues.Complexity,
      value: initialDefaultValues.Complexity,
    },
    Age: {
      displayName: "Độ tuổi tối thiểu",
      baseInput: "range",
      min: 0,
      max: 21,
      step: 1,
      queryName: "ageRequirement",
      defaultValue: initialDefaultValues.Age,
      value: initialDefaultValues.Age,
    },
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
}));
