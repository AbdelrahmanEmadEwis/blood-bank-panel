export type StatisticItem = {
  label: string;
  count: number;
};

export type Statistics = {
  totals: {
    total_patients: number;
    total_blood_units: number;
    total_cross_matches: number;
  };
  patients_by_blood_type: StatisticItem[];
  blood_units_by_blood_type: StatisticItem[];
  cross_matches_by_final_result: StatisticItem[];
};


