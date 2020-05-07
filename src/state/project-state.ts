import { ProjectType, ProjectStatus } from '../models/project'

// State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener (listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
export class ProjectState extends State<ProjectType>{
  private projects: ProjectType[] = [];
  
  private static instance: ProjectState;
  private constructor() {
    super()
  }

  static getInstance () {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject (title: string, description: string, people: number) {
    const newProject = new ProjectType(Math.random().toString(), title, description, people,ProjectStatus.Active);
    this.projects.push(newProject);
    this.updateListener();
  }
  moveProject (projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListener()
    }
  }
  private updateListener() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance()
