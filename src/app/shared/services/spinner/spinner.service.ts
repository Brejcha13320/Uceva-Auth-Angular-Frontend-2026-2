import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
   $loading = signal(false);

  private requestsInProgress = 0;

  show(): void {
    this.requestsInProgress++;
    this.$loading.set(true);
  }

  hide(): void {
    this.requestsInProgress = Math.max(
      0,
      this.requestsInProgress - 1
    );

    this.$loading.set(this.requestsInProgress > 0);
  }
}
