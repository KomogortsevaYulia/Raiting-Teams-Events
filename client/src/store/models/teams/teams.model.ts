export class FilterTeam {
  directions?: number[];
  is_archive?: boolean;
  is_active?: boolean;
  set_open?: boolean;

  title?: string;
  description?: string;
  tags?: string;

  limit = 5;
  offset = 0;
}
