import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpMaterials } from '../../../core/services/http-materials';
import { HttpCategorys } from '../../../core/services/http-categorys';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpProducts } from '../../../core/services/http-products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-edit-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './products-edit-form.html',
  styleUrl: './products-edit-form.css',
})
export default class ProductsEditForm {
  selectedId!: string | null | any;    //'id' evita que TS me obligue a definir el valor del atributo

  private activatedRoute = inject(ActivatedRoute);
  formData: FormGroup;

  private httpMaterials = inject(HttpMaterials)
  private httpCategory = inject(HttpCategorys)
  private httpProduct = inject(HttpProducts)

  materialList$ = new BehaviorSubject<any[]>([]);
  categoryList$ = new BehaviorSubject<any[]>([]);

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      description: new FormControl(),
      stock: new FormControl(1, [Validators.min(1)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      material: new FormControl('Cuero',),
      category: new FormControl('', [Validators.required]),
      imagen: new FormControl(),
      isFeatured: new FormControl(true),
      isActive: new FormControl(true)
    });
  }
  ngOnInit() {
    //Obtener ek ID que se encuentra el la URL(solamente cuando el formulario de editar es un componente de página)
    this.selectedId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getDataFillForm();

    this.getMaterials();

  }
  private getDataFillForm() {
    //consulgta para traer los datos del usuasrio por el ID que obtiene de la URL
    this.httpProduct.getProductById(this.selectedId!).subscribe({
      next: (data) => {
        console.log(data);

        const { name, description, stock, price } = data.data;

        //llenar los ncampos del formulario con los datos obtenidos por el ID de la URL
        this.formData.patchValue({
          name,
          description,
          stock,
          price,


        })
      },

      error: (error) => {
        console.error(error);
      },

      complete: () => {
        console.log('realiza la peticion para actualizar el producto por ID')
      }
    })
  }

  getMaterials() {
    this.httpMaterials.getMaterials().subscribe({
      next: (data) => {
        console.log(data)
        this.materialList$.next(data.data)

      },
      error: (error) => {
        console.error(error)
      },
      complete: () => { }
    })

    this.httpCategory.getCategorys().subscribe({
      next: (data) => {
        console.log(data)
        this.categoryList$.next(data.data)
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => { }
    })
  }

  onSubmit() {

    //validar que el formulario sea valido
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      console.log('Formulario invalido')
      return;
    }

    console.log(this.formData.value);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Puedes volver a editar este producto más tarde.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
    }).then((result) => {
      if (!result.isConfirmed) return;

      // Antes esta petición se ejecutaba SIEMPRE (incluso si se cancelaba el
      // diálogo) y nunca mostraba el resultado real de la actualización.
      // Ahora solo corre si se confirma, y muestra el msg que responde el backend.
      this.httpProduct.updateProductById(this.selectedId, this.formData.value).subscribe({
        next: (data: any) => {
          Swal.fire({
            title: 'Actualizado',
            text: data?.msg || 'El producto se actualizó con éxito.',
            icon: 'success',
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: error?.error?.msg || 'No se pudo actualizar el producto.',
            icon: 'error',
          });
        },
      });
    });
  }
}
