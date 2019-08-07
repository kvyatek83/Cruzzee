import { Component } from '@angular/core';
import { PolygonOptions } from '@agm/core/services/google-maps-types';

declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {


  map: any;
  drawingManager: any;
  drawingStatus = false;

  aa: PolygonOptions;
  weight = 4;
  center: any = {
    lat: 31.5362475,
    lng: 34.9267386
  };

  constructor() { }

  aaa(a: any) {
    this.weight = 4;
    // a.setOptions({ strokeColor: '#0000FF' });
    console.log(a);
  }

  onMapReady(map) {
    this.map = map;
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    // const options = {
    //   drawingControl: true,
    //   drawingControlOptions: {
    //     drawingModes: ['polyline', 'polygon']
    //   },
    //   drawingMode: google.maps.drawing.OverlayType.POLYGON
    // };

    // const drawingManager = new google.maps.drawing.DrawingManager(options);
    // drawingManager.setDrawingMode;
    // drawingManager.setMap(map);

    const options = {
      drawingControl: false,
    };

    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(this.map);

    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (event) => {
      const lat = event.latLng.lat();
      const long = event.latLng.lng();
      console.log(`Lat ${lat}, Long ${long}`);
    });
  }

  start(): void {

    this.drawingStatus = !this.drawingStatus;
    if (this.drawingStatus) {
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
    } else {
      this.drawingManager.setDrawingMode(null);
    }
  }
}
