export default class Err404 extends Error{
  constructor(){
    super('404');
    this.name = 'Page Not Found';
  }
}
