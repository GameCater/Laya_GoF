
export class Vector {
  private x: number = 0;
  private y: number = 0;
  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  static distance(vec1: Vector, vec2: Vector): number {
    return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
  }

}