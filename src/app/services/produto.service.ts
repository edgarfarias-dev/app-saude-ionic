import { Injectable } from '@angular/core';
import { Produto } from '../shared/produto.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtosCollection: AngularFirestoreCollection<Produto>

  constructor(private afs: AngularFirestore) {
    this.produtosCollection = this.afs.collection<Produto>('Produtos')
   }

   getProdutos() {
     return this.produtosCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;

           return {id, ...data };
         })
       })
     )
   }

   addProduto(produto: Produto) {
     return this.produtosCollection.add(produto)
   }

   getProduto(id: string) {
     return this.produtosCollection.doc<Produto>(id).valueChanges();
   }

   updateProduto(id: string, produto: Produto) {
     return this.produtosCollection.doc<Produto>(id).update(produto);
   }

   deleteProduto(id: string) {
     return this.produtosCollection.doc(id).delete();
   }
}
