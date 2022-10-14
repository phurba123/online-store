import { NgModule } from "@angular/core";
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';



const modules : any[] = [MatToolbarModule, MatIconModule, MatBadgeModule, MatMenuModule, MatSidenavModule, MatCardModule,
MatButtonModule, MatListModule, MatExpansionModule, MatGridListModule, MatTableModule]

@NgModule({
    imports:[...modules],
    exports:[...modules]
})

export default class MaterialModules{}