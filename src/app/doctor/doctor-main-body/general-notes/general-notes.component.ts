import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/shared/doctor.service';

@Component({
  selector: 'app-general-notes',
  templateUrl: './general-notes.component.html',
  styleUrls: ['./general-notes.component.scss']
})
export class GeneralNotesComponent implements OnInit {

  appointmentId;
  constructor(private router:ActivatedRoute,
    private doctorService:DoctorService,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.appointmentId=this.router.snapshot.params['appointmentId'];
    console.log(this.router.snapshot.params['appointmentId']);
  }

  onSubmit(generlNotesForm)
  {
    this.doctorService.addGeneralNotes(generlNotesForm.value).subscribe(result=>{
      console.log(result);
    })
    console.log(generlNotesForm.value);
    this.toast.success("Added","General Notes");
  }
}
