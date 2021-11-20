export interface Widget {
  type: string
  scale: number
  y: number
  x: number
  id: number
  date: string
  title: string
  style: {
    backgroundColor: string
    createdAt: string
  }
  createdBy: {
    type: string
    name: string
    id: string
  }
  modifiedAt: string
  modifiedBy: {
    type: string
    name: string
    id: string
  }
}