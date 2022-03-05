import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/shared/appointment.service';
@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.scss']
})
export class ConsultingComponent implements OnInit {
  appointmentId;
  patientDetails={firstName:"As",lastName:""};
  constructor(private router:ActivatedRoute,private appointService:AppointmentService) { }

  ngOnInit(): void {
    this.appointmentId=this.router.snapshot.params['appointmentId'];
    console.log(this.router.snapshot.params['appointmentId']);
    this.appointService.getAppById(this.appointmentId).subscribe(result=>{
      console.log(result);
      this.patientDetails =result[0];
      console.log(this.patientDetails);
    })
    
  }

}
