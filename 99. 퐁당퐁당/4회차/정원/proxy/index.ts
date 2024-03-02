interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log("[RealSubject]: Handling Request...");
  }
}

class ProxyForSubject implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("[Proxy]: Checking access prior to firing a real request");
    return true;
  }

  private logAccess(): void {
    console.log("[Proxy]: Logging the time of request");
  }
}

const realSubject = new RealSubject();
const subjectProxy = new ProxyForSubject(realSubject);
subjectProxy.request();
