export class FilterTeam {
  directions?: number[];
  is_archive?: boolean;
  is_active?: boolean;
  set_open?: boolean;

  title?: string;
  description?: string;
  tags?: string;
  shortname?: string;

  type?: string;

  limit = 5;
  offset = 0;

  //   optional
  fields: string[] = [];
  searchTxt?: string;
}
