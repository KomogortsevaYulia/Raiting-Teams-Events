export interface ClassListCardList {
  starred: boolean;
  id: number;
  title: string;
  points: number;
}

export interface ClassList {
  disabled: boolean;
  time: string;
  list: ClassListCardList[];
}
