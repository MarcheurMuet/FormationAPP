import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'angular-toastify';

/**
 * Composant pour afficher et gérer une formation.
 * Permet de créer une nouvelle formation ou de modifier une formation existante.
 */
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  trainingId: number;
  trainingForm: FormGroup;
  message: string | null = null;
  trainingToUpdate: Training;

  /**
   * Constructeur du composant TrainingComponent.
   * @param apiService Service d'API pour interagir avec le backend
   * @param _toastService Service pour afficher des notifications Toast
   * @param route Service pour accéder aux paramètres de la route
   */
  constructor(
    private apiService: ApiService, 
    private _toastService: ToastService, 
    private route: ActivatedRoute
  ) {
    this.trainingForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
    });
  }

  /**
   * Méthode d'initialisation du composant.
   * Récupère l'ID de la formation à partir des paramètres de la route et charge les données de la formation à modifier si un ID est fourni.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const paramId = param.get('trainingId');
      if (paramId) {
        this.trainingId = Number(paramId);
        this.loadTrainingData();
      }
    });
  }

  /**
   * Charge les données de la formation à modifier si un trainingId est présent.
   */
  loadTrainingData(): void {
    if (this.trainingId) {
      this.apiService.getTraining(this.trainingId).subscribe((data) => {
        this.trainingToUpdate = data;
        this.trainingForm.setValue({
          name: data.name,
          description: data.description,
          price: data.price,
        });
      });
    }
  }

  /**
   * Met à jour une formation existante.
   * @param training La formation à mettre à jour
   * @param trainingId L'identifiant de la formation à mettre à jour
   */
  updateTraining(training: Training, trainingId: number): void {
    this.apiService.updateTraining(training, trainingId).subscribe({
      next: (value) => {
        this.message = `En cours d'envoi: ${value}`;
      },
      error: (err) => {
        this.message = `Impossible: ${err}`;
      },
      complete: () => {
        this.message = `${training.name} a été mise à jour`;
      },
    });
  }

  /**
   * Ajoute une nouvelle formation.
   * @param training La formation à ajouter
   */
  postTraining(training: Training): void {
    this.apiService.postTraining(training).subscribe({
      next: (value) => {
        this.message = `En cours d'envoi: ${value}`;
      },
      error: (err) => {
        this.message = `Impossible: ${err}`;
      },
      complete: () => {
        this.message = 'Formation ajoutée';
      },
    });
  }

  /**
   * Méthode appelée lors de l'envoi du formulaire de formation.
   * Valide les données du formulaire et appelle les méthodes pour ajouter ou mettre à jour la formation.
   * @param trainingForm Le formulaire de formation à soumettre
   */
  onSubmit(trainingForm: FormGroup): void {

    if (!Number(trainingForm.value.price)) {
      this.message = 'Le prix doit être un chiffre';
      return;
    }
    if (this.trainingForm.valid) {
      const training = new Training(
        undefined,
        trainingForm.value.name,
        trainingForm.value.description,
        trainingForm.value.price,
        1
      );
      if (!this.trainingId) {
        this.postTraining(training);
      } else {
        this.updateTraining(training, this.trainingId);
      }

      trainingForm.reset();
      this.addInfoToastAddTraining();
    } else {
      this.message = 'Il faut remplir les champs';
    }
  }

  /**
   * Affiche une notification toast pour indiquer que la formation a été ajoutée à la base de données.
   */
  addInfoToastAddTraining(): void {
    this._toastService.success('Article ajouté à la base de données');
  }
}
