import { observable, computed, action, autorun } from "mobx";

class Timer {

  @observable remainingTime = 0;

  isBonusTime = false;

  @action start(timeLimit, bonusTime, action) {
    this.timeLimit     = +localStorage.getItem("currentTime") || timeLimit * 60 || 0;
    this.bonusTime     = bonusTime * 60 || 0;
    this.remainingTime = this.timeLimit;
    this.callback      = action;

    
    localStorage.setItem('timeLimit', this.timeLimit);
    localStorage.setItem('bonusTime', this.bonusTime);

    this.tick();
  }

  @action tick() {
    this.timer = setInterval(
      () => this.decrement(), 1000
    );
    this.createListener()
  }

  @action enableBonusTime() {
    this.remainingTime = this.bonusTime;
    this.isBonusTime = true;
  }

  @action createListener() {
    this.disposer = autorun(
      () => {
        if (this.remainingTime > 0) return;
        if (!this.isBonusTime) return this.enableBonusTime();
        this.callback();
        this.cleanUp();
      }
    );
  }

  @action cleanUp() {
    clearInterval(this.timer);
    this.disposer();
  }

  @action decrement() {
    localStorage.setItem('currentTime', this.remainingTime);
    this.remainingTime--;
  }

  @computed get formattedRemainingTime() {
    let secNum  = parseInt(this.remainingTime, 10);
    let hours   = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    if (hours   < 10) hours   = `0 ${hours}`;
    if (minutes < 10) minutes = `0 ${minutes}`;
    if (seconds < 10) seconds = `0 ${seconds}`;

    let str = '';
    this.isBonusTime ?  str = 'Bonus Time: ' :  str = 'Time: '
    return `${str} ${hours} : ${minutes} : ${seconds}`;
  }

}
export default Timer;
