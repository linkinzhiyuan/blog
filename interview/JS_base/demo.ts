// 基础 class 父类
class BaseMenu {
  title: string;
  icon: string;

  constructor(title: string, icon: string){
    this.title = title;
    this.icon = icon;
  }

  isDisabled () {
    return false;
  }
}

class ButtonMenu extends BaseMenu {
  constructor(title: string, icon: string){
    super(title, icon)
  }

  exec () {
    console.log('hello');
  }
}

class SelectMenu extends BaseMenu {
  constructor(title:string, icon:string){
    super(title, icon)
  }

  exex () {
    return ['item1', 'item2', 'item3'];
  }
}

class ModalMenu extends BaseMenu {
  constructor(title: string, icon: string){
    super(title, icon)
  }

  exec () {
    const DIV = document.createElement('div');
    DIV.innerHTML = 'modal';
    return DIV;
  }
}

// start end b a c d


function TwoArr(m:number,n:number){
  
}