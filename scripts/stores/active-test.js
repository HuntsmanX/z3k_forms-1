import { action, observable } from "mobx";

import ui     from "./ui";
import router from "./router";

import Response        from "./../models/response";
import ResponseSection from "./../models/active-section";
import Timer           from "./../models/timer";

class ActiveTestStore {

  @observable response = new Response();
  @observable section  = new ResponseSection();
  @observable timer    = null;

  @action newResponse() {
    this.response = new Response();
    ui.setPageTitle("New Response");
  }

  @action createResponse() {
    this.response.save().then(
      () => router.navigate('start', { id: this.response.id })
    );
  }

  @action start(id) {
    this.response.set('id', id);
    this.response.fetch().then(
      () => ui.setPageTitle(this.response.name)
    );
  }

  @action showSection(uid) {
    this.section.set('uid', uid);
    this.section.fetch().then(
      () => {
        ui.setPageTitle(this.section.title);
        this.startTimer();
      }
    );
  }

  @action submitSection() {
    this.stopTimer();

    this.section.save().then(
      ({ meta }) => {
        meta.nextUid ?
          router.navigate('editResponseSection', { uid: meta.nextUid }) :
          router.navigate('finish');
      }
    );
  }

  @action finish() {
    ui.setPageTitle('Thank you!');
  }

  @action startTimer() {
    this.stopTimer();

    if (!this.section.isTimeLimited) return;

    this.timer = new Timer(
      this.section.get('uid'),
      this.section.timeLimit,
      this.section.bonusTime,
      this.submitSection.bind(this)
    );
  }

  @action stopTimer() {
    this.timer && this.timer.stop();
    this.timer = null;
  }

}

export default new ActiveTestStore();
