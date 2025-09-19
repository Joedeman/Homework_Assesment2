import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  standalone: false,
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  isModalOpen = false;
  selectedWorkout = '';
  completedExercises: { [key: string]: boolean } = {};
  private _storage: Storage | null = null;

  workoutDetails: { [key: string]: string[] } = {
    'Female Fat Burn': [
      'Jumping Jacks - 3 sets of 30 secs',
      'Mountain Climbers - 3 sets of 45 secs',
      'Burpees - 3 sets of 10 reps',
      'High Knees - 3 sets of 30 secs'
    ],
    'Female Glutes Focus': [
      'Glute Bridges - 4 sets of 15 reps',
      'Donkey Kicks - 3 sets of 12 reps (each leg)',
      'Fire Hydrants - 3 sets of 15 reps',
      'Squats with Pulse - 3 sets of 20 reps'
    ],
    'Male Muscle Gain': [
      'Push Ups - 4 sets of 20 reps',
      'Dumbbell Bench Press - 3 sets of 10 reps',
      'Barbell Deadlift - 3 sets of 8 reps',
      'Pull Ups - 3 sets to failure'
    ],
    'Male Strength Builder': [
      'Squats - 4 sets of 6 reps (heavy)',
      'Deadlifts - 4 sets of 5 reps',
      'Overhead Press - 3 sets of 8 reps',
      'Bent Over Rows - 3 sets of 10 reps'
    ]
  };

  constructor(private storage: Storage) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
  }

  async openWorkoutModal(workout: string) {
    this.selectedWorkout = workout;
    this.isModalOpen = true;

    const stored = await this._storage?.get(workout);
    this.completedExercises = stored || {};
  }

  async closeModal() {
    await this._storage?.set(this.selectedWorkout, this.completedExercises);
    this.isModalOpen = false;
  }
}
