import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.css']
})
export class ModalOrderComponent implements OnInit {

  @Input() title: string = '';
  @Input() content: string = '';
  @Input() data : any;
  // @Output() close = new EventEmitter<void>();
  @Output() close = new EventEmitter<boolean>();
 
  constructor() { }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes['data']){
      console.log('Data changed:', changes['data']);
    }
  }
  ngOnInit(): void {
    console.log('ngOnInit');
  }


  ngDoCheck() : void{
    console.log('ngDoCheck');
  }

  ngOnDestroy(): void{
    console.log('ngOnDestroy');
  }

  closeModal():void{
    this.close.emit();
  }

}
