

export interface PlaylistStep {
    name: string;
    id: string;
    startonly: string;
    endonly: string;
    everystep: string;
    offset: string;
    length: string;
    lengthms: string;
  }
  
  export interface xSchedulePlaylistRespont {
    steps: PlaylistStep[];
    reference: string;
}