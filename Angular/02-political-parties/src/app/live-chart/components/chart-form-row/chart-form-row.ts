import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Party } from '../../../types';

@Component({
  selector: 'chart-form-row',
  imports: [],
  templateUrl: './chart-form-row.html',
  styleUrls: ['./chart-form-row.css'],
})
export class ChartFormRow {
  public party = input.required<Party>();

  incrementVotes = output<Party>();
  decrementVotes = output<Party>();
  delete = output<Party>();
  update = output<Party>();

  private updatePartyTiemout: number | null = null;

  updatePartyName(name: string) {

    if (this.updatePartyTiemout) clearInterval(this.updatePartyTiemout);

    this.updatePartyTiemout = setTimeout(() => {
      console.log('Emitiendo party: ', name);
      this.update.emit({
        ...this.party(),
        name
      });
    }, 500);
  }
}
