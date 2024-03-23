export default class UpdateTeamModel {
  id = 0;
  leaders: number[] = [];
  title = "";
  description = "";
  shortname = "";
  cabinets: number[] = [];
  documentPath = "";
  charterPath = "";
  id_parent = 0;
  tags:string[] = [];
  links:string[] = [];

  fileUstav: File | undefined;
  fileDocument: File | undefined;
}
