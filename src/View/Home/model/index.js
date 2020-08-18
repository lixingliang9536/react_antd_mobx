import { observable } from "mobx";

export default class mHome {

  @observable
  text = ""

  @observable
  opnamt = "123456"

  clear(){
    this.text = ""
    this.opnamt = ""
  }
}
