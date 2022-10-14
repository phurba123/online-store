import { NgModule } from "@angular/core";
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

const modules : any[] = [MatToolbarModule, MatIconModule, MatBadgeModule, MatMenuModule]

@NgModule({
    imports:[...modules],
    exports:[...modules]
})

export default class MaterialModules{}