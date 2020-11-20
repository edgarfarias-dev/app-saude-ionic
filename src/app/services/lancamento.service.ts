import { Injectable } from '@angular/core';
import { Lancamento } from '../shared/lancamento.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private lancamentosCollection: AngularFirestoreCollection<Lancamento>

  constructor(private afs: AngularFirestore) {
    this.lancamentosCollection = this.afs.collection<Lancamento>('Lancamentos')
   }

   getLancamentos() {
     return this.lancamentosCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;

           return {id, ...data };
         })
       })
     )
   }

   addLancamento(lancamento: Lancamento) {
     return this.lancamentosCollection.add(lancamento)
   }

   getLancamento(id: string) {
     return this.lancamentosCollection.doc<Lancamento>(id).valueChanges();
   }

   updateLancamento(id: string, lancamento: Lancamento) {
     return this.lancamentosCollection.doc<Lancamento>(id).update(lancamento);
   }

   deleteLancamento(id: string) {
     return this.lancamentosCollection.doc(id).delete();
   }
}
