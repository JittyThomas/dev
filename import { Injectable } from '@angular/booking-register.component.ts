import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomTypeService } from '../services/room-type.service';

@Component({
  selector: 'app-booking-register',
  templateUrl: './booking-register.component.html',
  styleUrls: ['./booking-register.component.css']
})
export class BookingRegisterComponent implements OnInit {
  bookingForm: FormGroup;
  roomTypes: any[];

  constructor(
    private formBuilder: FormBuilder,
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getRoomTypes();
  }

  initForm(): void {
    this.bookingForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      branchId: [0, Validators.required],
      roomId: [0, Validators.required],
      roomTypeId: [0, Validators.required],
      visitorDetails: this.formBuilder.array([
        this.initVisitor()
      ])
    });
  }

  initVisitor(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      isPrimary: [1, Validators.required]
    });
  }

  addVisitor(): void {
    const visitorDetails = this.bookingForm.get('visitorDetails') as FormArray;
    visitorDetails.push(this.initVisitor());
  }

  removeVisitor(index: number): void {
    const visitorDetails = this.bookingForm.get('visitorDetails') as FormArray;
    visitorDetails.removeAt(index);
  }

  getRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe(response => {
      this.roomTypes = response.data;
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;
      console.log('Booking Data:', bookingData);
      // Make POST request to store bookingData to JSON or perform other actions
    }
  }
}