import { paths } from "../api";

export type Command =
  paths["/applications/{application_id}/commands/{command_id}"]["patch"]["requestBody"]["content"]["application/json"];
