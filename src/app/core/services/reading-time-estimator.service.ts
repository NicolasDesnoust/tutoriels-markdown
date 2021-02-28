import { Injectable } from '@angular/core';

const AVERAGE_WORDS_PER_MINUTE = 250;

@Injectable({
  providedIn: 'root'
})
export class ReadingTimeEstimator {
  
  computeReadingTime(text: string) {
    return Math.ceil(this.getWordCount(text) / AVERAGE_WORDS_PER_MINUTE);
  }
  
  private getWordCount(text: string) {
    return text.match(/\w+/g).length;
  }
}
