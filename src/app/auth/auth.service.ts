import * as firebase from 'firebase';
import { RecipeServerService } from '../recipe-server.service';
import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';

export class AuthService{

    token: string;

    signupusers(email, password){
        console.log(email);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
           error => console.log(error)
       )
    }
    signinuser(email: string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => {
                        this.token = token;
                    }
                )
            }
            
        )
        .catch(
            error => console.log(error)
        )
    }

    getToken(){
        firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                )
        return this.token;
    }

    isAuthenticated(){
        return this.token!= null;
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }


}