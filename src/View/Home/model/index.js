import { observable } from "mobx";

export default class mModel {

  @observable
  text = ""

  @observable
  opnamt = "123456"

  clear(){
    this.text = ""
    this.opnamt = ""
  }
}
