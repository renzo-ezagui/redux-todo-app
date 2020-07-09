import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  pendientes: number = 0;
  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store
    //   .select('filtro')
    //   .subscribe((filtro) => (this.filtroActual = filtro));

    this.store.subscribe((state) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter((todo) => !todo.completado).length;
      // console.log(this.pendientes);
    });
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    console.log(filtro);
    this.store.dispatch(actions.setFiltro({ filtro }));
  }

  limparCompletados() {
    this.store.dispatch(limpiarCompletados());
  }
}
