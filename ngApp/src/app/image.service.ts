import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _uploadImageUrl = 'http://localhost:3000/api/uploadImage';
  constructor(private http:HttpClient) { }
  ImageUpload(formData:any){
    return this.http.post<any>(this._uploadImageUrl,formData)
  }
}
