import { Component, ElementRef, inject, OnInit, output, viewChild } from '@angular/core';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { Client, LatLng } from '../../../types';
import { WebSocketService } from '../../../web-sockets/types/services/websocket.service';
mapboxgl.accessToken = 'ACCESS_TOKEN'; //! *** You can generate your free access token in: https://docs.mapbox.com/mapbox-gl-js/guides/install/
import Cookies from 'js-cookie';

@Component({
  selector: 'custom-map',
  imports: [],
  templateUrl: './custom-map.html',
  styles: `
    .map {
      width: 100vw;
      height: 100vh;
    }
  `
})
export class CustomMap implements OnInit {

  private websocketService = inject(WebSocketService);

  private mapElement = viewChild<ElementRef<HTMLDivElement>>('map');
  private map: mapboxgl.Map | null = null;
  private markers = new Map<string, mapboxgl.Marker>();
  public center = output<LatLng>();

  private onMessage$ = this.websocketService.onMessage.subscribe(message => {
    switch(message.type) {
      case 'WELCOME':
        this.createMarkers([message.payload], true);
        break;
      case 'CLIENT_JOINED':
        this.createMarkers([message.payload]);
        break;
      case 'CLIENT_STATE':
        this.createMarkers(message.payload);
        break;
      case 'CLIENT_MOVED':
        this.updateMarkerCoords(message.payload.clientId, message.payload.coords);
        break;
      case 'CLIENT_LEFT':
        this.removeMarker(message.payload.clientId);
        break;
    }
  })

  ngOnInit(): void {
    if ( !this.mapElement() ) throw new Error('Map element not found');

    this.map = new mapboxgl.Map({
      container: this.mapElement()!.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122.473043, 37.80333], // starting position [lng, lat]
      zoom: 16,
    });

    this.center.emit({ lat: 37.80333, lng: -122.473043 });
    this.map.on('moveend', () => {
      const currentCenter = this.map!.getCenter();
      this.center.emit({ lat: currentCenter.lat, lng: currentCenter.lng });
    })

  }

  private createMarkers( clients: Client[], isDraggable = false) {
    if ( !this.map ) return;
    for (const client of clients) {
      const marker = new mapboxgl.Marker({
        color: client.color,
        draggable: isDraggable
      })
      .setLngLat({ lng: client.coords.lng, lat: client.coords.lat })
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${ client.name }`))
      .on('dragend', () => Cookies.set('coords', JSON.stringify(marker.getLngLat())) )
      .on('drag', () => {
        const coords = marker.getLngLat();
        this.websocketService.sendMessage({
          type: 'CLIENT_MOVE',
          payload: {
            clientId: client.clientId,
            coords: { lng: coords.lng, lat: coords.lat }
          }
        })
      })
      .addTo( this.map! )

      this.markers.set(client.clientId, marker);
    }
  }

  private updateMarkerCoords(clientId: string, latLng: LatLng) {
    if ( !this.map ) return;
    const marker = this.markers.get(clientId);
    if ( !marker ) return;
    marker.setLngLat(latLng);
  }

  private removeMarker(clientId: string) {
    if ( !this.map ) return;
    const marker = this.markers.get(clientId);
    if (!marker) return;
    marker.remove();
    this.markers.delete(clientId);
  }  
}
