export interface Day {
  day: number;
  isCurrentMonth: boolean;
}

export interface Week {
  days: Day[];
}

