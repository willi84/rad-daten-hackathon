/**
 * @jest-environment jsdom
 */
import {overwriteElementPrototypes} from './dom';

describe('test prototypes', () => {
  it('should test addClass on 1 element', () => {
    document.documentElement.innerHTML = '<div id="test"></div>';
    const element = document.querySelector('#test');
    expect(element.getAttribute('class')).toEqual(null);
    expect(typeof element.addClass).toEqual('undefined');
    overwriteElementPrototypes();
    expect(typeof element.addClass).toEqual('function');
    element.addClass('foobar');
    expect(element.getAttribute('class')).toEqual('foobar');
    element.removeClass('foobar');
    expect(element.getAttribute('class')).toEqual('');
    element.toggleClass('foor', true);
    expect(element.getAttribute('class')).toEqual('foor');
    element.toggleClass('foor', false);
    expect(element.getAttribute('class')).toEqual('');
    element.addClass('blubber');
    element.changeClass('blubber', 'newClass');
    expect(element.getAttribute('class')).toEqual('newClass');
    expect(true).toEqual(true);
  });
  it('should test addClass to multiple elements', () => {
    document.documentElement.innerHTML = `
    <div class="test"></div><div class="test"></div>
    `;
    const elements = document.querySelectorAll('.test');
    overwriteElementPrototypes();
    elements.addClass('foobar');
    elements.forEach((element) => {
      expect(element.getAttribute('class')).toEqual('test foobar');
    });
    elements.removeClass('foobar');
    elements.forEach((element) => {
      expect(element.getAttribute('class')).toEqual('test');
    });
    elements.toggleClass('bar', true);
    elements.forEach((element) => {
      expect(element.getAttribute('class')).toEqual('test bar');
    });
    elements.changeClass('bar', 'lorem');
    elements.forEach((element) => {
      expect(element.getAttribute('class')).toEqual('test lorem');
    });
  });
});
