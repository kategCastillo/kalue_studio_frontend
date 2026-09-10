import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpMaterials } from '../../../core/services/http-materials';
import { HttpCategorys } from '../../../core/services/http-categorys';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpProducts } from '../../../core/services/http-products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-new-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './products-new-form.html',
  styleUrl: './products-new-form.css',
})
export default class ProductsNewForm {
 public formData: FormGroup;
  private httpCategories = inject(HttpCategorys);
  categoryList$ = new BehaviorSubject<any[]>([]);
  private httpMaterials = inject(HttpMaterials);
  materialList$ = new BehaviorSubject<any[]>([]);
  private httpProduct = inject(HttpProducts);
  selectedFiles: any[] = [];
  imageError: string | null = null;

  constructor() {
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        description: new FormControl('', [
          Validators.maxLength(300),
        ]),
        category: new FormControl('', [Validators.required]),
        material: new FormControl('', [Validators.required]),
        price: new FormControl(0, [
          Validators.required,
          Validators.min(0),
        ]),
        stock: new FormControl(1, [Validators.min(0)]),
        isFeatured: new FormControl(false),
        isActive: new FormControl(true),
      },
    );
  }

  onSend() {

    if (this.selectedFiles.length === 0) {
      this.imageError = 'Please select at least one image.';
      this.formData.markAllAsTouched();
      return;
    }

    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    const payload = new FormData();
    Object.keys(this.formData.value).forEach((key) => {
      payload.append(key, this.formData.get(key)?.value);
    });

    this.selectedFiles.forEach(item => {
      payload.append('images', item.file);
    });

    //verifica si el campo es valido
    if (this.formData.valid) {
      //Muestro los valores que capturo el formulario
      console.log(this.formData.value);
      this.httpProduct.createProduct(payload).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Creado',
            text: res?.msg || 'El producto se creó con éxito.',
            icon: 'success',
          });
          this.formData.reset();
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: error?.error?.msg || 'No se pudo crear el producto.',
            icon: 'error',
          });
        },
      });
    } else {
      console.log('formulario invalido');
    }
  }

  ngOnInit() {
    this.httpCategories.getCategorys().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categoryList$.next(categories.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete execute');
      },
    });

    this.httpMaterials.getMaterials().subscribe({
      next: (materials) => {
        console.log(materials);
        this.materialList$.next(materials.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete execute');
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageError = null;

    
    //valida la longitud max de los archivos permitidos
  if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      
      if(this.selectedFiles.length + files.length > 5) {
        this.imageError = 'You can only upload a maximum of 5 images.';
        return;
      }

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          this.imageError = 'Only image files are allowed.';
          return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
          this.imageError = 'Each image must be less than 5MB.';
          return;
        }

        this.selectedFiles.push({ file,preview: URL.createObjectURL(file) });
      }
    }
    input.value = ''; // Clear the input value to allow re-selection of the same file
  }


}

