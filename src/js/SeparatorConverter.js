export default class SeparatorConverter {
  constructor(fromSeparator, toSeparator) {
    this.fromSeparator = fromSeparator;
    this.toSeparator = toSeparator || fromSeparator;
  }

  fromAttribute(value, type) {
    switch (type) {
      case Array:
        return value.split(this.fromSeparator);
    }
  }

  toAttribute(value, type) {
    switch (type) {
      case Array:
        return value.join(this.toSeparator);
    }
  }

  toObj() {
    const self = this;

    return {
      fromAttribute(value, type) {
        return self.fromAttribute(value, type);
      },

      toAttribute(value, type) {
        return self.toAttribute(value, type);
      }
    }
  }
};

export const space = new SeparatorConverter(/\s+/, ' ');
