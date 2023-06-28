import { Injectable } from "@angular/core";
import { Entity } from "../models/entity.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get<T extends Entity>(entityType:string){
    let entities: T[];
    const json = localStorage.getItem(entityType);
    entities = json != null ? JSON.parse(json) : [];
    return entities;
  }

  getById<T extends Entity>(entityType: string, entityId: string){
    let entities = this.get<T>(entityType);
    let foundEntity = entities.find(entity=> entity.id === entityId);
    return foundEntity;
  }

  post<T extends Entity>(entityType: string, newEntity: T){
    let entities = this.get<T>(entityType);
    entities.push(newEntity);
    this._save(entityType, entities);
  }

  postMany<T extends Entity>(entityType: string, newEntities: T[]){
    let entities =  this.get<T>(entityType);
    entities.push(...newEntities);
    this._save(entityType, entities);

  }

  put<T extends Entity>(entityType: string, updatedEntity: T){
    let entities = this.get<T>(entityType);
    const index = entities.findIndex(entity => entity.id === updatedEntity.id);
    entities.splice(index, 1, updatedEntity);
    this._save(entityType, entities);
  }


  remove<T extends Entity>(entityType: string, entityId: string){
    let entities = this.get<T>(entityType);
    const index = entities.findIndex(entity => entity.id === entityId);
    entities.splice(index, 1);
    this._save(entityType, entities);
  }

  removeLocalStorageSessions(entityType:string) {
    localStorage.removeItem(entityType);
    return {message: `${entityType} was remove from storage`}
  }

  _save<T>(entityType: string, entities: T[] ){
    localStorage.setItem(entityType, JSON.stringify(entities));
 }


}
