import { observable } from "mobx";
import _descriptor from '../descriptor/index'
import modelWrapper from 'components/Utils/ModelWrapper'

@modelWrapper
export default class mHome {

  @observable
  text = ""

  @observable
  opnamt = "123456"

  get descriptor(){
    return _descriptor
  }

  clear(){
    this.text = ""
    this.opnamt = ""
  }
}
