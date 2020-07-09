import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;
  editando = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.todo.completado = true;
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(() =>
      this.store.dispatch(actions.toggle({ id: this.todo.id }))
    );
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    if (this.txtInput.invalid) {
      this.editando = false;
      return;
    }
    if (this.txtInput.value === this.todo.texto) {
      this.editando = false;
      return;
    }

    if (this.editando === false) {
      return;
    }

    this.editando = false;
    this.store.dispatch(
      actions.editar({ id: this.todo.id, texto: this.txtInput.value })
    );
  }
  borrar() {
    this.store.dispatch(actions.borrar({ id: this.todo.id }));
  }
}
