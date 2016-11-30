import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import ResponseSection from "./../models/response-section";
import Timer           from "./../models/timer";

class SectionsStore {

  @observable model = new ResponseSection();
  @observable timer = null;

  @action edit(uid) {
    debugger
    this.model.set('uid', uid);
    this.model.fetch().then(
      () => {
        ui.setPageTitle(this.model.title);
        this.startTimer();
      }
    );
  }

  @action updateSection() {
    this.stopTimer();

    this.model.save().then(
      ({ data }) => {
        data && data.uid ?
          router.navigate('editResponseSection', { uid: data.uid }) :
          router.navigate('finish');
      }
    );
  }

  @action startTimer() {
    this.stopTimer();

    if (!this.model.isTimeLimited) return;

    this.timer = new Timer(
      this.model.get('uid'),
      this.model.timeLimit,
      this.model.bonusTime,
      this.updateSection.bind(this)
    );
  }

  @action stopTimer() {
    this.timer && this.timer.stop();
    this.timer = null;
  }

}

export default new SectionsStore();
