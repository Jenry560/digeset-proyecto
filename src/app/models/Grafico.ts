export class Grafico {
  xaxis: Xaxis = {} as Xaxis;
  series: Series[] = [];
}

export interface Series {
  name: string;
  data: number[];
}

export interface Xaxis {
  categories: string[];
  labels?: any;
}
