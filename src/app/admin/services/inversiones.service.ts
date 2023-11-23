import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class InversionesService {

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<{ inversiones: any[], length: number }>(`${base_url}/inversiones`).pipe(
      map(resp => {
        return { inversiones: resp.inversiones, length: resp.length }
      })
    )
  }

  searchPorNombre(text: string) {
    return this.http.get<any[]>(`${base_url}/inversiones/withname/${text}`).pipe(
      map(resp => resp)
    )
  }

  edit(id_inversion: string, inversion: any) {
    return this.http.put<any>(`${base_url}/inversiones/${id_inversion}`, inversion).pipe(
      map(resp => resp)
    )
  }

  add(inversion: any) {
    return this.http.post<any>(`${base_url}/inversiones`, inversion).pipe(
      map(resp => resp)
    )
  }

  delete(id_inversion: string) {
    return this.http.delete<any>(`${base_url}/inversiones/${id_inversion}`).pipe(
      map(resp => resp))
  }
}
