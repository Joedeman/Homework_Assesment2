import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  standalone: false,
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  completedExercisesMap: { [key: string]: string[] } = {};
  overallCompletion: number = 0;
  totalExercises: number = 0;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
    await this.calculateProgress();
  }

  async calculateProgress() {
    type WorkoutType = 'Female Fat Burn' | 'Female Glutes Focus' | 'Male Muscle Gain' | 'Male Strength Builder';

    const workouts: WorkoutType[] = [
      'Female Fat Burn',
      'Female Glutes Focus',
      'Male Muscle Gain',
      'Male Strength Builder'
    ];

    const allDetails: Record<WorkoutType, string[]> = {
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

    let completed = 0;
    let total = 0;

    for (const workout of workouts) {
      const stored = await this._storage?.get(workout);
      const completedList: string[] = [];

      for (const exercise of allDetails[workout]) {
        total++;
        if (stored && stored[exercise]) {
          completed++;
          completedList.push(exercise);
        }
      }

      if (completedList.length > 0) {
        this.completedExercisesMap[workout] = completedList;
      }
    }

    this.totalExercises = total;
    this.overallCompletion = total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  getWorkoutKeys(): string[] {
    return Object.keys(this.completedExercisesMap);
  }
  
  async resetProgress() {
    await this._storage?.clear();
    this.completedExercisesMap = {};
    this.overallCompletion = 0;
    this.totalExercises = 0;
  }

}
