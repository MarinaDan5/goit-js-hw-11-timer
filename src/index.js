const refs = {
  timer: document.querySelector('#timer-1'),
  days: document.querySelector('.value[data-value="days"]'),
  hours: document.querySelector('.value[data-value="hours"]'),
  mins: document.querySelector('.value[data-value="mins"]'),
  secs: document.querySelector('.value[data-value="secs"]'),
}

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
 
  intervalId = setInterval(() => {
    const nowDate = Date.now();
    const deltaTime = this.targetDate - nowDate;
    this.getTimeComponents(deltaTime);
    this.stop(deltaTime)
  }, 1000);

  stop(deltaTime) {
    if (deltaTime < 0) {
      clearInterval(this.intervalId)
      refs.timer.textContent = "Time is over";
    }
  };

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
    refs.days.innerHTML = days;
    refs.hours.innerHTML = hours;
    refs.mins.innerHTML = mins;
    refs.secs.innerHTML = secs;

    return { days, hours, mins, secs }
  };

  pad(value) {
    return String(value).padStart(2, '0');
  };
};

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 10, 2021, 13:03:00'),
});
