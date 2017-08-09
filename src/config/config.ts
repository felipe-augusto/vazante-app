import { Injectable } from '@angular/core';


@Injectable()
export class Config {
  public FB: {
    appid: 109836813005590,
    version: "v2.8",
    permissions: ["public_profile"]
  }
}