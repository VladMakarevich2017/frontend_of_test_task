import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
  @Input() treeFields;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nodeChecked(event) {
  }

}
