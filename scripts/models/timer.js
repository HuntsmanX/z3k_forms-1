import { observable, computed, action, autorun } from "mobx";

class Timer {

  @observable remainingTime = 0;
  @observable isBonusTime   = false;

  constructor(storageId, time, bonus, callback) {
    this.storageId = storageId;
    this.callback  = callback;

    if (this.initFromLocalStorage()) return this.start();

    this.remainingTime = time * 60;
    this.bonus         = bonus * 60;
    this.isBonusTime   = false;

    this.start();
  }

  initFromLocalStorage() {
    if (!localStorage.getItem(this.storageId)) return false;

    const data = JSON.parse(localStorage.getItem(this.storageId));

    this.remainingTime = data.remainingTime;
    this.bonus         = data.bonus;
    this.isBonusTime   = data.isBonusTime;

    return true;
  }

  @action start() {
    this.createListener();
    this.timer = setInterval(
      () => this.tick(), 1000
    );
  }

  @action tick() {
    this.remainingTime--;
    this.persist();
  }

  @action persist() {
    const data = {
      remainingTime: this.remainingTime,
      bonus:         this.bonus,
      isBonusTime:   this.isBonusTime
    };
    localStorage.setItem(this.storageId, JSON.stringify(data));
  }

  @action enableBonusTime() {
    this.remainingTime = this.bonus;
    this.isBonusTime = true;
  }

  @action createListener() {
    this.disposeListener = autorun(
      () => {
        if (this.remainingTime > 0) return;
        if (!this.isBonusTime) return this.enableBonusTime();
        this.stop();
        this.callback();
      }
    );
  }

  @action stop() {
    clearInterval(this.timer);
    this.disposeListener();
  }

  @computed get formattedRemainingTime() {
    let secNum  = parseInt(this.remainingTime, 10);
    let hours   = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    if (hours   < 10) hours   = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${hours}:${minutes}:${seconds}`;
  }

}

export default Timer;
