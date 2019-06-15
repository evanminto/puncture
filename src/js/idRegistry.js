export class IDRegistry {
  constructor() {
    this.ids = [];
    this.index = 1;
  }

  getNew() {
    const id = `puncture_${this.index++}`;
    this.ids.push(id);

    return id;
  }
}

export default new IDRegistry();
