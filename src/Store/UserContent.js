import { observable} from "mobx";

class UserContent {
  @observable 
  uname = 'LXL';

  @observable
  upwd = '9536';

  @observable
  baseUrl = 'http://127.0.0.1:9536'

  logout()
  {
    this.uname = null
    this.upwd = null
    Storage.clearItems()

  }
}

export default new UserContent();