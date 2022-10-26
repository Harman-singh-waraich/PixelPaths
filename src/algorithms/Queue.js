module.exports = class Queue {
  constructor() {
    this.queue = [];
  }
  //push
  push(element) {
    this.queue.push(element);
  }

  //pop
  pop() {
    if (this.isEmpty()) {
      return "Queue empty";
    } else {
      return this.queue.shift();
    }
  }

  //front
  front() {
    if (this.isEmpty()) {
      return "Queue empty";
    } else {
      return this.queue[0];
    }
  }
  //is empty
  isEmpty() {
    return this.queue.length === 0;
  }
  //print queue
  print() {
    var str = "";
    for (var i = 0; i < this.queue.length; i++) str += this.queue[i] + " ";
    return str;
  }
}