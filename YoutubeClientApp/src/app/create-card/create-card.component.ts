import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ICardObj } from '../redux/state.models';
import { Store } from '@ngrx/store';
import { cardsListActions } from '../redux/cards.actions';
import { Observable } from 'rxjs';
import { FormStateService } from './create-card.service';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss',
})
export class CreateCardComponent implements OnInit, OnDestroy {
  public router = inject(Router);
  public cards$: Observable<ICardObj[]>;

  public form = new FormGroup({
    title: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl<string | null>(null, Validators.maxLength(255)),
    imgLink: new FormControl<string | null>(null, [Validators.required, Validators.pattern('https?://.+')]),
    videoLink: new FormControl<string | null>(null, [Validators.required, Validators.pattern('https?://.+')]),
    creationDate: new FormControl<string | null>(null, [Validators.required, this.maxDateValidator(new Date())]),
  });

  constructor(
    private formStateService: FormStateService,
    private store: Store<{ cardState: ICardObj[] }>
  ) {
    this.cards$ = this.store.select('cardState');
  }

  maxDateValidator(maxDate: Date) {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      if (selectedDate > maxDate) {
        return { maxDateResult: 'The date is invalid' };
      }
      return null;
    };
  }

  addCard() {
    const newCard: ICardObj = {
      id: uuidv4(),
      title: this.form.value.title || 'title',
      description: this.form.value.description || 'description',
      imgLink: this.form.value.imgLink || 'imgLink',
      videoLink: this.form.value.videoLink || 'video-link',
      creationDate: String(new Date()),
      statistics: {
        viewCount: '0',
        likeCount: '0',
        commentCount: '0',
      },
      isLiked: true,
    };
    console.log(newCard);
    this.store.dispatch(cardsListActions.addCard({ card: newCard }));
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.addCard();
      this.router.navigate(['']);
    }
  }

  onReset() {
    this.form.reset();
  }

  ngOnInit() {
    const savedData = this.formStateService.getFormData();
    if (savedData) {
      this.form.patchValue(savedData);
    }
  }

  ngOnDestroy() {
    this.formStateService.setFormData(this.form.value);
  }
}
