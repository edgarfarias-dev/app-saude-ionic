import { Injectable } from '@angular/core';
import { Cliente } from '../shared/cliente.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesCollection: AngularFirestoreCollection<Cliente>

  constructor(private afs: AngularFirestore) {
    this.clientesCollection = this.afs.collection<Cliente>('Clientes')
   }

   getClientes() {
     return this.clientesCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;

           return {id, ...data };
         })
       })
     )
   }

   addCliente(cliente: Cliente) {
     return this.clientesCollection.add(cliente)
   }

   getCliente(id: string) {
     return this.clientesCollection.doc<Cliente>(id).valueChanges();
   }

   updateCliente(id: string, cliente: Cliente) {
     return this.clientesCollection.doc<Cliente>(id).update(cliente);
   }

   deleteCliente(id: string) {
     return this.clientesCollection.doc(id).delete();
   }
}
