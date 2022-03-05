import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  nameUser="";
  role=["","Admin","Doctor","Receptionist","Pharmacist","Lab Tech"];
  roleId=0;
  constructor(private user:UsersService) { }

  ngOnInit(): void {
    sessionStorage.getItem("USERID");
    this.user.getUserById(sessionStorage.getItem("USERID")).subscribe(result=>{
      console.log(result);
      this.nameUser=result.FirstName;
      this.roleId=result.RoleId;
    })
  }

}
