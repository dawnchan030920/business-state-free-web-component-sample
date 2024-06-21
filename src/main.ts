import "./counter-component";
import { fromEvent } from "rxjs";

const counter = document.querySelector('counter-component')!;

console.log("Current value is:", counter.value);

fromEvent(counter, 'valueChanged')
  .subscribe(e => console.log("New value:", e.detail.value));
