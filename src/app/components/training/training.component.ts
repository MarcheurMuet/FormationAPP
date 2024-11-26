import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'angular-toastify';
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

  constructor(private apiService: ApiService, private _toastService : ToastService, private route: ActivatedRoute) {
    this.trainingForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const paramId = param.get('trainingId');
      paramId ? (this.trainingId = Number(paramId)) : console.log('no id');
      this.apiService
        .getTraining(this.trainingId)
        .subscribe((data) => (this.trainingToUpdate = data));
    });
  }

  updateTraining(training: Training, traningId: number) {
    this.apiService.updateTraining(training, traningId).subscribe({
      next: (value) => {
        this.message = "En cours d'envoi: " + value;
      },
      error: (err) => {
        this.message = 'Impossible: ' + err;
      },
      complete: () => {
        this.message = `${training.name} à été mise jour`;
      },
    });
  }

  postTraining(training: Training) {
    this.apiService.postTraining(training).subscribe({
      next: (value) => {
        this.message = "En cours d'envoi: " + value;
      },
      error: (err) => {
        this.message = 'Impossible: ' + err;
      },
      complete: () => {
        this.message = 'formation ajouté';
      },
    });
  }

  onSubmit(trainingForm: FormGroup) {
    if (!Number(trainingForm.value.price)) {
      this.message = 'Le prix doit etre un chiffre';
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
    } else this.message = 'il faut remplir les champs';
    trainingForm.reset();
    this.addInfoToastAddTraining();
  }

  
  addInfoToastAddTraining() {
    this._toastService.success('Article ajouté a la bdd');
  }
}
