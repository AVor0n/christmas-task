export class Music {
  audio: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  play() {
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  reset() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
