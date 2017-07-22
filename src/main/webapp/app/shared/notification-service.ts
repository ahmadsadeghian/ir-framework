import {Injectable} from "@angular/core";

@Injectable()
export class NotificationService {

    public error(message: string): void {
        $.notify({message: message, icon: 'fa fa-remove'}, this.getOptions('danger'));
    }

    public warn(message: string): void {
        $.notify({message: message, icon: 'fa fa-warning'}, this.getOptions('warning'));
    }

    public success(message: string): void {
        $.notify({message: message, icon: 'fa fa-check'}, this.getOptions('success'));
    }

    private getOptions(type: string): INotifySettings {
        return {
            type: type,
            animate: {enter: 'animated bounceIn', exit: 'animated bounceOut'},
            placement: {from: "top", align: "center"},
            icon_type: 'class',
        }  as INotifySettings;
    }
}