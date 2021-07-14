import { Marker } from "../model";

export default function nextMarker(marker: Marker | undefined): Marker | undefined {
    switch (marker) {
        case Marker.FLAG:
            return Marker.UNSURE;
        case Marker.UNSURE:
            return undefined;
        default:
            return Marker.FLAG;
    }
}
