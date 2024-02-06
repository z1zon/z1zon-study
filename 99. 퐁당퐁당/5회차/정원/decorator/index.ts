interface Component {
  execute(): string;
}

/**
 * purpose: provide default implementation of the operation
 */
class ConcreteComponent implements Component {
  public execute(): string {
    return "Concrete Component";
  }
}

/**
 * purpose: define wrapping interface for all concrete decorators
 */
class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  // action: delete all the works to the wrapped component
  public execute(): string {
    return this.component.execute();
  }
}

class ConcreteDecoratorA extends Decorator {
  public execute(): string {
    return `ConcreteDecoratorA(${super.execute()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public execute(): string {
    return `ConcreteDecoratorB(${super.execute()})`;
  }
}

// decorator can wrap components & other decorators as well
const simpleComponent = new ConcreteComponent();
const decoratorA = new ConcreteDecoratorA(simpleComponent);
const decoratorB = new ConcreteDecoratorB(decoratorA);
console.log(`[Result]: ${decoratorB.execute()}`);
