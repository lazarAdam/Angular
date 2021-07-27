import { Component } from '@angular/core';

@Component({
  selector: 'components-and-databinding',
  templateUrl: './components-and-databinding.cp.html',
  styleUrls: ['./components-and-databinding.cp.css']
})
export class ComponentsAndDatabindingCp {
  serverElements = [
    {type:'server',name:'testServer', content:'just a test'}
  ];


  onAddServerAdded(serverData:{serverName:string,serverContent:string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onAddBlueprintAdded(bluePrintData:{serverName:string,serverContent:string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrintData.serverName,
      content: bluePrintData.serverContent
    });
  }

  onChangeFirst(){

    this.serverElements[0].name = 'changed!'

    console.log(this.serverElements)

  }

  onDestroyFirst(){

    this.serverElements.splice(0,1)
  }
}
