interface Product {
  operation(): string;
}

abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation(): string {
    const product = this.factoryMethod();

    return product.operation();
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

function clientCode(creator: Creator) {
  // ...
  console.log(creator.someOperation());
  // ...
}

clientCode(new ConcreteCreator1());
clientCode(new ConcreteCreator2());
