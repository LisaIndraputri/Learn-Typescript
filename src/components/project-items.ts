import { Component } from '../components/base-component.js'
import { Draggable } from '../models/drag-drop.js'
import { ProjectType } from '../models/project.js'
import { autobind } from '../decorators/autobind.js'


//Project Item List Class 
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: ProjectType;

  get person() {
    if (this.project.people === 1) {
      return 'person'
    }
    return 'persons'
  }

  constructor(hostId: string, project: ProjectType) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.config();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }
  dragEndHandler(event: DragEvent) {
    // console.log(event, 'drag end')
  }
  config() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.project.people.toString()} ${this.person}`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
