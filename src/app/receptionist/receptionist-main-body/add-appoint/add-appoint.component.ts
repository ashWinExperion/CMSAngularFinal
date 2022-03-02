import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { DoctorService } from 'src/app/shared/doctor.service';
import { PatientsService } from 'src/app/shared/patients.service';
import{Appointment} from '../../../shared/appointment'

@Component({
  selector: 'app-add-appoint',
  templateUrl: './add-appoint.component.html',
  styleUrls: ['./add-appoint.component.scss']
})
export class AddAppointComponent implements OnInit {
  listDoctorsBasedOnSpecialisation;
  listSpecialization;
  listOfPatients;
  selectPatinetId;
  selectedOption;
  dateToday=new Date();
  previewOption: any;
  selectedValue?: string;
  editAppointID:Appointment=new Appointment();
  receptionistIdLogedUser;
  dateIsNotValid;
  
  constructor(private doctorSrvice:DoctorService,
    public appointmentService:AppointmentService,
    private patientsService :PatientsService,
    private route:Router,
    private toastr:ToastrService) { }

  
  onChange(id){
    this.doctorSrvice.getAllDoctorBasedOnSpId(id).subscribe(result=>{
      this.listDoctorsBasedOnSpecialisation=result;
      console.log(result);
    })
  }

  ngOnInit(): void {
    this.receptionistIdLogedUser=sessionStorage.getItem('USERID');
    
    this.doctorSrvice.getAllSpecialization().subscribe(
      result=>{
        this.listSpecialization=result;
        console.log(this.listSpecialization);
      }
    ) 
    this.patientsService.getAllPatients().subscribe(result=>
      {
        this.listOfPatients=result;
      })
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectPatinetId=event.item.PatientId;
    this.selectedOption = event.item;
    console.log(this.selectPatinetId);

  }

  onPreview(event: TypeaheadMatch): void {
    if (event) {
      this.previewOption = event.item;
    } else {
      this.previewOption = null;
    }
  }

  onDateChange(dateValue){
    console.log(event);
    let today=new Date();
    let compareDay=new Date(dateValue);

    var result = new Date(today);
    result.setDate(result.getDate() + 1);
    if (result<compareDay) {
      this.dateIsNotValid=true;
    }
    else
    {
      this.dateIsNotValid=false;
    }
    this.appointmentService.getNextToken(dateValue);
  }

 
  
  onSubmit(form){
    if(form.value['PatientId']>=0)
    {
      delete form.value['PatientName']; 
      this.appointmentService.addApointments(form.value).subscribe(result=>{
        this.toastr.success("Appointment Added...!!!","Success");
        this.route.navigate(["/receptionist/appointment"]);
        console.log(result);
        
      });
    }
    else
    {
      this.toastr.error("Select A Valid Patient...!!!","Error");
    }
    console.log(form.value);
  }

 
}
