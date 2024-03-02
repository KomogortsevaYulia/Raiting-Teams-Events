export default class UpdateTeam {
  id = 0;
  oldUserId = 0;
  newUserId = 0;
  title = "";
  description = "";
  shortname = "";
  cabinets:number[] = [];
  documentPath = "";
  charterPath = "";
  id_parent = 0;

  fileUstav: File | undefined;
  fileDocument: File | undefined;
}
