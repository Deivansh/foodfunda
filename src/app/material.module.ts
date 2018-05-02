import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule,MatToolbarModule,MatDialogModule,MatIconModule,MatProgressBarModule,MatProgressSpinnerModule,MatCardModule,MatExpansionModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [MatButtonModule,MatToolbarModule,MatDialogModule,MatFormFieldModule,
        MatInputModule,MatIconModule,MatProgressBarModule,MatProgressSpinnerModule,MatCardModule,MatExpansionModule],
    exports: [MatButtonModule,MatToolbarModule,MatDialogModule,MatFormFieldModule,
        MatInputModule,MatIconModule,MatProgressBarModule,MatProgressSpinnerModule,MatCardModule,MatExpansionModule]
})

export class MaterialModule {}