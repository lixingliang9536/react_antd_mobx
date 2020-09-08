import { observable } from "mobx";

export default class mModel {


  @observable
  aaa = "123"

  clear(){
    this.aaa = ""
  }
}
