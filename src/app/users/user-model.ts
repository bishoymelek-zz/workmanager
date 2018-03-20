import { last } from "@angular/router/src/utils/collection";

export interface User {
  id: number;
  dateCreated: string,
  firstName: string,
  functionLocation : string,
  lastChanged: string,
  lastName: string,
  password:string,
  plannerGroup:string,
  type:string,
  userName: string,
  workCentre:string
}