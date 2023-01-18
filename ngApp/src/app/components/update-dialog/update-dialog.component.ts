import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  images:any;
  file:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private imageService: ImageService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  uploadImage(){
    const formData = new FormData();
    formData.append('Productimage', this.images);
    this.imageService.ImageUpload(formData)
      .subscribe(
        res =>  this.data.imageUrl='http://localhost:3000/images/'+res.originalname,
        err => console.log(err)
      )
  }

  selectImage(event : any){
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      this.images= this.file;
      this.uploadImage()
    }
  }

}
