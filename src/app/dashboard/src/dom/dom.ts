declare global {
  // eslint-disable-next-line no-unused-vars
  interface Element {
    addClass(newClass: string): void;
    removeClass(newClass: string): void;
    toggleClass(css: string, add: boolean): void;
    changeClass(oldClass: string, newClass: string): void;
  }
  // eslint-disable-next-line no-unused-vars
  interface NodeList {
    addClass(newClass: string): void;
    removeClass(newClass: string): void;
    toggleClass(css: string, add: boolean): void;
    changeClass(oldClass: string, newClass: string): void;
  }
}
const addClass = (element: Element, newClass: string) => {
  if (element && element.classList) {
    element.classList.add(newClass);
  }
};
const removeClass = (element: Element, old: string) => {
  if (element && element.classList) {
    element.classList.remove(old);
  }
};
const toggleClass = (element: Element, css: string, add: boolean) => {
  if (element && element.classList) {
    if (add) {
      element.classList.add(css);
    } else {
      element.classList.remove(css);
    }
  }
};
const changeClass = (element: Element, old: string, newClass: string) => {
  if (element && element.classList) {
    element.classList.remove(old);
    element.classList.add(newClass);
  }
};

export const overwriteElementPrototypes = () => {
  const p = Element.prototype;
  const n = NodeList.prototype;

  // addClass
  p.addClass = async function(newClass: string): Promise<void> {
    const element: Element = this;
    addClass(element, newClass);
  };
  n.addClass = function(newClass: string): void {
    this.forEach((element: Element) => {
      addClass(element, newClass);
    });
  };
  // removeClass
  p.removeClass = async function(old: string): Promise<void> {
    const element: Element = this; // not works with arrow function
    removeClass(element, old);
  };
  n.removeClass = function(old: string): void {
    this.forEach((element: Element) => {
      removeClass(element, old);
    });
  };

  // toggleClass
  p.toggleClass = async function(css: string, add: boolean): Promise<void> {
    const element: Element = this; // not works with arrow function
    toggleClass(element, css, add);
  };
  n.toggleClass = function(css: string, add: boolean): void {
    this.forEach((element: Element) => {
      toggleClass(element, css, add);
    });
  };

  // changeClass
  p.changeClass = async function(old: string, newClass: string): Promise<void> {
    const element: Element = this; // not works with arrow function
    changeClass(element, old, newClass);
  };
  n.changeClass = function(old: string, newClass: string): void {
    this.forEach((element: Element) => {
      changeClass(element, old, newClass);
    });
  };
};
