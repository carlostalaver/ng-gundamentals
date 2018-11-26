import { Component, OnInit, Inject, forwardRef } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute} from '@angular/router'; /* SERVICO que permite recuperar informacion de la URL */
import { IEvent, ISession } from "../shared";

@Component({
  templateUrl: './event-details.component.html',
  styles: [`.container { padding-left: 20px; padding-right: 20px; }
            .event-image {height: 100px;}
            a {cursor: pointer  }`]
})
export class EventDetailsComponent  implements OnInit {
  event: IEvent;
  addMode: boolean;
  constructor( @Inject(forwardRef(() => EventService)) private eventService: EventService,
               @Inject(forwardRef(() => ActivatedRoute)) private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.event =  this.eventService.getEvent(+this.route.snapshot.params['id']);
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;

  }

  cancelAddSession() {
    this.addMode = false;
  }

}