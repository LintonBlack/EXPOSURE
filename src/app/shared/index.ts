import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import * as fromComponents from './components';

@NgModule({
    declarations: [...fromComponents.components],
    exports: [
        // components
        ...fromComponents.components,
        // modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule {}