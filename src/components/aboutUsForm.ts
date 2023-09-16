

export class AboutUsForm {
  private form: HTMLDivElement;

  

  constructor() {
    this.form = document.createElement('div');
   
  }
  
  createForm(): HTMLDivElement {
    return this.form;
  }

}