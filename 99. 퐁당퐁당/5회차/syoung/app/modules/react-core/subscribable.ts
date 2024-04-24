type Listener = () => void;

export class Subscribable<TListener extends Function = Listener> {
  protected listeners: Set<TListener>;

  constructor() {
    this.listeners = new Set();
    this.subscribe = this.subscribe.bind(this);
  }

  subscribe(listener: TListener): () => void {
    this.listeners.add(listener);
    this.onSubscribe();

    const unsubscribe = () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };

    return unsubscribe;
  }

  hasListeners() {
    return this.listeners.size > 0;
  }

  protected onSubscribe(): void {}

  protected onUnsubscribe(): void {}
}
