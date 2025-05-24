import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DailyChallenge {
  title: string;
  completed: boolean;
  done: number;
  goal: number;
  estimatedTime: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-daily-challenges',
  imports: [CommonModule],
  templateUrl: './daily-challenges.component.html',
  styleUrls: ['./daily-challenges.component.css'],
})
export class DailyChallengesComponent {
  //implements OnInit {
  challenges: DailyChallenge[] = [
    {
      title: 'Candidatures spontanées',
      completed: false,
      done: 2,
      goal: 4,
      estimatedTime: '15 min',
      lastUpdated: "Aujourd'hui à 09:23",
    },
    {
      title: 'Postuler à des offres',
      completed: false,
      done: 1,
      goal: 3,
      estimatedTime: '30 min',
      lastUpdated: 'Hier à 17:45',
    },
    {
      title: 'Contacter un recruteur',
      completed: true,
      done: 1,
      goal: 1,
      estimatedTime: '10 min',
      lastUpdated: "Aujourd'hui à 11:02",
    },
  ];

  constructor() {}

  // ngOnInit(): void {}

  toggleChallenge(index: number) {
    this.challenges[index].completed = !this.challenges[index].completed;
  }

  get completionPercentage(): number {
    const total = this.challenges.length;
    const done = this.challenges.filter((c) => c.completed).length;
    return Math.round((done / total) * 100);
  }
}
